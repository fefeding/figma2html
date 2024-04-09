
import { Node, DomNode, PaintType, ConvertNodeOption, PaintSolidScaleMode, TypeStyle } from './types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';

export class TEXTConverter extends BaseConverter<'TEXT'> {
    async convert(node:  Node<'TEXT'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'span';
        if(node.characters) dom.text = dom.data.text = node.characters;
        const res = await super.convert(node, dom, parentNode, option);       
        
        dom.data.width = dom.absoluteBoundingBox.width * 1.01;
        dom.style.width = util.toPX(dom.data.width);// text没必要指定宽度

        await this.convertCharacterStyleOverrides(node, res, option);// 处理分字样式
        return res;
    }

    // 解析字体多样式
    async convertCharacterStyleOverrides(node: Node<'TEXT'>, dom: DomNode, option?: ConvertNodeOption) {
        if(node.characterStyleOverrides && node.characterStyleOverrides.length && node.styleOverrideTable) {
            const text = dom.text || '';
            let index = 0;
            for(; index<node.characterStyleOverrides.length; index++) {
                const s = node.characterStyleOverrides[index];
                const f = text[index];
                if(!s || !f) continue;
                const fDom = this.createDomNode('span');
                fDom.text = f;
                const style = node.styleOverrideTable[s];
                if(style) {
                    await this.convertFills(style, fDom, option);
                    await this.convertStyle(style, fDom, option);
                }
                dom.children.push(fDom);
            }
            // 还有未处理完的，则加到后面
            if(text.length > index) {
                const fDom = this.createDomNode('span');
                fDom.text = text.substring(index);
                dom.children.push(fDom);
            }
            dom.text = '';
            dom.type = 'div';
        }
    }
    
    // 处理填充, 文本的fill就是字体的颜色
    async convertFills(node:  Node<'TEXT'>|TypeStyle, dom: DomNode, option?: ConvertNodeOption) {
        // @ts-ignore
        if(!node.isMaskOutline && node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch(fill.type) {
                case PaintType.SOLID: {
                    dom.style.color = util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case PaintType.GRADIENT_LINEAR: {
                    dom.style.background = this.convertLinearGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if(!dom.style.color) dom.style.color = 'transparent';
                    break;
                }
                // 径向性渐变
                case PaintType.GRADIENT_RADIAL: {
                    dom.style.background = this.convertRadialGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if(!dom.style.color) dom.style.color = 'transparent';
                    break;
                }

                // 图片
                case PaintType.IMAGE: {
                    if(option && option.getImage) {
                        const img = await option.getImage(fill.imageRef);
                        if(img) dom.style.background = `url(${img})`;
                        dom.style.backgroundClip = 'text';
                        if(!dom.style.color) dom.style.color = 'transparent';
                    }
                    break;
                }
            } 
                    
            switch(fill.scaleMode) {
                case PaintSolidScaleMode.FILL: {
                    dom.style.backgroundSize = 'cover';
                    break;
                }
                case PaintSolidScaleMode.FIT: {
                    dom.style.backgroundSize = 'contain';
                    break;
                }
                case PaintSolidScaleMode.STRETCH: {
                    dom.style.backgroundSize = '100% 100%';
                    break;
                }
                // 平铺
                case PaintSolidScaleMode.TILE: {
                    dom.style.backgroundRepeat = 'repeat';
                    break;
                }
            }     
        } 
        return dom;     
    }
}

export default TEXTConverter;