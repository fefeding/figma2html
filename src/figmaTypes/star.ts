
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, Vector, ColorStop, DomNodeType, } from '../common/types';
import { util } from 'j-design-util';
import PolygonConverter from './polygon';

// 五角星
export class StarConverter extends PolygonConverter<'STAR'> {

    // 生成多边形路径
    createPolygonPath(dom: DomNode, node:  Node<'STAR'>) {
        dom.attributes['cx'] = '50%';
        dom.attributes['cy'] = '50%';
        dom.attributes['rx'] = '50%';
        dom.attributes['ry'] = '50%';
    }
}

export default StarConverter;