import { Node, DomNode, NodeType, NodeConverter, Paint, Vector, ColorStop } from './types';
export declare class BaseConverter<NType extends NodeType = NodeType> implements NodeConverter<NType> {
    convert(node: Node<NType>, dom: DomNode, parentNode?: Node): Promise<DomNode>;
    convertStyle(node: Node<NType>, dom: DomNode): DomNode;
    convertEffects(node: Node<NType>, dom: DomNode): DomNode;
    convertFills(node: Node<NType>, dom: DomNode): DomNode;
    convertLinearGradient(gradient: Paint): string;
    convertRadialGradient(gradient: Paint): string;
    getRadialGradientPosition(gradientHandlePositions: Vector[]): string;
    getGradientDirection(gradientHandlePositions: Vector[]): string;
    getGradientStops(gradientStops: ColorStop[]): string;
}
export default BaseConverter;
