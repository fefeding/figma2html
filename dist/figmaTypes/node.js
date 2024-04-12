import BaseConverter from './baseNode';
import DocumentConverter from './document';
import PageConverter from './page';
import FrameConverter from './frame';
import GroupConverter from './group';
import TextConverter from './text';
import EllipseConverter from './ellipse';
import RectangleConverter from './rectangle';
const frameConverter = new FrameConverter();
const ConverterMaps = {
    'BASE': new BaseConverter(),
    'FRAME': frameConverter,
    'GROUP': new GroupConverter(),
    'TEXT': new TextConverter(),
    'DOCUMENT': new DocumentConverter(),
    'CANVAS': new PageConverter(),
    'ELLIPSE': new EllipseConverter(),
    'RECTANGLE': new RectangleConverter(),
};
// 转node为html结构对象
export async function convert(node, parentNode, option) {
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
// 把figma数据转为dom对象
export async function nodeToDom(node, option) {
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
