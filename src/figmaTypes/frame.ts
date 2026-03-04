


import type { Node, NodeType, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'FRAME'> {
    async convert(node:  Node<'FRAME'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        
        if(parentNode && parentNode.type === 'CANVAS') {
            dom.style.overflow = 'hidden';
            if(parentNode && !parentNode.absoluteBoundingBox) {
                // 如果是一级节点，则下面的节点都相对于它
                parentNode.absoluteBoundingBox = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                // 取最左顶点角
                if(parentNode.children && parentNode.children.length) {
                    for(const child of parentNode.children) {
                       if(child.absoluteBoundingBox) {
                        parentNode.absoluteBoundingBox.x = Math.min(parentNode.absoluteBoundingBox.x, child.absoluteBoundingBox.x);
                        parentNode.absoluteBoundingBox.y = Math.min(parentNode.absoluteBoundingBox.y, child.absoluteBoundingBox.y);
                       }
                    }
                }
            }
        }

        // Auto Layout 子元素的额外处理
        // 如果父元素有 Auto Layout，检查子元素是否参与 Auto Layout
        // 子元素只有在有 layoutAlign 或 layoutGrow 属性时才参与 Auto Layout
        // 否则应该保持绝对定位（使用 relativeTransform）
        if(parentNode && (parentNode as any).layoutMode && (parentNode as any).layoutMode !== 'NONE') {
            const hasLayoutAlign = (node as any).layoutAlign !== undefined;
            const hasLayoutGrow = (node as any).layoutGrow !== undefined;
            const hasLayoutSizing = (node as any).layoutSizingHorizontal !== undefined || 
                                    (node as any).layoutSizingVertical !== undefined;
            
            // 只有当子元素有 Auto Layout 相关属性时，才让它参与 flexbox 布局
            // 否则保持绝对定位
            if(hasLayoutAlign || hasLayoutGrow || hasLayoutSizing) {
                // 移除绝对定位，让 flexbox 布局生效
                dom.style.position = 'relative';
                dom.style.left = '';
                dom.style.top = '';
                
                // 处理 layoutGrow（flex-grow）
                if(hasLayoutGrow) {
                    dom.style.flexGrow = (node as any).layoutGrow.toString();
                }
                
                // 处理 layoutAlign（align-self）
                if(hasLayoutAlign) {
                    switch((node as any).layoutAlign) {
                        case 'INHERIT':
                            // 继承父元素，不需要设置
                            break;
                        case 'STRETCH':
                            dom.style.alignSelf = 'stretch';
                            break;
                        case 'MIN':
                            dom.style.alignSelf = 'flex-start';
                            break;
                        case 'CENTER':
                            dom.style.alignSelf = 'center';
                            break;
                        case 'MAX':
                            dom.style.alignSelf = 'flex-end';
                            break;
                    }
                }
            }
            // 没有 Auto Layout 属性的子元素保持绝对定位
            // 它们的位置由 relativeTransform 决定
        }

        return super.convert(node, dom, parentNode, page, option, container);
    }
}

export default FRAMEConverter;