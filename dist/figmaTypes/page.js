"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageConverter = void 0;
const baseNode_1 = __importDefault(require("./baseNode"));
class PageConverter extends baseNode_1.default {
    async convert(node, dom, parentNode, option) {
        dom.type = 'page';
        dom.style.position = '';
        return super.convert(node, dom, parentNode, option);
    }
}
exports.PageConverter = PageConverter;
exports.default = PageConverter;
