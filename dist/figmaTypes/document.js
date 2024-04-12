import BaseConverter from './baseNode';
export class DocumentConverter extends BaseConverter {
    async convert(node, dom, parentNode, option) {
        dom.type = 'div';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, option);
    }
}
export default DocumentConverter;
