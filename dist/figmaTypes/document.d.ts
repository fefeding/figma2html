import type { Node, DomNode } from './types';
import BaseConverter from './baseNode';
export declare class DocumentConverter extends BaseConverter<'DOCUMENT'> {
    convert(node: Node<'DOCUMENT'>, dom: DomNode, parentNode?: Node): Promise<DomNode>;
}
export default DocumentConverter;
