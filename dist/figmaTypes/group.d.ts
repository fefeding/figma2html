import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import FRAMEConverter from './frame';
export declare class GroupConverter extends FRAMEConverter {
    convert(node: Node<'FRAME'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
}
export default GroupConverter;
