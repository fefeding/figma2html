
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, Vector, ColorStop, DomNodeType, } from '../common/types';
import { util } from 'j-design-util';
import PolygonConverter from './polygon';

// 五角星
export class StarConverter extends PolygonConverter<'STAR'> {

    // 生成多边形路径
    createPolygonPath(dom: DomNode, node:  Node<'STAR'>, container?: DomNode) {
        const pos = this.getPosition(dom, container);
        const radius = Math.min(dom.bounds.width, dom.bounds.height) / 2;// 画五角星的半径
        const center = {
            x: dom.bounds.width / 2 + pos.x,
            y: dom.bounds.height / 2 + pos.y
        };
        const point1 = [center.x, 0]; // 顶点
        const stepAngle = Math.PI * 2 / 5;// 圆分成五份

        const angle2 = Math.PI / 2 - stepAngle;// 右上角的点的角度
        const point2 = [
            center.x + Math.cos(angle2) * radius,
            center.y - Math.sin(angle2) * radius,
        ];

        const angle3 = stepAngle - angle2;
        const point3 = [
            center.x + Math.cos(angle3) * radius,
            center.y + Math.sin(angle3) * radius,
        ];

        const point4 = [
            center.x - Math.cos(angle3) * radius,
            center.y + Math.sin(angle3) * radius,
        ];

        const point5 = [
            center.x - Math.cos(angle2) * radius,
            center.y - Math.sin(angle2) * radius,
        ];

        // 每隔一个点连线
        dom.attributes['points'] = [
            point1.join(','),
            point3.join(','),
            point5.join(','),
            point2.join(','),
            point4.join(','),
        ].join(' ');
    }
}

export default StarConverter;