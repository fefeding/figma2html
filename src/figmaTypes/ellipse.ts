
import type { Node, DomNode, ConvertNodeOption } from './types';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'ELLIPSE'> {
    async convert(node:  Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'svg';
        let ellipse = {
            type: 'ellipse',
            style: {} as CSSStyleDeclaration,
            children: [] as Array<DomNode>,
        } as DomNode; 
        // svg外转用定位和大小，其它样式都给子元素
        ellipse =  await super.convert(node, ellipse, parentNode, option);
        dom.style.left = ellipse.style.left;
        dom.style.top = ellipse.style.top;
        //dom.style.width = ellipse.style.width;
        //dom.style.height = ellipse.style.height;

        delete ellipse.style.left;
        delete ellipse.style.top;
        delete ellipse.style.width;
        delete ellipse.style.height;

        dom.bounds = ellipse.bounds;

        dom.children.push(ellipse);
        return dom;
    }
}

export default FRAMEConverter;