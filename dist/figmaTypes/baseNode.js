"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConverter = void 0;
const types_1 = require("./types");
const j_design_util_1 = require("j-design-util");
class BaseConverter {
    async convert(node, dom) {
        dom.style = dom.style || {};
        console.log(node.absoluteBoundingBox);
        if (node.absoluteBoundingBox) {
            dom.style.width = j_design_util_1.util.toPX(node.absoluteBoundingBox.width).toString();
            dom.style.height = j_design_util_1.util.toPX(node.absoluteBoundingBox.height).toString();
            dom.style.left = j_design_util_1.util.toPX(node.absoluteBoundingBox.x).toString();
            dom.style.top = j_design_util_1.util.toPX(node.absoluteBoundingBox.y).toString();
        }
        if (node.cornerRadius) {
            dom.style.borderRadius = j_design_util_1.util.toPX(node.cornerRadius);
        }
        // padding
        for (const padding of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) {
            if (node[padding])
                dom.style[padding] = j_design_util_1.util.toPX(node[padding]);
        }
        this.convertStyle(node, dom);
        this.convertFills(node, dom); // 解析fills
        this.convertEffects(node, dom); // 滤镜
        return dom;
    }
    // 转换style
    convertStyle(node, dom) {
        if (!node.style)
            return dom;
        if (node.style.fontFamily)
            dom.style.fontFamily = node.style.fontFamily;
        if (node.style.fontSize)
            dom.style.fontSize = j_design_util_1.util.toPX(node.style.fontSize);
        if (node.style.fontWeight)
            dom.style.fontWeight = node.style.fontWeight.toString();
        if (node.style.italic)
            dom.style.fontStyle = 'italic';
        if (node.style.letterSpacing)
            dom.style.letterSpacing = j_design_util_1.util.toPX(node.style.letterSpacing);
        if (node.style.lineHeightPx)
            dom.style.lineHeight = j_design_util_1.util.toPX(node.style.lineHeightPx);
        if (node.style.textAlignHorizontal)
            dom.style.textAlign = node.style.textAlignHorizontal;
        if (node.style.textAlignVertical)
            dom.style.verticalAlign = node.style.textAlignVertical;
        return dom;
    }
    // 转换滤镜
    convertEffects(node, dom) {
        if (node.effects) {
            for (const effect of node.effects) {
                if (!effect.visible === false)
                    continue;
                switch (effect.type) {
                    case types_1.EffectType.DROP_SHADOW:
                    case types_1.EffectType.INNER_SHADOW: {
                        dom.style.filter += ` drop-shadow(${j_design_util_1.util.toPX(effect.offset.x)} ${j_design_util_1.util.toPX(effect.offset.y)} ${j_design_util_1.util.toPX(effect.radius)} ${j_design_util_1.util.colorToString(effect.color)})`;
                        break;
                    }
                    case types_1.EffectType.LAYER_BLUR:
                    case types_1.EffectType.BACKGROUND_BLUR: {
                        dom.style.filter += ` blur(${j_design_util_1.util.toPX(effect.radius)})`;
                        break;
                    }
                }
            }
        }
        return dom;
    }
    // 处理填充
    convertFills(node, dom) {
        if (node.fills) {
            for (const fill of node.fills) {
                if (fill.visible === false)
                    continue;
                switch (fill.type) {
                    case types_1.PaintType.SOLID: {
                        dom.style.backgroundColor = j_design_util_1.util.colorToString(fill.color, 255);
                        break;
                    }
                    // 线性渐变
                    case types_1.PaintType.GRADIENT_LINEAR: {
                        dom.style.background = this.convertLinearGradient(fill);
                        break;
                    }
                    // 径向性渐变
                    case types_1.PaintType.GRADIENT_RADIAL: {
                        dom.style.background = this.convertRadialGradient(fill);
                        break;
                    }
                    // 图片
                    case types_1.PaintType.IMAGE: {
                        dom.style.backgroundImage = fill.imageRef;
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
                        break;
                    }
                }
            }
        }
        return dom;
    }
    // 转换线性渐变
    convertLinearGradient(gradient) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        // console.log(handlePositions);
        const linearGradient = `linear-gradient(${this.getGradientDirection(handlePositions)}, ${this.getGradientStops(gradientStops)})`;
        return linearGradient;
    }
    // 转换径向性渐变
    convertRadialGradient(gradient) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        // console.log(handlePositions);
        const radialGradient = `radial-gradient(${this.getRadialGradientPosition(handlePositions)}, ${this.getGradientStops(gradientStops)})`;
        return radialGradient;
    }
    // 径向性位置
    getRadialGradientPosition(gradientHandlePositions) {
        if (!gradientHandlePositions || !gradientHandlePositions.length)
            return 'center';
        return `farthest-corner at ${j_design_util_1.util.toPX(gradientHandlePositions[0].x)} ${j_design_util_1.util.toPX(gradientHandlePositions[0].y)}`;
    }
    // Helper function to get the gradient direction
    getGradientDirection(gradientHandlePositions) {
        if (gradientHandlePositions.length >= 2) {
            const start = gradientHandlePositions[0];
            const end = gradientHandlePositions[1]; // Use the second handle, ignoring the last one
            // Calculate the angle in radians
            const angleRadians = Math.atan2(end.y - start.y, end.x - start.x);
            // Convert radians to degrees and normalize to the range [0, 360)
            let angleDegrees = (angleRadians * 180) / Math.PI;
            angleDegrees = (angleDegrees + 360) % 360;
            // console.log(`${angleDegrees}deg`);
            return `${angleDegrees}deg`;
        }
        else {
            console.error("Insufficient handle positions for gradient calculation.");
            return ""; // or any default value
        }
    }
    // Helper function to get the gradient stops
    getGradientStops(gradientStops) {
        // Constructing the gradient stops string based on received data
        const stopsString = gradientStops
            .map((stop) => j_design_util_1.util.colorToString(stop.color) + ` ${stop.position * 100}%`)
            .join(", ");
        return stopsString;
    }
}
exports.BaseConverter = BaseConverter;
exports.default = BaseConverter;
