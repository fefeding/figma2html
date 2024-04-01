import type { Node, DomNode } from './types';
import BaseConverter from './baseNode';
export declare class FRAMEConverter extends BaseConverter<'FRAME'> {
    convert(node: Node<'FRAME'>, dom: DomNode, parentNode?: Node): Promise<DomNode>;
}
export default FRAMEConverter;
