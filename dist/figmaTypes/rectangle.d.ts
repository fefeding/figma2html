import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';
export declare class FRAMEConverter extends BaseConverter<'RECTANGLE'> {
    convert(node: Node<'RECTANGLE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
}
export default FRAMEConverter;
