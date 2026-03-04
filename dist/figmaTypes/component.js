import { util } from '@fefeding/utils';
import BaseConverter from './baseNode';
/**
 * COMPONENT 节点转换器
 * 组件节点本质上和 FRAME 类似，但包含组件特有的属性
 */
export class COMPONENTConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
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
        if (box) {
            dom.absoluteBoundingBox = {
                ...box
            };
            const center = {
                x: box.x + box.width / 2,
                y: box.y + box.height / 2
            };
            // 处理旋转（忽略极小的旋转值，如浮点误差）
            if (node.rotation && Math.abs(node.rotation) > 0.0001) {
                dom.data.rotation = node.rotation;
                dom.transform.rotateZ = node.rotation;
                dom.style.transform = `rotate(${util.toRad(node.rotation)})`;
                // 因为拿到的是新长形宽高，需要求出原始长方形宽高
                const size = this.calculateOriginalRectangleDimensions(dom.data.rotation, box.width, box.height);
                box.width = size.width;
                box.height = size.height;
                box.x = center.x - size.width / 2;
                box.y = center.y - size.height / 2;
            }
            dom.bounds.width = box.width;
            dom.bounds.height = box.height;
            // 检查父节点是否有Auto Layout
            const parentHasAutoLayout = parentNode && parentNode.layoutMode && parentNode.layoutMode !== 'NONE';
            // 检查当前节点是否参与Auto Layout
            const hasLayoutAlign = node.layoutAlign !== undefined;
            const hasLayoutGrow = node.layoutGrow !== undefined;
            const hasLayoutSizing = node.layoutSizingHorizontal !== undefined ||
                node.layoutSizingVertical !== undefined;
            const participatesInAutoLayout = hasLayoutAlign || hasLayoutGrow || hasLayoutSizing;
            if (page && !dom.isElement) {
                dom.data.left = dom.bounds.x = box.x - page.absoluteBoundingBox.x;
                dom.data.top = dom.bounds.y = box.y - page.absoluteBoundingBox.y;
                dom.style.position = 'absolute';
            }
            else if (parentNode && parentNode.absoluteBoundingBox) {
                if (parentHasAutoLayout) {
                    if (participatesInAutoLayout) {
                        dom.data.left = dom.bounds.x = 0;
                        dom.data.top = dom.bounds.y = 0;
                        dom.style.position = 'relative';
                    }
                    else {
                        // 不参与Auto Layout：使用绝对定位
                        if (node.relativeTransform) {
                            dom.data.left = dom.bounds.x = node.relativeTransform[0][2];
                            dom.data.top = dom.bounds.y = node.relativeTransform[1][2];
                        }
                        else {
                            dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x;
                            dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y;
                        }
                        dom.style.position = 'absolute';
                    }
                }
                else {
                    if (node.relativeTransform) {
                        dom.data.left = dom.bounds.x = node.relativeTransform[0][2];
                        dom.data.top = dom.bounds.y = node.relativeTransform[1][2];
                    }
                    else {
                        dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x;
                        dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y;
                    }
                    dom.style.position = 'absolute';
                }
            }
            else {
                dom.data.left = dom.bounds.x = 0;
                dom.data.top = dom.bounds.y = 0;
                dom.style.position = 'absolute';
            }
        }
        // 处理背景色
        if (node.backgroundColor)
            dom.style.backgroundColor = util.colorToString(node.backgroundColor, 255);
        // 处理圆角
        if (node.cornerRadius) {
            dom.style.borderRadius = util.toPX(node.cornerRadius);
        }
        else if (node.rectangleCornerRadii) {
            dom.style.borderRadius = node.rectangleCornerRadii.map(p => util.toPX(p)).join(' ');
        }
        // 处理透明度
        if (node.opacity)
            dom.style.opacity = node.opacity.toString();
        dom.style.transformOrigin = 'center center';
        // 裁剪超出区域
        if (node.clipsContent === true || (parentNode && parentNode.clipsContent === true)) {
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
        // 只有绝对定位时才设置left/top
        if (dom.style.position === 'absolute') {
            dom.style.left = util.toPX(dom.bounds.x).toString();
            dom.style.top = util.toPX(dom.bounds.y).toString();
        }
        dom.style.width = util.toPX(dom.bounds.width).toString();
        dom.style.height = util.toPX(dom.bounds.height).toString();
        // 处理混合模式
        if (node.blendMode) {
            const cssBlendMode = this.convertBlendMode(node.blendMode);
            if (cssBlendMode) {
                dom.style.mixBlendMode = cssBlendMode;
            }
        }
        return dom;
    }
}
export default COMPONENTConverter;
