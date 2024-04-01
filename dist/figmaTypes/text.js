"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXTConverter = void 0;
const types_1 = require("./types");
const j_design_util_1 = require("j-design-util");
const baseNode_1 = __importDefault(require("./baseNode"));
class TEXTConverter extends baseNode_1.default {
    // 处理填充, 文本的fill就是字体的颜色
    convertFills(node, dom) {
        dom.type = 'span';
        if (node.characters)
            dom.text = node.characters;
        if (node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch (fill.type) {
                case types_1.PaintType.SOLID: {
                    dom.style.color = j_design_util_1.util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case types_1.PaintType.GRADIENT_LINEAR: {
                    dom.style.color = this.convertLinearGradient(fill);
                    break;
                }
                // 径向性渐变
                case types_1.PaintType.GRADIENT_RADIAL: {
                    dom.style.color = this.convertRadialGradient(fill);
                    break;
                }
            }
        }
        return dom;
    }
}
exports.TEXTConverter = TEXTConverter;
exports.default = TEXTConverter;
