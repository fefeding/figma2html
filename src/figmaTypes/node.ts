
import type { Node, NodeType, NodeTypes } from './types';

// 转node为html结构对象
export function convert(node: Node) {
    const res = {
        id: node.id,
        name: node.name,
        visible: node.visible,
        type: node.type,
        children: [],
    };
    if(node.children && node.children.length) {
        for(const child of node.children) {
            
        }
    }
}