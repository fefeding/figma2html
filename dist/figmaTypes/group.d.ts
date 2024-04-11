import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import FRAMEConverter from './frame';
export declare class GroupConverter extends FRAMEConverter<'GROUP'> {
    convert(node: Node<'GROUP'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
}
export default GroupConverter;
