import BaseConverter from './baseNode';
export class PageConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option) {
        dom.type = 'page';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, page, option);
    }
}
export default PageConverter;
