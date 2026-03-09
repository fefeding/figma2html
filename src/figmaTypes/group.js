import FRAMEConverter from './frame';
export class GroupConverter extends FRAMEConverter {
    async convert(node, dom, parentNode, page, option) {
        return super.convert(node, dom, parentNode, page, option);
    }
}
export default GroupConverter;
