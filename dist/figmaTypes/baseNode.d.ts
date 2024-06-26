import { Node, DomNode, DomNodeType, NodeType, NodeConverter, Vector, ColorStop, ConvertNodeOption, Paint, TypeStyle } from '../common/types';
import { type Point } from '@fefeding/utils';
export declare class BaseConverter<NType extends NodeType = NodeType> implements NodeConverter<NType> {
    convert(node: Node<NType>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    createDomNode(type: DomNodeType, option?: DomNode): DomNode;
    convertStyle(node: Node<NType> | TypeStyle, dom: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    convertEffects(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    convertFills(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    convertStrokes(node: Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
    isEmptyDom(dom: DomNode): boolean;
    isTransparentColor(color: any): boolean;
    convertLinearGradient(gradient: Paint, dom?: DomNode, container?: DomNode): string;
    convertRadialGradient(gradient: Paint, dom?: DomNode, container?: DomNode): string;
    getGradientSize(gradientHandlePositions: Vector[]): {
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
        r: number;
        m: number;
        startInShape: {
            x: number;
            y: number;
        };
        cos: number;
        sin: number;
        getProjectionOnLine(point: Point): Point;
    };
    getRadialGradientPosition(gradientHandlePositions: Vector[]): string;
    getGradientDirection(gradientHandlePositions: Vector[]): string;
    getGradientStops(gradientStops: ColorStop[]): string | Array<DomNode>;
    calculateOriginalRectangleDimensions(radian: number, newWidth: number, newHeight: number): {
        width: number;
        height: number;
    };
}
export default BaseConverter;
