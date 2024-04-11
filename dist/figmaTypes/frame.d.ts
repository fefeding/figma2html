import type { Node, NodeType, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';
export declare class FRAMEConverter<NType extends NodeType = 'FRAME'> extends BaseConverter<NType> {
    convert(node: Node<NType>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
}
export default FRAMEConverter;
