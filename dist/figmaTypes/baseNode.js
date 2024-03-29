"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConverter = void 0;
const types_1 = require("./types");
const j_design_util_1 = require("j-design-util");
class BaseConverter {
    async convert(node, dom) {
        dom.style = dom.style || {};
        if (node.absoluteBoundingBox) {
            dom.style.width = j_design_util_1.util.toPX(node.absoluteBoundingBox.width).toString();
            dom.style.height = j_design_util_1.util.toPX(node.absoluteBoundingBox.height).toString();
        }
        this.convertFills(node, dom); // 解析fills
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
