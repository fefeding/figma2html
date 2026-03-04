import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';
/**
 * INSTANCE 节点转换器
 * 组件实例会继承主组件的样式，但可以有自己的覆盖
 */
export declare class INSTANCEConverter extends BaseConverter<'INSTANCE'> {
    convert(node: Node<'INSTANCE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
}
export default INSTANCEConverter;
