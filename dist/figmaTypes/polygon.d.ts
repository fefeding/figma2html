import { Node, DomNode, ConvertNodeOption, Paint, NodeType, ColorStop, DomNodeType } from '../common/types';
import BaseConverter from './baseNode';
export declare class PolygonConverter<NType extends NodeType = 'REGULAR_POLYGON'> extends BaseConverter<NType> {
    polygonName: DomNodeType;
    convert(node: Node<NType>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    getPosition(dom: DomNode, container?: DomNode): {
        x: number;
        y: number;
    };
    createPolygonPath(dom: DomNode, node: Node<NType>, container?: DomNode): void;
    getMask(container: DomNode): DomNode;
    getPolygon(node: Node<NType>, dom: DomNode): any;
    convertFills(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    convertStrokes(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    convertLinearGradient(gradient: Paint, dom?: DomNode, container?: DomNode): string;
    convertRadialGradient(gradient: Paint, dom?: DomNode, container?: DomNode): string;
    getGradientStopDoms(gradientStops: ColorStop[]): DomNode[];
}
export default PolygonConverter;
