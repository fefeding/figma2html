import PolygonConverter from './polygon';
export class VECTORConverter extends PolygonConverter {
    // VECTOR 使用 path 元素
    polygonName = 'path';
    async convert(node, dom, parentNode, page, option, container) {
        return super.convert(node, dom, parentNode, page, option, container);
    }
}
export default VECTORConverter;
