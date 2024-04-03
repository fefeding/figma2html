import { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';
export declare class TEXTConverter extends BaseConverter<'TEXT'> {
    convert(node: Node<'TEXT'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
    convertFills(node: Node<'TEXT'>, dom: DomNode): Promise<DomNode>;
}
export default TEXTConverter;
