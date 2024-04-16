import { Node, DomNode } from '../common/types';
import PolygonConverter from './polygon';
export declare class StarConverter extends PolygonConverter<'STAR'> {
    createPolygonPath(dom: DomNode, node: Node<'STAR'>, container?: DomNode): void;
}
export default StarConverter;
