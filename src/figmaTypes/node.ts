
import type { Node, DomNode, NodeConverter } from './types';
import BaseConverter from './baseNode';
import FrameConverter from './frame';
import TextConverter from './text';

const ConverterMaps = {
    'BASE': new BaseConverter(),
    'FRAME': new FrameConverter(),
    'TEXT': new TextConverter(),
} as { [key: string]: NodeConverter};

// 转node为html结构对象
export async function convert(node: Node): Promise<DomNode> {
    const dom = {
        id: node.id,
        name: node.name,
        visible: !!node.visible,
        type: 'div',
        style: {} as CSSStyleDeclaration,
        children: [] as Array<DomNode>,
    } as DomNode;
    if(node.children && node.children.length) {
        for(const child of node.children) {
            const c = await convert(child);
            dom.children.push(c);
        }
    }
    const converter = ConverterMaps[dom.type] || ConverterMaps.BASE;
    if(converter) await converter.convert(node, dom);
    return dom;
}