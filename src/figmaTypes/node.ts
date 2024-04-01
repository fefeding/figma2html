
import type { Node, DomNode, NodeConverter } from './types';
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
export async function convert(node: Node, parentNode?: Node): Promise<DomNode> {
    // 如果是根，则返回document
    if(node.document) {
        const docDom = await convert(node.document, node);
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
    if(converter) await converter.convert(node, dom, parentNode);

    if(node.children && node.children.length) {
        for(const child of node.children) {
            const c = await convert(child, node);
            if(node.type === 'CANVAS') {
                c.style.overflow = 'hidden';
            }
            dom.children.push(c);
        }
    }
    return dom;
}