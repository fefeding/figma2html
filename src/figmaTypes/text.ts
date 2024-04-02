
import { Node, DomNode, PaintType, ConvertNodeOption } from './types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';

export class TEXTConverter extends BaseConverter<'TEXT'> {
    async convert(node:  Node<'TEXT'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'span';
        if(node.characters) dom.text = node.characters;
        const res = await super.convert(node, dom, parentNode, option);
        res.style.width = 'auto';// text没必要指定宽度
        return res;
    }
    // 处理填充, 文本的fill就是字体的颜色
    convertFills(node:  Node<'TEXT'>, dom: DomNode) {
        
        if(node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch(fill.type) {
                case PaintType.SOLID: {
                    dom.style.color = util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case PaintType.GRADIENT_LINEAR: {
                    dom.style.background = this.convertLinearGradient(fill);
                    dom.style.backgroundClip = 'text';
                    break;
                }
                // 径向性渐变
                case PaintType.GRADIENT_RADIAL: {
                    dom.style.background = this.convertRadialGradient(fill);
                    dom.style.backgroundClip = 'text';
                    break;
                }
            }      
        } 
        return dom;     
    }
}

export default TEXTConverter;