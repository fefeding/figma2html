

import type { Node, DomNode, ConvertNodeOption } from '../common/types';
import BaseConverter from './baseNode';

/**
 * COMPONENT_SET 节点转换器
 * 组件集用于管理组件的变体（variants）
 */
export class COMPONENT_SETConverter extends BaseConverter<'COMPONENT_SET'> {
    async convert(node:  Node<'COMPONENT_SET'>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        // 标记为组件集
        dom.attributes = dom.attributes || {};
        dom.attributes['data-component-set'] = 'true';

        // ========== Flex Item 属性处理 ==========
        // 检查是否参与父元素的 Auto Layout
        const parentLayoutMode = parentNode ? (parentNode as any).layoutMode : undefined;
        const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
        const isExplicitAbsolute = (node as any).layoutPositioning === 'ABSOLUTE';
        const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
        
        if(participatesInAutoLayout) {
            // 处理 layoutGrow（flex-grow）
            const layoutGrow = (node as any).layoutGrow;
            if(layoutGrow !== undefined && layoutGrow !== 0) {
                dom.style.flexGrow = layoutGrow.toString();
                dom.style.flexBasis = '0';
            }
            
            // 处理 layoutAlign（align-self）
            const layoutAlign = (node as any).layoutAlign;
            if(layoutAlign && layoutAlign !== 'INHERIT') {
                switch(layoutAlign) {
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

            // 处理 layoutSizingHorizontal
            const layoutSizingHorizontal = (node as any).layoutSizingHorizontal;
            if(layoutSizingHorizontal) {
                switch(layoutSizingHorizontal) {
                    case 'FILL':
                        dom.style.flexGrow = '1';
                        dom.style.flexBasis = '0';
                        dom.style.width = 'auto';
                        break;
                    case 'HUG':
                        dom.style.width = 'auto';
                        break;
                }
            }

            // 处理 layoutSizingVertical
            const layoutSizingVertical = (node as any).layoutSizingVertical;
            if(layoutSizingVertical) {
                switch(layoutSizingVertical) {
                    case 'FILL':
                        dom.style.alignSelf = 'stretch';
                        dom.style.height = 'auto';
                        break;
                    case 'HUG':
                        dom.style.height = 'auto';
                        break;
                }
            }
        }

        // 调用基类转换方法处理定位和其他样式
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

export default COMPONENT_SETConverter;
