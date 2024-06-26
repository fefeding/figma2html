import { Node, DomNode, ConvertNodeOption, DomNodeType } from '../common/types';
import { Point } from '@fefeding/utils';
import PolygonConverter from './polygon';
export declare class ELLIPSEConverter extends PolygonConverter<'ELLIPSE'> {
    polygonName: DomNodeType;
    convert(node: Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    createPolygonPath(dom: DomNode, node: Node<'ELLIPSE'>, container?: DomNode): void;
    createArcPoints(center: Point, radius: number, startAngle?: number, endAngle?: number): [number, number][];
}
export default ELLIPSEConverter;
