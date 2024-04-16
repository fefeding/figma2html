
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, Vector, ColorStop, DomNodeType, } from '../common/types';
import { Point, util } from 'j-design-util';
import PolygonConverter from './polygon';

export class ELLIPSEConverter extends PolygonConverter<'ELLIPSE'> {
    // 多边形标签名
    polygonName: DomNodeType = 'ellipse';  
    async convert(node:  Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        // 如果有角度信息，则用多边形来计算
        if(node.arcData && (node.arcData.endingAngle - node.arcData.startingAngle < Math.PI * 2)) {
            this.polygonName = 'polygon';
        }
        else {
            this.polygonName = 'ellipse';
        }

        return super.convert(node, dom, parentNode, page, option, container);
    }  

    // 生成多边形路径
    createPolygonPath(dom: DomNode, node:  Node<'ELLIPSE'>, container?: DomNode) {
        const pos = this.getPosition(dom, container);
        const center = {
            x: dom.bounds.width / 2 + pos.x,
            y: dom.bounds.height / 2 + pos.y
        };

        if(this.polygonName === 'polygon') {
            // 圆的半径
            let radius = Math.min(dom.bounds.width, dom.bounds.height) / 2;
            // 减去边框大小
            if(node.strokeWeight) {
                radius -= node.strokeWeight;
            }

            const points = this.createArcPoints(center, radius, node.arcData.startingAngle, node.arcData.endingAngle);
            // 有内圆
            if(node.arcData.innerRadius > 0) {
                const innerPoints = this.createArcPoints(center, radius * node.arcData.innerRadius, node.arcData.startingAngle, node.arcData.endingAngle);
                // 为了首尾相接，把内圆坐标反转
                points.push(...innerPoints.reverse());
            }
            dom.attributes['points'] = points.map(p => p.join(',')).join(' ');
        }
        else {
            dom.attributes['cx'] = center.x + '';
            dom.attributes['cy'] = center.y + '';
            dom.attributes['rx'] = dom.bounds.width / 2 + '';
            dom.attributes['ry'] = dom.bounds.height / 2 + '';
        }
    }

    createArcPoints(center: Point, radius: number, startAngle: number=0, endAngle: number=Math.PI*2) {
        const step = 1 / radius;

		const points = [] as Array<[number,number]>;
		//椭圆方程x=a*cos(r) ,y=b*sin(r)	
		for(let r=startAngle; r <= endAngle; r += step) {	

			const x = Math.cos(r) * radius + center.x;
			const y = Math.sin(r) * radius + center.y;
			points.push([
                x, y
            ]);
		}
        return points;
    }
}

export default ELLIPSEConverter;