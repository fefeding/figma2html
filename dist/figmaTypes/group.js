import FRAMEConverter from './frame';
export class GroupConverter extends FRAMEConverter {
    async convert(node, dom, parentNode, option) {
        return super.convert(node, dom, parentNode, option);
    }
}
export default GroupConverter;
