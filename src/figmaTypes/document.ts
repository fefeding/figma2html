
import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';

export class DocumentConverter extends BaseConverter<'DOCUMENT'> {
    async convert(node:  Node<'DOCUMENT'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'div';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, option);
    }
}

export default DocumentConverter;