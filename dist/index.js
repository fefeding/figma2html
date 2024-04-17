import { util } from 'j-design-util';
import { convert, nodeToDom } from './node';
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
    const data = await util.request(url, option);
    return JSON.parse(data);
}
// 获取文件所有图片
async function getFigmaFileImages(fileId, token) {
    const url = `https://api.figma.com/v1/files/${fileId}/images`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await util.request(url, option);
    const images = JSON.parse(data);
    if (images.meta && images.meta.images)
        return images.meta.images;
    return {};
}
// 获取图片
async function getFigmaImage(key, token, ids) {
    const url = `https://api.figma.com/v1/images/${key}?ids=${encodeURIComponent(ids)}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await util.request(url, option);
    const images = JSON.parse(data);
    if (images.meta && images.meta.images)
        return images.meta.images;
    return images;
}
export { convert, nodeToDom, util, loadFigmaFile, getFigmaImage, getFigmaFileImages };
export default convert;
