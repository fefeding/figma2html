import { Node, DomNode, NodeType, NodeConverter, Paint, Vector, ColorStop, ConvertNodeOption } from './types';
export declare class BaseConverter<NType extends NodeType = NodeType> implements NodeConverter<NType> {
    convert(node: Node<NType>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
    convertStyle(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption): DomNode;
    convertEffects(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption): DomNode;
    convertFills(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption): DomNode;
    convertStrokes(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption): DomNode;
    convertLinearGradient(gradient: Paint): string;
    convertRadialGradient(gradient: Paint): string;
    getRadialGradientPosition(gradientHandlePositions: Vector[]): string;
    getGradientDirection(gradientHandlePositions: Vector[]): string;
    getGradientStops(gradientStops: ColorStop[]): string;
}
export default BaseConverter;
