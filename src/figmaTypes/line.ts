
import type { Node, DomNode, ConvertNodeOption, DomNodeType } from '../common/types';
import PolygonConverter from './polygon';

export class LINEConverter extends PolygonConverter<'LINE'> {

    polygonName: DomNodeType = 'line';

    async convert(node:  Node<'LINE'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        
        const res = await super.convert(node, dom, parentNode, page, option, container);
        if(dom.style.transform) {
            //polygon.style.transform = dom.style.transform;
            delete dom.style.transform;
        }
        delete dom.attributes['width'];
        delete dom.style['width'];
        delete dom.style['height'];
        delete dom.attributes['height'];
        delete dom.data['height'];
        delete dom.data['height'];
        return res;
    }

    // 生成多边形路径
    createPolygonPath(dom: DomNode, node:  Node<'LINE'>, container?: DomNode) {
        const pos = this.getPosition(dom, container);
        
        dom.attributes['x1'] = pos.x + '';
        dom.attributes['y1'] = pos.y + '';

        dom.attributes['x2'] = (pos.x + dom.bounds.width) + '';
        dom.attributes['y2'] = (pos.y + dom.bounds.height) + '';
    }
}

export default LINEConverter;