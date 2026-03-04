export type * from './common/types';
import { util } from '@fefeding/utils';
import { convert, nodeToDom } from './node';

/**
 * 获取figma文件
 * @param fileId 
 * @param token 
 */
async function loadFigmaFile(fileId: string, token: string) {
    if (!fileId) {
        throw new Error('[figma2html] fileId is required');
    }
    if (!token) {
        throw new Error('[figma2html] token is required');
    }

    // 添加 geometry=paths 参数以获取矢量路径数据
    const url = `https://api.figma.com/v1/files/${fileId}?geometry=paths`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    
    try {
        const data = await util.request(url, option);
        const parsed = JSON.parse(data);
        
        // 检查 API 错误
        if (parsed.err) {
            throw new Error(`[figma2html] Figma API error: ${parsed.err}`);
        }
        
        return parsed;
    } catch (error) {
        console.error('[figma2html] Failed to load Figma file:', error);
        throw error;
    }
}

// 获取文件所有图片
async function getFigmaFileImages(fileId: string, token: string) {
    if (!fileId) {
        console.warn('[figma2html] fileId is required for getFigmaFileImages');
        return {};
    }
    if (!token) {
        console.warn('[figma2html] token is required for getFigmaFileImages');
        return {};
    }

    const url = `https://api.figma.com/v1/files/${fileId}/images`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    
    try {
        const data = await util.request(url, option);
        const images = JSON.parse(data);
        if (images.err) {
            console.error('[figma2html] Figma API error:', images.err);
            return {};
        }
        if (images.meta && images.meta.images) return images.meta.images;
        return {};
    } catch (error) {
        console.error('[figma2html] Failed to get Figma file images:', error);
        return {};
    }
}

// 获取图片
async function getFigmaImage(key: string, token: string, ids: string): Promise<{
    [key: string]: string
}> {
    if (!key || !token || !ids) {
        console.warn('[figma2html] key, token and ids are required for getFigmaImage');
        return {};
    }

    const url = `https://api.figma.com/v1/images/${key}?ids=${encodeURIComponent(ids)}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    
    try {
        const data = await util.request(url, option);
        const images = JSON.parse(data);
        if (images.err) {
            console.error('[figma2html] Figma API error:', images.err);
            return {};
        }
        if (images.meta && images.meta.images) return images.meta.images;
        return images;
    } catch (error) {
        console.error('[figma2html] Failed to get Figma image:', error);
        return {};
    }
}

export {
    convert,
    nodeToDom,
    util,
    loadFigmaFile,
    getFigmaImage,
    getFigmaFileImages
}

export default convert;