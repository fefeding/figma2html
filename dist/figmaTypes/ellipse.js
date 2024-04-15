import PolygonConverter from './polygon';
export class ELLIPSEConverter extends PolygonConverter {
    // 多边形标签名
    polygonName = 'ellipse';
    async convert(node, dom, parentNode, page, option) {
        // 如果有角度信息，则用多边形来计算
        if (node.arcData) {
            this.polygonName = 'polygon';
        }
        else {
            this.polygonName = 'ellipse';
        }
        return super.convert(node, dom, parentNode, page, option);
    }
    // 生成多边形路径
    createPolygonPath(dom, node) {
        if (node.arcData) {
            const center = {
                x: dom.bounds.width / 2,
                y: dom.bounds.height / 2
            };
            // 圆的半径
            let radius = Math.min(dom.bounds.width, dom.bounds.height) / 2;
            // 减去边框大小
            if (node.strokeWeight) {
                radius -= node.strokeWeight * 2;
            }
            const points = this.createArcPoints(center, radius, node.arcData.startingAngle, node.arcData.endingAngle);
            // 有内圆
            if (node.arcData.innerRadius > 0) {
                const innerPoints = this.createArcPoints(center, radius * node.arcData.innerRadius, node.arcData.startingAngle, node.arcData.endingAngle);
                // 为了首尾相接，把内圆坐标反转
                points.push(...innerPoints.reverse());
            }
            dom.attributes['points'] = points.map(p => p.join(',')).join(' ');
        }
        else {
            dom.attributes['cx'] = '50%';
            dom.attributes['cy'] = '50%';
            dom.attributes['rx'] = '50%';
            dom.attributes['ry'] = '50%';
        }
    }
    createArcPoints(center, radius, startAngle = 0, endAngle = Math.PI * 2) {
        const step = 1 / radius;
        const points = [];
        //椭圆方程x=a*cos(r) ,y=b*sin(r)	
        for (let r = startAngle; r <= endAngle; r += step) {
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
