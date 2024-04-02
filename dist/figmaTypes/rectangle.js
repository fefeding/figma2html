"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAMEConverter = void 0;
const baseNode_1 = __importDefault(require("./baseNode"));
class FRAMEConverter extends baseNode_1.default {
    async convert(node, dom, parentNode, option) {
        // 如果是填充的图5片，则直接用img
        if (node.fills && node.fills.length && node.fills[0].type === 'IMAGE') {
            dom.type = 'img';
        }
        return super.convert(node, dom, parentNode, option);
    }
}
exports.FRAMEConverter = FRAMEConverter;
exports.default = FRAMEConverter;
