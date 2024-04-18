
import type { Node, DomNode, NodeConverter, NodeToDomOption, ConvertNodeOption, IJElementData } from './common/types';
import BaseConverter from './figmaTypes/baseNode';
import DocumentConverter from './figmaTypes/document';
import PageConverter from './figmaTypes/page';
import FrameConverter from './figmaTypes/frame';
//import GroupConverter from './figmaTypes/group';
import TextConverter from './figmaTypes/text';
import PolygonConverter from './figmaTypes/polygon';
import StarConverter from './figmaTypes/star';
import EllipseConverter from './figmaTypes/ellipse';
import LineConverter from './figmaTypes/line';
import RectangleConverter from './figmaTypes/rectangle';

const frameConverter = new FrameConverter();
const ConverterMaps = {
    'BASE': new BaseConverter(),
    'FRAME': frameConverter,
    'GROUP': frameConverter,
    'TEXT': new TextConverter(),
    'DOCUMENT': new DocumentConverter(),
    'CANVAS': new PageConverter(),
    'REGULAR_POLYGON': new PolygonConverter(),
    'ELLIPSE': new EllipseConverter(),
    'STAR': new StarConverter(),
    'RECTANGLE': new RectangleConverter(),
    'LINE': new LineConverter(),
    'VECTOR': new RectangleConverter(),
} as { [key: string]: NodeConverter};

