import type { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';
export declare class FRAMEConverter extends BaseConverter<'ELLIPSE'> {
    convert(node: Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
}
export default FRAMEConverter;
