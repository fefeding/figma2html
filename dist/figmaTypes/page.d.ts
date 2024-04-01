import type { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';
export declare class PageConverter extends BaseConverter<'CANVAS'> {
    convert(node: Node<'CANVAS'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
}
export default PageConverter;
