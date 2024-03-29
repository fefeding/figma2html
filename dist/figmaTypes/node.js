"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const baseNode_1 = __importDefault(require("./baseNode"));
const frame_1 = __importDefault(require("./frame"));
const ConverterMaps = {
    'BASE': new baseNode_1.default(),
    'FRAME': new frame_1.default()
};
// 转node为html结构对象
async function convert(node) {
    const dom = {
        id: node.id,
        name: node.name,
        visible: !!node.visible,
        type: 'div',
        style: {},
        children: [],
    };
    if (node.children && node.children.length) {
        for (const child of node.children) {
            const c = await convert(child);
            dom.children.push(c);
        }
    }
    const converter = ConverterMaps[dom.type] || ConverterMaps.BASE;
    if (converter)
        await converter.convert(node, dom);
    return dom;
}
exports.convert = convert;
