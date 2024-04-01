export type * from './figmaTypes/types';
import { util } from 'j-design-util';
import { convert } from './figmaTypes/node';
/**
 * 获取figma文件
 * @param fileId
 * @param token
 */
declare function loadFigmaFile(fileId: string, token: string): Promise<any>;
export { convert, util, loadFigmaFile };
export default convert;
