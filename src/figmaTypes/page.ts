
import type { Node, DomNode } from './types';
import BaseConverter from './baseNode';

export class PageConverter extends BaseConverter<'CANVAS'> {
    async convert(node:  Node<'CANVAS'>, dom: DomNode, parentNode?: Node) {
        dom.type = 'page';
        dom.style.position = '';
        return super.convert(node, dom, parentNode);
    }
}

export default PageConverter;