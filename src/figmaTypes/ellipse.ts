
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, Vector, ColorStop, DomNodeType, } from '../common/types';
import { util } from 'j-design-util';
import PolygonConverter from './polygon';

export class ELLIPSEConverter extends PolygonConverter<'ELLIPSE'> {
    // 多边形标签名
    polygonName: DomNodeType = 'ellipse';    

    // 生成多边形路径
    createPolygonPath(dom: DomNode, node:  Node<'ELLIPSE'>) {
        dom.attributes['cx'] = '50%';
        dom.attributes['cy'] = '50%';
        dom.attributes['rx'] = '50%';
        dom.attributes['ry'] = '50%';
    }
}

export default ELLIPSEConverter;