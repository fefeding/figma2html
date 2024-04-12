
import type { Node, NodeType, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'FRAME'> {
    async convert(node:  Node<'FRAME'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        
        if(parentNode && parentNode.type === 'CANVAS') {
            dom.style.overflow = 'hidden';
            if(parentNode && !parentNode.absoluteBoundingBox) {
                // 如果是一级节点，则下面的节点都相对于它
                parentNode.absoluteBoundingBox = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                // 取最左顶点角
                if(parentNode.children && parentNode.children.length) {
                    for(const child of parentNode.children) {
                       if(child.absoluteBoundingBox) {
                        parentNode.absoluteBoundingBox.x = Math.min(parentNode.absoluteBoundingBox.x, child.absoluteBoundingBox.x);
                        parentNode.absoluteBoundingBox.y = Math.min(parentNode.absoluteBoundingBox.y, child.absoluteBoundingBox.y);
                       }
                    }
                }
            }
        }
        return super.convert(node, dom, parentNode, option);
    }
}

export default FRAMEConverter;