import PolygonConverter from './polygon';
export class ELLIPSEConverter extends PolygonConverter {
    // 多边形标签名
    polygonName = 'ellipse';
    // 生成多边形路径
    createPolygonPath(dom, node) {
        dom.attributes['cx'] = '50%';
        dom.attributes['cy'] = '50%';
        dom.attributes['rx'] = '50%';
        dom.attributes['ry'] = '50%';
    }
}
export default ELLIPSEConverter;
