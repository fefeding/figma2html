import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';
export declare class DocumentConverter extends BaseConverter<'DOCUMENT'> {
    convert(node: Node<'DOCUMENT'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption): Promise<DomNode>;
}
export default DocumentConverter;
