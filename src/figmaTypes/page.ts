
import type { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';

export class PageConverter extends BaseConverter<'CANVAS'> {
    async convert(node:  Node<'CANVAS'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'page';
        dom.style.position = '';
        return super.convert(node, dom, parentNode, option);
    }
}

export default PageConverter;