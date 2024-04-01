
import type { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';

export class DocumentConverter extends BaseConverter<'DOCUMENT'> {
    async convert(node:  Node<'DOCUMENT'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'div';
        dom.style.position = '';
        return dom;
    }
}

export default DocumentConverter;