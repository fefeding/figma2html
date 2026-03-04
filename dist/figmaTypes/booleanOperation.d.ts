import { Node, DomNode, ConvertNodeOption, DomNodeType } from '../common/types';
import PolygonConverter from './polygon';
export declare class BooleanOperationConverter extends PolygonConverter<'BOOLEAN_OPERATION'> {
    polygonName: DomNodeType;
    convert(node: Node<'BOOLEAN_OPERATION'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
}
export default BooleanOperationConverter;
