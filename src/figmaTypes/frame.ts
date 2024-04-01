
import type { Node, DomNode } from './types';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'FRAME'> {
    async convert(node:  Node<'FRAME'>, dom: DomNode, parentNode?: Node) {
        //dom.style.position = '';
        return super.convert(node, dom, parentNode);
    }
}

export default FRAMEConverter;