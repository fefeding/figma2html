

import { Node, DomNode, ConvertNodeOption, DomNodeType, NodeType } from '../common/types';
import PolygonConverter from './polygon';

export class BooleanOperationConverter extends PolygonConverter<'BOOLEAN_OPERATION'> {
    // 使用 path 元素
    polygonName: DomNodeType = 'path';

    async convert(node: Node<'BOOLEAN_OPERATION'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        // BOOLEAN_OPERATION 有自己的 fillGeometry（合并后的形状）
        // 应该使用这个形状，而不是依赖子元素
        // 子元素的渲染在 node.ts 中根据 fillGeometry 的存在来判断是否跳过

        return super.convert(node, dom, parentNode, page, option, container);
    }
}

export default BooleanOperationConverter;
