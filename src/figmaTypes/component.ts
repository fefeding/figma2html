

import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import { util } from '@fefeding/utils';
import BaseConverter from './baseNode';

/**
 * COMPONENT 节点转换器
 * 组件节点本质上和 FRAME 类似，但包含组件特有的属性
 */
export class COMPONENTConverter extends BaseConverter<'COMPONENT'> {
    async convert(node:  Node<'COMPONENT'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        // 标记为组件
        dom.attributes = dom.attributes || {};
        dom.attributes['data-component'] = 'true';
        
        // 组件和 Frame 类似，使用相同的基本转换逻辑
        // 处理边界框和定位
        dom.bounds = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

        const box = node.absoluteBoundingBox || node.absoluteRenderBounds;
        if(box) {
            dom.absoluteBoundingBox = {
                ...box
            };
            
            dom.bounds.width = box.width;
            dom.bounds.height = box.height;

            if(page && !dom.isElement) {
                dom.data.left = dom.bounds.x = box.x - page.absoluteBoundingBox.x; 
                dom.data.top = dom.bounds.y = box.y - page.absoluteBoundingBox.y; 
            }
            else if(parentNode && parentNode.absoluteBoundingBox) {
                dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x; 
                dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y; 
            }
            else {
                dom.data.left = dom.bounds.x = 0;
                dom.data.top = dom.bounds.y = 0;
            } 
        }

        // 处理背景色
        if(node.backgroundColor) dom.style.backgroundColor = util.colorToString(node.backgroundColor, 255);

        // 处理圆角
        if(node.cornerRadius) {
            dom.style.borderRadius = util.toPX(node.cornerRadius);
        }
        else if(node.rectangleCornerRadii) {
            dom.style.borderRadius = node.rectangleCornerRadii.map(p => util.toPX(p)).join(' ');
        }

        // 处理透明度
        if(node.opacity) dom.style.opacity = node.opacity.toString();

        dom.style.transformOrigin = 'center center';
        
        // 裁剪超出区域
        if(node.clipsContent === true || (parentNode && parentNode.clipsContent === true)) {
            dom.style.overflow = 'hidden';
        }
        
        // 是否保持宽高比
        dom.preserveRatio = node.preserveRatio;

        // 调用基类的样式转换方法
        await this.convertStyle(node, dom, option, container);
        await this.convertFills(node, dom, option, container);
        await this.convertStrokes(node, dom, option, container);
        await this.convertEffects(node, dom, option, container);
        
        dom.data.left = dom.bounds.x;
        dom.data.top = dom.bounds.y;
        dom.data.width = dom.bounds.width;
        dom.data.height = dom.bounds.height;

        dom.style.left = util.toPX(dom.bounds.x).toString();
        dom.style.top = util.toPX(dom.bounds.y).toString();
        dom.style.width = util.toPX(dom.bounds.width).toString();
        dom.style.height = util.toPX(dom.bounds.height).toString();

        // 处理混合模式
        if(node.blendMode) {
            const cssBlendMode = this.convertBlendMode(node.blendMode);
            if(cssBlendMode) {
                dom.style.mixBlendMode = cssBlendMode;
            }
        }

        return dom;
    }
}

export default COMPONENTConverter;
