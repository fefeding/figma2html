import { Node, DomNode, ConvertNodeOption, DomNodeType } from '../common/types';
import PolygonConverter from './polygon';
export declare class VECTORConverter extends PolygonConverter<'VECTOR'> {
    polygonName: DomNodeType;
    convert(node: Node<'VECTOR'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
}
export default VECTORConverter;
