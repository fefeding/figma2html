
import { Node, DomNode, ConvertNodeOption, DomNodeType, NodeType } from '../common/types';
import PolygonConverter from './polygon';

export class VECTORConverter extends PolygonConverter<'VECTOR'> {
    // VECTOR 使用 path 元素
    polygonName: DomNodeType = 'path';

    async convert(node: Node<'VECTOR'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

export default VECTORConverter;
