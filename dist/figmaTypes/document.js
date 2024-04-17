import BaseConverter from './baseNode';
export class DocumentConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option) {
        dom.type = 'div';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, page, option);
    }
}
export default DocumentConverter;
