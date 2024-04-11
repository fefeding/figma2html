import { Node, DomNode, ConvertNodeOption, Paint, ColorStop } from '../common/types';
import BaseConverter from './baseNode';
export declare class ELLIPSEConverter extends BaseConverter<'ELLIPSE'> {
    convert(node: Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
    convertFills(node: Node<'ELLIPSE'>, dom: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    convertStrokes(node: Node<'ELLIPSE'>, dom: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
    convertLinearGradient(gradient: Paint, dom?: DomNode): string;
    convertRadialGradient(gradient: Paint, dom?: DomNode): string;
    getGradientStopDoms(gradientStops: ColorStop[]): DomNode[];
}
export default ELLIPSEConverter;
