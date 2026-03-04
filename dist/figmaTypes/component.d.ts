import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';
/**
 * COMPONENT 节点转换器
 * 组件节点本质上和 FRAME 类似，但包含组件特有的属性
 */
export declare class COMPONENTConverter extends BaseConverter<'COMPONENT'> {
    convert(node: Node<'COMPONENT'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
}
export default COMPONENTConverter;
