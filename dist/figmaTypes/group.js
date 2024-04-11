"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupConverter = void 0;
const frame_1 = __importDefault(require("./frame"));
class GroupConverter extends frame_1.default {
    async convert(node, dom, parentNode, option) {
        return super.convert(node, dom, parentNode, option);
    }
}
exports.GroupConverter = GroupConverter;
exports.default = GroupConverter;
