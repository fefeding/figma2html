"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentConverter = void 0;
const baseNode_1 = __importDefault(require("./baseNode"));
class DocumentConverter extends baseNode_1.default {
    async convert(node, dom, parentNode, option) {
        dom.type = 'div';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, option);
    }
}
exports.DocumentConverter = DocumentConverter;
exports.default = DocumentConverter;
