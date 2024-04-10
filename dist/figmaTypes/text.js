"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXTConverter = void 0;
const types_1 = require("./types");
const j_design_util_1 = require("j-design-util");
const baseNode_1 = __importDefault(require("./baseNode"));
class TEXTConverter extends baseNode_1.default {
    async convert(node, dom, parentNode, option) {
        dom.type = 'span';
        if (node.characters)
            dom.text = dom.data.text = node.characters;
        const res = await super.convert(node, dom, parentNode, option);
        /*dom.style.letterSpacing = dom.style.letterSpacing || '2px';
        if(dom.style.letterSpacing) {
            const v = util.toNumber(dom.style.letterSpacing);
            dom.bounds.width += v * dom.text.length;
        }*/
        dom.data.width = 'auto'; //dom.bounds.width;
        dom.style.minWidth = j_design_util_1.util.toPX(dom.data.width);
        dom.style.width = 'auto'; //// text没必要指定宽度
        await this.convertCharacterStyleOverrides(node, res, option); // 处理分字样式
        return res;
    }
    // 解析字体多样式
    async convertCharacterStyleOverrides(node, dom, option) {
        if (node.characterStyleOverrides && node.characterStyleOverrides.length && node.styleOverrideTable) {
            const text = dom.text || '';
            let index = 0;
            for (; index < node.characterStyleOverrides.length; index++) {
                const s = node.characterStyleOverrides[index];
                const f = text[index];
                if (!s || !f)
                    continue;
                const fDom = this.createDomNode('span');
                fDom.text = f;
                const style = node.styleOverrideTable[s];
                if (style) {
                    await this.convertFills(style, fDom, option);
                    await this.convertStyle(style, fDom, option);
                }
                dom.children.push(fDom);
            }
            // 还有未处理完的，则加到后面
            if (text.length > index) {
                const fDom = this.createDomNode('span');
                fDom.text = text.substring(index);
                dom.children.push(fDom);
            }
            dom.text = '';
            dom.type = 'div';
        }
    }
    // 处理填充, 文本的fill就是字体的颜色
    async convertFills(node, dom, option) {
        // @ts-ignore
        if (!node.isMaskOutline && node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch (fill.type) {
                case types_1.PaintType.SOLID: {
                    dom.style.color = j_design_util_1.util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case types_1.PaintType.GRADIENT_LINEAR: {
                    dom.style.background = this.convertLinearGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if (!dom.style.color)
                        dom.style.color = 'transparent';
                    break;
                }
                // 径向性渐变
                case types_1.PaintType.GRADIENT_RADIAL: {
                    dom.style.background = this.convertRadialGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if (!dom.style.color)
                        dom.style.color = 'transparent';
                    break;
                }
                // 图片
                case types_1.PaintType.IMAGE: {
                    if (option && option.getImage) {
                        const img = await option.getImage(fill.imageRef);
                        if (img)
                            dom.style.background = `url(${img})`;
                        dom.style.backgroundClip = 'text';
                        if (!dom.style.color)
                            dom.style.color = 'transparent';
                    }
                    break;
                }
            }
            switch (fill.scaleMode) {
                case types_1.PaintSolidScaleMode.FILL: {
                    dom.style.backgroundSize = 'cover';
                    break;
                }
                case types_1.PaintSolidScaleMode.FIT: {
                    dom.style.backgroundSize = 'contain';
                    break;
                }
                case types_1.PaintSolidScaleMode.STRETCH: {
                    dom.style.backgroundSize = '100% 100%';
                    break;
                }
                // 平铺
                case types_1.PaintSolidScaleMode.TILE: {
                    dom.style.backgroundRepeat = 'repeat';
                    break;
                }
            }
        }
        return dom;
    }
}
exports.TEXTConverter = TEXTConverter;
exports.default = TEXTConverter;
