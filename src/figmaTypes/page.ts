
import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';

export class PageConverter extends BaseConverter<'CANVAS'> {
    async convert(node:  Node<'CANVAS'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption) {
        dom.type = 'page';
        dom.style.position = 'relative';
        
        return super.convert(node, dom, parentNode, page, option);
    }
}

export default PageConverter;