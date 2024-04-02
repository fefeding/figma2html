import { Node, DomNode, ConvertNodeOption, Paint, Vector, ColorStop } from './types';
import BaseConverter from './baseNode';
export declare class FRAMEConverter extends BaseConverter<'ELLIPSE'> {
    convert(node: Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
    convertFills(node: Node<'ELLIPSE'>, dom: DomNode, option?: ConvertNodeOption): DomNode;
    convertStrokes(node: Node<'ELLIPSE'>, dom: DomNode, option?: ConvertNodeOption): DomNode;
    convertLinearGradient(gradient: Paint): string;
    convertRadialGradient(gradient: Paint): string;
    getRadialGradientPosition(gradientHandlePositions: Vector[]): string;
    getGradientDirection(gradientHandlePositions: Vector[]): string;
    getGradientStops(gradientStops: ColorStop[]): string;
}
export default FRAMEConverter;
