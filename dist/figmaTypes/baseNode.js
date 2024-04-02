"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConverter = void 0;
const types_1 = require("./types");
const j_design_util_1 = require("j-design-util");
class BaseConverter {
    async convert(node, dom, parentNode, option) {
        dom.style = dom.style || {};
        // 位置
        dom.bounds = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        if (node.absoluteBoundingBox) {
            dom.bounds.width = node.absoluteBoundingBox.width;
            dom.bounds.height = node.absoluteBoundingBox.height;
            dom.style.width = j_design_util_1.util.toPX(dom.bounds.width).toString();
            dom.style.height = j_design_util_1.util.toPX(dom.bounds.height).toString();
            // 相对于父位置
            if (parentNode && parentNode.absoluteBoundingBox) {
                dom.bounds.x = node.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x;
                dom.bounds.y = node.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y;
            }
            // 没有父元素，就认为约对定位为0
            else {
                dom.bounds.x = 0;
                dom.bounds.y = 0;
            }
            dom.style.left = j_design_util_1.util.toPX(dom.bounds.x).toString();
            dom.style.top = j_design_util_1.util.toPX(dom.bounds.y).toString();
            dom.absoluteBoundingBox = node.absoluteBoundingBox;
        }
        // 背景色
        if (node.backgroundColor)
            dom.style.backgroundColor = j_design_util_1.util.colorToString(node.backgroundColor, 255);
        if (node.cornerRadius) {
            dom.style.borderRadius = j_design_util_1.util.toPX(node.cornerRadius);
        }
        // padding
        for (const padding of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) {
            if (node[padding])
                dom.style[padding] = j_design_util_1.util.toPX(node[padding]);
        }
        this.convertStyle(node, dom, option);
        this.convertFills(node, dom, option); // 解析fills
        this.convertEffects(node, dom, option); // 滤镜
        return dom;
    }
    // 转换style
    convertStyle(node, dom, option) {
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
    convertEffects(node, dom, option) {
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
    convertFills(node, dom, option) {
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
                        if (option && option.images) {
                            const img = option.images[fill.imageRef];
                            if (img) {
                                if (dom.type === 'img') {
                                    dom.url = img;
                                }
                                else {
                                    dom.style.backgroundImage = `url(${img})`;
                                }
                            }
                            dom.backgroundImageUrl = img || fill.imageRef;
                        }
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
    // 处理边框
    convertStrokes(node, dom, option) {
        if (node.strokes && node.strokes.length) {
            for (const stroke of node.strokes) {
                if (stroke.visible === false)
                    continue;
                dom.style.borderColor = j_design_util_1.util.colorToString(stroke.color, 255);
                switch (stroke.type) {
                    case types_1.PaintType.SOLID: {
                        dom.style.borderStyle = 'solid';
                        break;
                    }
                    // 线性渐变
                    case types_1.PaintType.GRADIENT_LINEAR: {
                        dom.style.borderImageSource = this.convertLinearGradient(stroke);
                        break;
                    }
                    // 径向性渐变
                    case types_1.PaintType.GRADIENT_RADIAL: {
                        dom.style.borderImageSource = this.convertRadialGradient(stroke);
                        break;
                    }
                    // 图片
                    case types_1.PaintType.IMAGE: {
                        if (option && option.images) {
                            const img = option.images[stroke.imageRef];
                            if (img)
                                dom.style.borderImage = `url(${img})`;
                        }
                        switch (stroke.scaleMode) {
                            case types_1.PaintSolidScaleMode.FILL: {
                                dom.style.borderImageSlice = 'fill';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.FIT: {
                                dom.style.borderImageRepeat = 'space';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.STRETCH: {
                                dom.style.borderImageRepeat = 'stretch';
                                break;
                            }
                            // 平铺
                            case types_1.PaintSolidScaleMode.TILE: {
                                dom.style.borderImageRepeat = 'repeat';
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            if (node.strokeWeight)
                dom.style.borderWidth = dom.style.borderImageWidth = j_design_util_1.util.toPX(node.strokeWeight);
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
