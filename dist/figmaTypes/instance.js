import { util } from '@fefeding/utils';
import BaseConverter from './baseNode';
/**
 * INSTANCE 节点转换器
 * 组件实例会继承主组件的样式，但可以有自己的覆盖
 */
export class INSTANCEConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        // 标记为组件实例
        dom.attributes = dom.attributes || {};
        dom.attributes['data-instance'] = 'true';
        // 记录引用的主组件 ID
        if (node.componentId) {
            dom.attributes['data-component-id'] = node.componentId;
        }
        // 组件实例和 Frame 类似，Figma API 返回的实例数据已经包含了主组件的样式覆盖
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
                        // 优先使用relativeTransform（更精确）
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
                    // 父节点没有Auto Layout：使用绝对定位
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
        if (node.backgroundColor)
            dom.style.backgroundColor = util.colorToString(node.backgroundColor, 255);
        if (node.cornerRadius) {
            dom.style.borderRadius = util.toPX(node.cornerRadius);
        }
        else if (node.rectangleCornerRadii) {
            dom.style.borderRadius = node.rectangleCornerRadii.map(p => util.toPX(p)).join(' ');
        }
        if (node.opacity)
            dom.style.opacity = node.opacity.toString();
        dom.style.transformOrigin = 'center center';
        if (node.clipsContent === true || (parentNode && parentNode.clipsContent === true)) {
            dom.style.overflow = 'hidden';
        }
        dom.preserveRatio = node.preserveRatio;
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
        if (node.blendMode) {
            const cssBlendMode = this.convertBlendMode(node.blendMode);
            if (cssBlendMode) {
                dom.style.mixBlendMode = cssBlendMode;
            }
        }
        return dom;
    }
}
export default INSTANCEConverter;
