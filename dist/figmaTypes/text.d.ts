import { Node, DomNode } from './types';
import BaseConverter from './baseNode';
export declare class TEXTConverter extends BaseConverter<'TEXT'> {
    convertFills(node: Node<'TEXT'>, dom: DomNode): DomNode;
}
export default TEXTConverter;
