"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeToDom = exports.convert = void 0;
const baseNode_1 = __importDefault(require("./baseNode"));
const document_1 = __importDefault(require("./document"));
const page_1 = __importDefault(require("./page"));
const frame_1 = __importDefault(require("./frame"));
const text_1 = __importDefault(require("./text"));
const ellipse_1 = __importDefault(require("./ellipse"));
const rectangle_1 = __importDefault(require("./rectangle"));
const frameConverter = new frame_1.default();
const ConverterMaps = {
    'BASE': new baseNode_1.default(),
    'FRAME': frameConverter,
    'GROUP': frameConverter,
    'TEXT': new text_1.default(),
    'DOCUMENT': new document_1.default(),
    'CANVAS': new page_1.default(),
    'ELLIPSE': new ellipse_1.default(),
    'RECTANGLE': new rectangle_1.default(),
};
// 转node为html结构对象
async function convert(node, parentNode, option) {
    // 如果是根，则返回document
    if (node.document) {
        const docDom = await convert(node.document, node, option);
        return docDom;
    }
    const dom = {
        id: node.id,
        name: node.name,
        visible: node.visible === false ? false : true,
        type: 'div',
        style: {
            // 默认采用绝对定位
            position: 'absolute',
        },
        children: [],
        figmaData: node,
    };
    const converter = ConverterMaps[node.type] || ConverterMaps.BASE;
    if (converter)
        await converter.convert(node, dom, parentNode, option);
    if (node.children && node.children.length) {
        for (const child of node.children) {
            const c = await convert(child, node, option);
            if (node.type === 'CANVAS') {
                c.style.overflow = 'hidden';
            }
            dom.children.push(c);
        }
    }
    return dom;
}
exports.convert = convert;
// 把figma数据转为dom对象
async function nodeToDom(node, option) {
    switch (node.type) {
        case 'document': {
            return await renderDocument(node, option);
        }
        case 'page': {
            return await renderPage(node, option);
        }
        case 'svg': {
            return await renderSvg(node, option);
        }
        case 'ellipse': {
            return await renderEllipse(node, option);
        }
        default: {
            return await renderElement(node, option);
        }
    }
}
exports.nodeToDom = nodeToDom;
async function renderDocument(node, option) {
    const doc = await renderElement(node, option);
    return doc;
}
async function renderPage(node, option) {
    const page = await renderElement(node, option);
    page.style.minHeight = node.bounds.height + 'px';
    return page;
}
async function renderSvg(node, option) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); // 创建SVG元素
    await renderElement(node, option, svg);
    svg.setAttribute('width', node.bounds.width + '');
    svg.setAttribute('height', node.bounds.height + '');
    return svg;
}
async function renderEllipse(node, option) {
    const ellipse = await renderElement(node, option);
    ellipse.setAttribute('cx', node.bounds.width / 2 + '');
    ellipse.setAttribute('cy', node.bounds.height / 2 + '');
    ellipse.setAttribute('rx', node.bounds.width / 2 + '');
    ellipse.setAttribute('ry', node.bounds.height / 2 + '');
    ellipse.setAttribute('fill', node.style.background || node.style.backgroundColor);
    return ellipse;
}
async function renderElement(node, option, dom) {
    dom = dom || document.createElement(node.type);
    if (node.style) {
        Object.assign(dom.style, node.style);
    }
    if (node.text) {
        dom.textContent = node.text;
    }
    // @ts-ignore
    if (node.type === 'img' && node.url)
        dom.src = node.url;
    if (node.visible === false)
        dom.style.display = 'none';
    if (node.name)
        dom.setAttribute('data-name', node.name);
    if (node.id)
        dom.setAttribute('data-id', node.id);
    if (node.children) {
        for (const child of node.children) {
            const c = await nodeToDom(child, option);
            dom.appendChild(c);
        }
    }
    return dom;
}
