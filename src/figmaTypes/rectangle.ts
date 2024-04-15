
import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'RECTANGLE'> {
    async convert(node:  Node<'RECTANGLE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption) {
        // 如果是填充的图5片，则直接用img
        if(node.fills && node.fills.length && node.fills[0].type === 'IMAGE') {
            dom.type = 'img';
        }
        return super.convert(node, dom, parentNode, page, option);
    }
}

export default FRAMEConverter;