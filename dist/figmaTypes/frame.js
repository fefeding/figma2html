"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAMEConverter = void 0;
const baseNode_1 = __importDefault(require("./baseNode"));
class FRAMEConverter extends baseNode_1.default {
    async convert(node, dom) {
        return super.convert(node, dom);
    }
}
exports.FRAMEConverter = FRAMEConverter;
exports.default = FRAMEConverter;
