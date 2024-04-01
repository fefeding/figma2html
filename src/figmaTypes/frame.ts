
import type { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'FRAME'> {
    async convert(node:  Node<'FRAME'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        if(parentNode && parentNode.type === 'CANVAS') {
            dom.style.position = 'relative';
        }
        return super.convert(node, dom, parentNode, option);
    }
}

export default FRAMEConverter;