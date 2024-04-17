import type { Node, DomNode, ConvertNodeOption, DomNodeType } from '../common/types';
import PolygonConverter from './polygon';
export declare class LINEConverter extends PolygonConverter<'LINE'> {
    polygonName: DomNodeType;
    convert(node: Node<'LINE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    createPolygonPath(dom: DomNode, node: Node<'LINE'>, container?: DomNode): void;
}
export default LINEConverter;
