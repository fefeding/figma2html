import PolygonConverter from './polygon';
export class BooleanOperationConverter extends PolygonConverter {
    // 使用 path 元素
    polygonName = 'path';
    async convert(node, dom, parentNode, page, option, container) {
        // BOOLEAN_OPERATION 有自己的 fillGeometry（合并后的形状）
        // 应该使用这个形状，而不是依赖子元素
        // 子元素的渲染在 node.ts 中根据 fillGeometry 的存在来判断是否跳过
        return super.convert(node, dom, parentNode, page, option, container);
    }
}
export default BooleanOperationConverter;
