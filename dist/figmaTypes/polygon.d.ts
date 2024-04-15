import { Node, DomNode, ConvertNodeOption, Paint, NodeType, ColorStop, DomNodeType } from '../common/types';
import BaseConverter from './baseNode';
export declare class PolygonConverter<NType extends NodeType = 'REGULAR_POLYGON'> extends BaseConverter<NType> {
    polygonName: DomNodeType;
    convert(node: Node<NType>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    createPolygonPath(dom: DomNode, node: Node<NType>): void;
    convertFills(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    convertStrokes(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    convertLinearGradient(gradient: Paint, dom?: DomNode): string;
    convertRadialGradient(gradient: Paint, dom?: DomNode): string;
    getGradientStopDoms(gradientStops: ColorStop[]): DomNode[];
}
export default PolygonConverter;
