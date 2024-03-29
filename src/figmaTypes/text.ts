
import { Node, DomNode, PaintType } from './types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';

export class TEXTConverter extends BaseConverter<'TEXT'> {
    
    // 处理填充, 文本的fill就是字体的颜色
    convertFills(node:  Node<'TEXT'>, dom: DomNode) {
        dom.type = 'span';
        if(node.characters) dom.text = node.characters;
        if(node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch(fill.type) {
                case PaintType.SOLID: {
                    dom.style.color = util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case PaintType.GRADIENT_LINEAR: {
                    dom.style.color = this.convertLinearGradient(fill);
                    break;
                }
                // 径向性渐变
                case PaintType.GRADIENT_RADIAL: {
                    dom.style.color = this.convertRadialGradient(fill);
                    break;
                }
            }      
        } 
        return dom;     
    }
}

export default TEXTConverter;