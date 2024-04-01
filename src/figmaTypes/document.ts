
import type { Node, DomNode } from './types';
import BaseConverter from './baseNode';

export class DocumentConverter extends BaseConverter<'DOCUMENT'> {
    async convert(node:  Node<'DOCUMENT'>, dom: DomNode, parentNode?: Node) {
        dom.type = 'div';
        dom.style.position = '';
        return dom;
    }
}

export default DocumentConverter;