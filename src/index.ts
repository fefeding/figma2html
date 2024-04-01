export type * from './figmaTypes/types';
import { util } from 'j-design-util';
import { convert } from './figmaTypes/node';

/**
 * 获取figma文件
 * @param fileId 
 * @param token 
 */
async function loadFigmaFile(fileId: string, token: string) {
    const url = `https://api.figma.com/v1/files/${fileId}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await util.request(url, option);
    return JSON.parse(data);
}

export {
    convert,
    util,
    loadFigmaFile
}

export default convert;