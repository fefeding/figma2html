
import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import FRAMEConverter from './frame';

export class GroupConverter extends FRAMEConverter {
    async convert(node:  Node<'FRAME'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption) {        
        
        return super.convert(node, dom, parentNode, page, option);
    }
}

export default GroupConverter;