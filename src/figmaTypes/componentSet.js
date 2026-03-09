import BaseConverter from './baseNode';
/**
 * COMPONENT_SET 节点转换器
 * 组件集用于管理组件的变体（variants）
 */
export class COMPONENT_SETConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        // 标记为组件集
        dom.attributes = dom.attributes || {};
        dom.attributes['data-component-set'] = 'true';
        // ========== Flex Item 属性处理 ==========
        // 检查是否参与父元素的 Auto Layout
        const parentLayoutMode = parentNode ? parentNode.layoutMode : undefined;
        const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
        const isExplicitAbsolute = node.layoutPositioning === 'ABSOLUTE';
        const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
        if (participatesInAutoLayout) {
            // 处理 layoutGrow（flex-grow）
            const layoutGrow = node.layoutGrow;
            if (layoutGrow !== undefined && layoutGrow !== 0) {
                dom.style.flexGrow = layoutGrow.toString();
                dom.style.flexBasis = '0';
            }
            // 处理 layoutAlign（align-self）
            const layoutAlign = node.layoutAlign;
            if (layoutAlign && layoutAlign !== 'INHERIT') {
                switch (layoutAlign) {
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
            const layoutSizingHorizontal = node.layoutSizingHorizontal;
            if (layoutSizingHorizontal) {
                switch (layoutSizingHorizontal) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'HORIZONTAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.width = 'auto';
                        break;
                    case 'HUG':
                        dom.style.width = 'auto';
                        break;
                }
            }
            // 处理 layoutSizingVertical
            const layoutSizingVertical = node.layoutSizingVertical;
            if (layoutSizingVertical) {
                switch (layoutSizingVertical) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'VERTICAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
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
