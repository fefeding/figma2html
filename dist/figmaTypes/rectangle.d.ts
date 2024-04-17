import type { Node, DomNode, ConvertNodeOption, DomNodeType } from '../common/types';
import PolygonConverter from './polygon';
export declare class RECTANGLEConverter extends PolygonConverter<'RECTANGLE'> {
    polygonName: DomNodeType;
    convert(node: Node<'RECTANGLE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    createPolygonPath(dom: DomNode, node: Node<'RECTANGLE'>, container?: DomNode): void;
}
export default RECTANGLEConverter;
