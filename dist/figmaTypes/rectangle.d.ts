import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import PolygonConverter from './polygon';
export declare class RECTANGLEConverter extends PolygonConverter<'RECTANGLE'> {
    convert(node: Node<'RECTANGLE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
}
export default RECTANGLEConverter;
