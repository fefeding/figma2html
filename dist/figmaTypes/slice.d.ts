import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';
/**
 * SLICE 节点转换器
 * 切片节点主要用于导出，在 HTML 中通常不需要渲染
 * 但如果需要显示，可以创建一个带边框的占位区域
 */
export declare class SLICEConverter extends BaseConverter<'SLICE'> {
    convert(node: Node<'SLICE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
}
export default SLICEConverter;
