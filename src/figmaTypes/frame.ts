
import type { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'FRAME'> {
    async convert(node:  Node<'FRAME'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        //dom.style.position = '';
        return super.convert(node, dom, parentNode, option);
    }
}

export default FRAMEConverter;