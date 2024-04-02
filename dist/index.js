"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFigmaFileImages = exports.getFigmaImage = exports.loadFigmaFile = exports.util = exports.nodeToDom = exports.convert = void 0;
const j_design_util_1 = require("j-design-util");
Object.defineProperty(exports, "util", { enumerable: true, get: function () { return j_design_util_1.util; } });
const node_1 = require("./figmaTypes/node");
Object.defineProperty(exports, "convert", { enumerable: true, get: function () { return node_1.convert; } });
Object.defineProperty(exports, "nodeToDom", { enumerable: true, get: function () { return node_1.nodeToDom; } });
/**
 * 获取figma文件
 * @param fileId
 * @param token
 */
async function loadFigmaFile(fileId, token) {
    const url = `https://api.figma.com/v1/files/${fileId}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await j_design_util_1.util.request(url, option);
    return JSON.parse(data);
}
exports.loadFigmaFile = loadFigmaFile;
// 获取文件所有图片
async function getFigmaFileImages(fileId, token) {
    const url = `https://api.figma.com/v1/files/${fileId}/images`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await j_design_util_1.util.request(url, option);
    const images = JSON.parse(data);
    if (images.meta && images.meta.images)
        return images.meta.images;
    return {};
}
exports.getFigmaFileImages = getFigmaFileImages;
// 获取图片
async function getFigmaImage(key, token, ids) {
    const url = `https://api.figma.com/v1/images/${key}?ids=${encodeURIComponent(ids)}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await j_design_util_1.util.request(url, option);
    const images = JSON.parse(data);
    if (images.meta && images.meta.images)
        return images.meta.images;
    return images;
}
exports.getFigmaImage = getFigmaImage;
exports.default = node_1.convert;