// 转node为html结构对象
export async function convert(node: Node, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode> {
    // 如果是根，则返回document
    if(node.document) {
        const docDom = await convert(node.document, node, page, option);
        return docDom;
    }

    if(node.visible === false) return null;
   
    const dom = ConverterMaps.BASE.createDomNode('div', {
        id: node.id,
        name: node.name,
        type: 'div',
        visible: true,
        data: {} as IJElementData,
        style: {
            // 默认采用绝对定位
            position: 'absolute',
        } as CSSStyleDeclaration,
        children: [] as Array<DomNode>,
        figmaData: node,
    });   
    // 普通元素，不可当作容器
    dom.isElement = ['VECTOR', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'SLICE', 'RECTANGLE'].includes(node.type); // || (parentNode && parentNode.clipsContent);

    const isContainer = ['GROUP', 'FRAME', 'CANVAS', 'BOOLEAN', 'BOOLEAN_OPERATION'].includes(node.type);
    const svgElements = ['VECTOR', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'RECTANGLE'];

    // 容器可能是SVG
    let isSvg = isContainer && !container;
    // 容器下所有元素都是SVG元素，则认为是svg块
    if(isSvg && node.children && node.children.length) {
        for(const child of node.children) {
            if(!svgElements.includes(child.type)) {
                isSvg = false;
                break;
            }
            // 已识别成图片的，不再处理成svg
            if(child.type === 'RECTANGLE' && child.fills && child.fills.length && child.fills[0].type === 'IMAGE') {
                isSvg = false;
                break;
            }
        }
    }
    else {
        isSvg = false;
    }

    if(isSvg) {
        dom.type = 'svg';
        container = dom;
    }
    
    let converter = ConverterMaps[node.type] || ConverterMaps.BASE;
    // 已识别成图片的，不再处理成svg
    if(node.type === 'RECTANGLE' && node.fills && node.fills.length && node.fills[0].type === 'IMAGE') {
        dom.type = 'img';
        converter = ConverterMaps.BASE;
    }

    if(converter) await converter.convert(node, dom, parentNode, page, option, container);

    if(!page && node.type === 'FRAME' && option?.expandToPage) page = dom;// 当前节点开始，为页面模板
    else if(page && (!container || dom.type === 'svg')) {
        // 没有显示意义的div不处理
        if(!dom.isElement) page.children.push(dom);
    } 

    if(node.children && node.children.length) {
        if(isSvg && (node.type === 'BOOLEAN_OPERATION' || node.type === 'BOOLEAN')) {
           // if(svgElements.includes(node.children[0].type)) node.children[0].isMask = true;
        }

        let lastChildDom = null;
        for(const child of node.children) {
            let parent = container;
            // 如果是蒙板，则加入上一个SVG元素中
            if(child.isMask && !parent && lastChildDom?.type === 'svg') {
                parent = lastChildDom;
            }
            const c = await convert(child, node, parent || page, option, parent);   
            if(!c) continue;   
            lastChildDom = c; 
            if(ConverterMaps.BASE.isEmptyDom(c)) {
                console.log('empty dom', c);
                continue;
            }     
            if(!c.isMask && !dom.children.includes(c) && (!page || c.isElement)) dom.children.push(c);
        }
    }
    
    return dom;
}

// 把figma数据转为dom对象
export async function nodeToDom(node: DomNode, option?: NodeToDomOption) {
    switch(node.type) {
        case 'document': {
            return await renderDocument(node, option);
        }
        case 'page': {
            return await renderPage(node, option);
        }
        case 'svg': {
            return await renderSvg(node, option);
        }
        case 'ellipse':
        case 'line':
        case 'path':
        case 'polygon': {
            return await renderEllipse(node, option);
        }
        case 'stop':
        case 'defs':
        case 'mask':
        case 'linearGradient':
        case 'radialGradient': {
            return await renderSvgElement(node, option);
        }
        default: {
            return await renderElement(node, option);
        }
    }
}

async function renderDocument(node: DomNode, option?: NodeToDomOption) {
    const doc = await renderElement(node, option);
    return doc;
}

async function renderPage(node: DomNode, option?: NodeToDomOption) {
    const page = await renderElement(node, option);
    //page.style.minHeight = node.bounds.height + 'px';
    return page;
}

async function renderSvg(node: DomNode, option?: NodeToDomOption) {
    const svg = await renderSvgElement(node, option);
    
    //svg.setAttribute('width', node.bounds.width + '');
    //svg.setAttribute('height', node.bounds.height + '');

    return svg;
}

async function renderEllipse(node: DomNode, option?: NodeToDomOption) {
    const ellipse = await renderSvgElement(node, option);   
    if(node.fill) ellipse.setAttribute('fill', node.fill); 
    return ellipse;
}

async function renderSvgElement(node: DomNode, option?: NodeToDomOption) {
    let el = document.createElementNS("http://www.w3.org/2000/svg", node.type); // 创建SVG元素

    await renderElement(node, option, el);
   
    return el;
}

async function renderElement(node: DomNode, option?: NodeToDomOption, dom?: HTMLElement|SVGElement) {
    
    dom = dom || document.createElement(node.type);
    if(node.style) {
        Object.assign(dom.style, node.style);
        if(node.preserveRatio && node.type === 'img') dom.style.height = 'auto';
    }
    if(node.text) {
        dom.textContent = node.text;
    }

    // @ts-ignore
    if(node.type === 'img' && node.url) dom.src = node.url;

    if(node.visible === false) dom.style.display = 'none';

    if(node.attributes) {
        for(const name in node.attributes) {
            if(typeof node.attributes[name] !== 'undefined' && typeof name === 'string') {
                dom.setAttribute(name, node.attributes[name]);
            }
        }
    }

    if(node.name) dom.setAttribute('data-name', node.name);
    if(node.id) dom.setAttribute('id', node.id);
    if(node.cx) dom.setAttribute('cx', node.cx);
    if(node.cy) dom.setAttribute('cy', node.cy);
    if(node.r) dom.setAttribute('r', node.r);
    if(node.fx) dom.setAttribute('fx', node.fx);
    if(node.fy) dom.setAttribute('fy', node.fy);

    if(node.x1) dom.setAttribute('x1', node.x1);
    if(node.y1) dom.setAttribute('y1', node.y1);
    if(node.x2) dom.setAttribute('x2', node.x2);
    if(node.y2) dom.setAttribute('y2', node.y2);
    if(node.offset) dom.setAttribute('offset', node.offset);


    if(node.children) {
        for(const child of node.children) {
            if(child.visible === false) continue;
            const c = await nodeToDom(child, option);
            c &&　dom.appendChild(c);
        }
    }
    return dom;
}