"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAMEConverter = void 0;
const baseNode_1 = __importDefault(require("./baseNode"));
class FRAMEConverter extends baseNode_1.default {
    async convert(node, dom, parentNode, option) {
        dom.type = 'svg';
        let ellipse = {
            type: 'ellipse',
            style: {},
            children: [],
        };
        // svg外转用定位和大小，其它样式都给子元素
        ellipse = await super.convert(node, ellipse, parentNode, option);
        dom.style.left = ellipse.style.left;
        dom.style.top = ellipse.style.top;
        //dom.style.width = ellipse.style.width;
        //dom.style.height = ellipse.style.height;
        delete ellipse.style.left;
        delete ellipse.style.top;
        delete ellipse.style.width;
        delete ellipse.style.height;
        dom.bounds = ellipse.bounds;
        dom.children.push(ellipse);
        return dom;
    }
}
exports.FRAMEConverter = FRAMEConverter;
exports.default = FRAMEConverter;
