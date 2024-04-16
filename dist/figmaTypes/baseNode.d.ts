import { Node, DomNode, DomNodeType, NodeType, NodeConverter, Vector, ColorStop, ConvertNodeOption, Paint, TypeStyle } from '../common/types';
import { type Point } from 'j-design-util';
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
            /**
             * 需要计算figma线性渐变位置百分比，因为把图形X和Y都标准化成0-1.所以我们可以认为它就是一个正方形，在figma上编缉的渐变2个点表示stops变化区域，需要计算这2点区域映射到图形的stop比
             */
            y: number;
        };
        end: {
            x: number;
            /**
             * 需要计算figma线性渐变位置百分比，因为把图形X和Y都标准化成0-1.所以我们可以认为它就是一个正方形，在figma上编缉的渐变2个点表示stops变化区域，需要计算这2点区域映射到图形的stop比
             */
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
}
export default BaseConverter;
