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
const group_1 = __importDefault(require("./group"));
const text_1 = __importDefault(require("./text"));
const ellipse_1 = __importDefault(require("./ellipse"));
const rectangle_1 = __importDefault(require("./rectangle"));
const frameConverter = new frame_1.default();
const ConverterMaps = {
    'BASE': new baseNode_1.default(),
    'FRAME': frameConverter,
    'GROUP': new group_1.default(),
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
    const dom = ConverterMaps.BASE.createDomNode('div', {
        id: node.id,
        name: node.name,
        type: 'div',
        visible: node.visible === false ? false : true,
        data: {},
        style: {
            // 默认采用绝对定位
            position: 'absolute',
        },
        children: [],
        figmaData: node,
    });
    const converter = ConverterMaps[node.type] || ConverterMaps.BASE;
    if (converter)
        await converter.convert(node, dom, parentNode, option);
    if (node.children && node.children.length) {
        for (const child of node.children) {
            //if(child.isMask) continue;
            const c = await convert(child, node, option);
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
        case 'stop':
        case 'defs':
        case 'linearGradient':
        case 'radialGradient': {
            return await renderSvgElement(node, option);
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
    //page.style.minHeight = node.bounds.height + 'px';
    return page;
}
async function renderSvg(node, option) {
    const svg = await renderSvgElement(node, option);
    svg.setAttribute('width', node.bounds.width + '');
    svg.setAttribute('height', node.bounds.height + '');
    return svg;
}
async function renderEllipse(node, option) {
    const ellipse = await renderSvgElement(node, option);
    ellipse.setAttribute('cx', '50%');
    ellipse.setAttribute('cy', '50%');
    ellipse.setAttribute('rx', '50%');
    ellipse.setAttribute('ry', '50%');
    ellipse.setAttribute('fill', node.fill || node.style.background || node.style.backgroundColor);
    return ellipse;
}
async function renderSvgElement(node, option) {
    let el = document.createElementNS("http://www.w3.org/2000/svg", node.type); // 创建SVG元素
    await renderElement(node, option, el);
    return el;
}
async function renderElement(node, option, dom) {
    dom = dom || document.createElement(node.type);
    if (node.style) {
        Object.assign(dom.style, node.style);
        if (node.preserveRatio && node.type === 'img')
            dom.style.height = 'auto';
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
        dom.setAttribute('id', node.id);
    if (node.cx)
        dom.setAttribute('cx', node.cx);
    if (node.cy)
        dom.setAttribute('cy', node.cy);
    if (node.r)
        dom.setAttribute('r', node.r);
    if (node.fx)
        dom.setAttribute('fx', node.fx);
    if (node.fy)
        dom.setAttribute('fy', node.fy);
    if (node.x1)
        dom.setAttribute('x1', node.x1);
    if (node.y1)
        dom.setAttribute('y1', node.y1);
    if (node.x2)
        dom.setAttribute('x2', node.x2);
    if (node.y2)
        dom.setAttribute('y2', node.y2);
    if (node.offset)
        dom.setAttribute('offset', node.offset);
    if (node.children) {
        for (const child of node.children) {
            if (child.visible === false)
                continue;
            const c = await nodeToDom(child, option);
            c && dom.appendChild(c);
        }
    }
    return dom;
}
