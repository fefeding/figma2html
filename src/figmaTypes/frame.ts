


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
            // 否则保持绝对定位（已在baseNode.ts中处理）
            if(hasLayoutAlign || hasLayoutGrow || hasLayoutSizing) {
                // 参与Auto Layout的子元素
                // position已在baseNode.ts中设置为relative
                // 这里只需要处理flex相关属性
                
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

                // 处理 layoutSizingHorizontal（宽度适应）
                if((node as any).layoutSizingHorizontal) {
                    switch((node as any).layoutSizingHorizontal) {
                        case 'FILL':
                            dom.style.flexGrow = '1';
                            break;
                        case 'HUG':
                            // 自适应内容宽度
                            dom.style.width = 'auto';
                            break;
                    }
                }

                // 处理 layoutSizingVertical（高度适应）
                if((node as any).layoutSizingVertical) {
                    switch((node as any).layoutSizingVertical) {
                        case 'FILL':
                            dom.style.alignSelf = 'stretch';
                            break;
                        case 'HUG':
                            // 自适应内容高度
                            dom.style.height = 'auto';
                            break;
                    }
                }
            }
            // 不参与Auto Layout的子元素：position已在baseNode.ts中设置为absolute
        }

        return super.convert(node, dom, parentNode, page, option, container);
    }
}

export default FRAMEConverter;