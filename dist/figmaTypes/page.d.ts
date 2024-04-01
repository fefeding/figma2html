import type { Node, DomNode } from './types';
import BaseConverter from './baseNode';
export declare class PageConverter extends BaseConverter<'CANVAS'> {
    convert(node: Node<'CANVAS'>, dom: DomNode, parentNode?: Node): Promise<DomNode>;
}
export default PageConverter;
