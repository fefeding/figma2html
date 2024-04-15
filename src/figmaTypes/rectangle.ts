
import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import PolygonConverter from './polygon';

export class RECTANGLEConverter extends PolygonConverter<'RECTANGLE'> {
    async convert(node:  Node<'RECTANGLE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

export default RECTANGLEConverter;