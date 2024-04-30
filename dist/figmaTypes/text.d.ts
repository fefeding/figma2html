import { Node, DomNode, ConvertNodeOption, TypeStyle } from '../common/types';
import BaseConverter from './baseNode';
export declare class TEXTConverter extends BaseConverter<'TEXT'> {
    convert(node: Node<'TEXT'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    convertCharacterStyleOverrides(node: Node<'TEXT'>, dom: DomNode, option?: ConvertNodeOption, isSingleLine?: boolean): Promise<void>;
    convertFills(node: Node<'TEXT'> | TypeStyle, dom: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    checkParentAndChildStyle(parent: DomNode, child: DomNode): void;
    checkParentAndChildStyleForDelete(parent: DomNode, child: DomNode): void;
    testTextWidth(dom: DomNode, parent?: DomNode): number;
}
export default TEXTConverter;
