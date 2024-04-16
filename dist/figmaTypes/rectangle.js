import PolygonConverter from './polygon';
export class RECTANGLEConverter extends PolygonConverter {
    polygonName = 'path';
    async convert(node, dom, parentNode, page, option, container) {
        return super.convert(node, dom, parentNode, page, option, container);
    }
    // 生成多边形路径
    createPolygonPath(dom, node, container) {
        const pos = this.getPosition(dom, container);
        //dom.attributes['x'] = pos.x + '';
        //dom.attributes['y'] = pos.y + '';
        //dom.attributes['width'] = dom.bounds.width + '';
        //dom.attributes['height'] = dom.bounds.height + '';
        const path = [];
        const [r1, r2, r3, r4] = node.rectangleCornerRadii || [0, 0, 0, 0];
        if (r1) {
            path.push('M', pos.x, pos.y + r1);
            // 圆弧
            path.push('A', r1, r1, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x + r1, pos.y); // 终点
        }
        else {
            path.push('M', pos.x, pos.y);
        }
        if (r2) {
            path.push('L', pos.x + dom.bounds.width - r2, pos.y);
            // 圆弧
            path.push('A', r2, r2, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x + dom.bounds.width, pos.y + r2); // 终点
        }
        else {
            path.push('L', pos.x + dom.bounds.width, pos.y);
        }
        if (r3) {
            path.push('L', pos.x + dom.bounds.width, pos.y + dom.bounds.height - r3);
            // 圆弧
            path.push('A', r3, r3, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x + dom.bounds.width - r3, pos.y + dom.bounds.height); // 终点
        }
        else {
            path.push('L', pos.x + dom.bounds.width, pos.y + dom.bounds.height);
        }
        if (r4) {
            path.push('L', pos.x + r4, pos.y + dom.bounds.height);
            // 圆弧
            path.push('A', r4, r4, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x, pos.y + dom.bounds.height - r4); // 终点
        }
        else {
            path.push('L', pos.x, pos.y + dom.bounds.height);
        }
        dom.attributes['d'] = path.join(' ') + 'Z';
    }
}
export default RECTANGLEConverter;
