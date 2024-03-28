
import type { Node, NodeType, NodeConverter } from './types';
import FrameConverter from './frame';

const ConverterMaps = {
    'FRAME': new FrameConverter()
} as { [key: string]: NodeConverter};

// 转node为html结构对象
export function convert(node: Node) {
    const res = {
        id: node.id,
        name: node.name,
        visible: !!node.visible,
        type: node.type,
        children: [],
    };
    if(node.children && node.children.length) {
        for(const child of node.children) {
            const c = convert(child);
            res.children.push(c);
        }
    }
    const converter = ConverterMaps[res.type];
    if(converter) converter.convert(node);
    return res;
}