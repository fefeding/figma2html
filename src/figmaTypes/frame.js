import BaseConverter from './baseNode';
export class FRAMEConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        if (parentNode && parentNode.type === 'CANVAS') {
            dom.style.overflow = 'hidden';
            if (!parentNode.absoluteBoundingBox) {
                const parentBounds = this.getNodeAbsoluteBoundingBox(parentNode);
                if (parentBounds) {
                    parentNode.absoluteBoundingBox = parentBounds;
                }
            }
        }
        // ========== Auto Layout 子元素的 Flex 属性处理 ==========
        // 检查是否参与父元素的 Auto Layout
        const parentLayoutMode = parentNode ? parentNode.layoutMode : undefined;
        const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
        const isExplicitAbsolute = node.layoutPositioning === 'ABSOLUTE';
        const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
        if (participatesInAutoLayout) {
            // ========== 作为 Flex Item 的属性转换 ==========
            // 处理 layoutGrow（flex-grow）- 控制元素是否拉伸填充剩余空间
            const layoutGrow = node.layoutGrow;
            if (layoutGrow !== undefined && layoutGrow !== 0) {
                dom.style.flexGrow = layoutGrow.toString();
                // 如果有flexGrow，可能需要设置flexBasis
                dom.style.flexBasis = '0';
            }
            // 处理 layoutAlign（align-self）- 交叉轴对齐
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
            // 处理 layoutSizingHorizontal（水平方向尺寸策略）
            const layoutSizingHorizontal = node.layoutSizingHorizontal;
            if (layoutSizingHorizontal) {
                switch (layoutSizingHorizontal) {
                    case 'FILL':
                        // FILL 是“填充父容器在该轴向的可用空间”
                        // 若父是 HORIZONTAL，则水平是主轴，使用 flex-grow
                        if (parentNode.layoutMode === 'HORIZONTAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            // 父是 VERTICAL 时，水平是交叉轴，使用 stretch
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.width = 'auto';
                        break;
                    case 'HUG':
                        // 自适应内容宽度
                        dom.style.width = 'auto';
                        break;
                    // 'FIXED' 使用默认的固定宽度
                }
            }
            // 处理 layoutSizingVertical（垂直方向尺寸策略）
            const layoutSizingVertical = node.layoutSizingVertical;
            if (layoutSizingVertical) {
                switch (layoutSizingVertical) {
                    case 'FILL':
                        // 若父是 VERTICAL，则垂直是主轴，使用 flex-grow
                        if (parentNode.layoutMode === 'VERTICAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            // 父是 HORIZONTAL 时，垂直是交叉轴，使用 stretch
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.height = 'auto';
                        break;
                    case 'HUG':
                        // 自适应内容高度
                        dom.style.height = 'auto';
                        break;
                    // 'FIXED' 使用默认的固定高度
                }
            }
            // 处理 constraints（约束）- 在 Flex 容器中的附加约束
            if (node.constraints && !layoutSizingHorizontal && !layoutSizingVertical) {
                // 水平约束
                if (node.constraints.horizontal === 'LEFT_RIGHT' || node.constraints.horizontal === 'SCALE') {
                    // 左右约束或缩放：在水平布局中拉伸
                    if (parentNode.layoutMode === 'HORIZONTAL' && !layoutGrow) {
                        dom.style.flexGrow = '1';
                        dom.style.flexBasis = '0';
                    }
                }
                // 垂直约束
                if (node.constraints.vertical === 'TOP_BOTTOM' || node.constraints.vertical === 'SCALE') {
                    // 上下约束或缩放：在垂直布局中拉伸
                    if (parentNode.layoutMode === 'VERTICAL' && layoutAlign !== 'STRETCH') {
                        dom.style.alignSelf = 'stretch';
                    }
                }
            }
        }
        return super.convert(node, dom, parentNode, page, option, container);
    }
}
export default FRAMEConverter;
