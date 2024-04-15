import { Node, DomNode, DomNodeType } from '../common/types';
import PolygonConverter from './polygon';
export declare class ELLIPSEConverter extends PolygonConverter<'ELLIPSE'> {
    polygonName: DomNodeType;
    createPolygonPath(dom: DomNode, node: Node<'ELLIPSE'>): void;
}
export default ELLIPSEConverter;
