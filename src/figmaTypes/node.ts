
import type { Node, DomNode, NodeConverter, NodeToDomOption, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';
import DocumentConverter from './document';
import PageConverter from './page';
import FrameConverter from './frame';
import TextConverter from './text';

const frameConverter = new FrameConverter();
const ConverterMaps = {
    'BASE': new BaseConverter(),
    'FRAME': frameConverter,
    'GROUP': frameConverter,
    'TEXT': new TextConverter(),
    'DOCUMENT': new DocumentConverter(),
    'CANVAS': new PageConverter(),
} as { [key: string]: NodeConverter};

// 转node为html结构对象
export async function convert(node: Node, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode> {
    // 如果是根，则返回document
    if(node.document) {
        const docDom = await convert(node.document, node, option);
        return docDom;
    }
   
    const dom = {
        id: node.id,
        name: node.name,
        visible: node.visible === false? false: true,
        type: 'div',
        style: {
            // 默认采用绝对定位
            position: 'absolute',
        } as CSSStyleDeclaration,
        children: [] as Array<DomNode>,
        figmaData: node,
    } as DomNode;

    const converter = ConverterMaps[node.type] || ConverterMaps.BASE;
    if(converter) await converter.convert(node, dom, parentNode, option);

    if(node.children && node.children.length) {
        for(const child of node.children) {
            const c = await convert(child, node, option);
            if(node.type === 'CANVAS') {
                c.style.overflow = 'hidden';
            }
            dom.children.push(c);
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
    page.style.minHeight = node.bounds.height + 'px';
    return page;
}

async function renderElement(node: DomNode, option?: NodeToDomOption) {
    
    const dom = document.createElement(node.type);
    if(node.style) {
        Object.assign(dom.style, node.style);
    }
    if(node.text) {
        dom.innerText = node.text;
    }

    if(node.visible === false) dom.style.display = 'none';

    if(node.name) dom.setAttribute('data-name', node.name);
    if(node.id) dom.setAttribute('data-id', node.id);


    if(node.children) {
        for(const child of node.children) {
            const c = await nodeToDom(child, option);
            dom.appendChild(c);
        }
    }
    return dom;
}