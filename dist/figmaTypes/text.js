import { PaintType, PaintSolidScaleMode } from '../common/types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';
export class TEXTConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option) {
        dom.type = 'text';
        if (node.characters)
            dom.text = dom.data.text = node.characters;
        const res = await super.convert(node, dom, parentNode, page, option);
        //dom.style.letterSpacing = dom.style.letterSpacing || '1px';
        /*if(dom.style.letterSpacing) {
            const v = util.toNumber(dom.style.letterSpacing);
            dom.bounds.width += v * (dom.bounds.width/node.style.fontSize);
        }*/
        let isSingleLine = false; // 单行处理
        // 如果行高好高度一致,则表示单行文本，可以不指定宽度
        if (dom.bounds?.height < node.style?.fontSize * 2) {
            isSingleLine = true;
            const w = this.testTextWidth(dom);
            dom.data.width = Math.max(w, util.toNumber(dom.data.width));
        }
        else {
            //dom.style.minWidth = util.toPX(dom.data.width);
            dom.data.width = dom.bounds.width;
        }
        await this.convertCharacterStyleOverrides(node, res, option, isSingleLine); // 处理分字样式
        dom.style.width = util.toPX(++dom.data.width);
        return res;
    }
    // 解析字体多样式
    async convertCharacterStyleOverrides(node, dom, option, isSingleLine = false) {
        let width = 0;
        if (node.characterStyleOverrides && node.characterStyleOverrides.length && node.styleOverrideTable) {
            const text = dom.text || '';
            let index = 0;
            let lastStyleOverrides = -1;
            let lastDom = null;
            for (; index < node.characterStyleOverrides.length; index++) {
                const s = node.characterStyleOverrides[index];
                const f = text[index];
                if (!f)
                    continue;
                // 如果是连续的同样的样式文字，则组合
                if (!lastDom || lastStyleOverrides !== s) {
                    lastDom = this.createDomNode('span');
                    lastDom.text = '';
                    lastDom.style.position = 'relative'; // 连续字符不能用绝对定位
                    const style = node.styleOverrideTable[s];
                    if (style) {
                        await this.convertFills(style, lastDom, option);
                        await this.convertStyle(style, lastDom, option);
                    }
                    dom.children.push(lastDom);
                }
                lastDom.text += f;
                lastStyleOverrides = s;
            }
            // 还有未处理完的，则加到后面
            if (text.length > index) {
                const fDom = this.createDomNode('span');
                fDom.text = text.substring(index);
                dom.children.push(fDom);
            }
            for (const c of dom.children) {
                // 单行需要计算宽度
                if (isSingleLine) {
                    const w = this.testTextWidth(c, dom);
                    width += w;
                }
                // 处理完样式后，需要删除可以继承父的样式
                this.checkParentAndChildStyleForDelete(dom, c);
            }
            dom.data.text = dom.text = '';
            //dom.type = 'div';
        }
        // 这种方式文本宽度需要重新计算
        dom.data.width = Math.max(width, util.toNumber(dom.data.width));
    }
    // 处理填充, 文本的fill就是字体的颜色
    async convertFills(node, dom, option) {
        // @ts-ignore
        if (!node.isMaskOutline && node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch (fill.type) {
                case PaintType.SOLID: {
                    dom.style.color = util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case PaintType.GRADIENT_LINEAR: {
                    dom.style.background = this.convertLinearGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if (!dom.style.color)
                        dom.style.color = 'transparent';
                    break;
                }
                // 径向性渐变
                case PaintType.GRADIENT_RADIAL: {
                    dom.style.background = this.convertRadialGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if (!dom.style.color)
                        dom.style.color = 'transparent';
                    break;
                }
                // 图片
                case PaintType.IMAGE: {
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
    // 检查父子相同的字体样式，如果子元素没有的样式，继承自父的
    checkParentAndChildStyle(parent, child) {
        if (!parent.style || !child.style)
            return;
        const checkStyles = ['color', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'font', 'letterSpacing', 'lineHeight', 'textAlign', 'verticalAlign'];
        for (const n of checkStyles) {
            if (parent.style[n] && !child.style[n])
                child.style[n] = parent.style[n];
        }
    }
    // 检查父子相同的字体样式，从子元素移除相机的字体相关样式
    checkParentAndChildStyleForDelete(parent, child) {
        if (!parent.style || !child.style)
            return;
        const checkStyles = ['color', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'font', 'letterSpacing', 'lineHeight', 'textAlign', 'verticalAlign'];
        for (const n of checkStyles) {
            if (parent.style[n] == child.style[n])
                delete child.style[n];
        }
    }
    // 测试字宽度
    testTextWidth(dom, parent) {
        const span = document.createElement('span');
        Object.assign(span.style, parent?.style || {}, dom.style);
        span.style.width = 'auto';
        span.style.position = 'absolute';
        span.innerText = dom.text;
        span.style.visibility = 'hidden';
        document.body.appendChild(span);
        let w = span.offsetWidth || span.clientWidth;
        if (dom.style.letterSpacing) {
            const v = util.toNumber(dom.style.letterSpacing);
            w += v;
        }
        document.body.removeChild(span);
        return w;
    }
}
export default TEXTConverter;
