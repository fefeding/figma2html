import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';
/**
 * COMPONENT_SET 节点转换器
 * 组件集用于管理组件的变体（variants）
 */
export declare class COMPONENT_SETConverter extends BaseConverter<'COMPONENT_SET'> {
    convert(node: Node<'COMPONENT_SET'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
}
export default COMPONENT_SETConverter;
