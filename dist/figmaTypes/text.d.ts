import { Node, DomNode, ConvertNodeOption, TypeStyle } from '../common/types';
import BaseConverter from './baseNode';
export declare class TEXTConverter extends BaseConverter<'TEXT'> {
    convert(node: Node<'TEXT'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    convertCharacterStyleOverrides(node: Node<'TEXT'>, dom: DomNode, option?: ConvertNodeOption): Promise<void>;
    convertFills(node: Node<'TEXT'> | TypeStyle, dom: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    testTextWidth(dom: DomNode): number;
}
export default TEXTConverter;
