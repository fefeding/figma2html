import { ItemType, ChangeData, Point, ControllerCursorData } from './types';
import util from './util';

export const fullCircleRadius = Math.PI * 2;

/**
 * 操作杠指针配置
 */
export const Cursors = {
    data: {
        'l': '',
        'lt': '',
        't': '',
        'tr': '',
        'r': '',
        'rb': '',
        'b': '',
        'lb': '',
        'rotate': '',
        'skew': 'pointer'
    } as ControllerCursorData,
    // 根据角度旋转指针
    async get(dir: ItemType|'rotate'|'skew', rotation: number=0, data: ControllerCursorData = this.data): Promise<string> {
        if(dir === 'rotate' || dir === 'skew') return data[dir] || 'pointer';
        if(Math.abs(rotation) > fullCircleRadius) rotation = rotation % fullCircleRadius;
        // 2PI 为一个圆，把角度转为一个圆内的值，以免重复生成图片
        const rotationKey = Number(rotation.toFixed(2));// 精度只取小数2位
        const key = rotationKey===0 ? dir: `${dir}_${rotationKey}`;
        let cursor = data[key];
        if(!cursor) {
            if(dir === 'l' || dir === 'r' || dir === 't' || dir === 'b') {
                // 如果没有旋转角度，则把ns转90度即可
                if(rotation === 0) {
                    if(!data['t']) return 'pointer';
                    // b t 同指针
                    if(dir === 'b') {
                        cursor = data[dir] = data['t'];
                    }
                    else {
                        cursor = await util.rotateImage(data['t'], Math.PI/2);
                        if(!data['l']) data['l'] = cursor;
                        if(!data['r']) data['r'] = cursor;
                    }
                }
                // 如果有旋转角度，则获取标准的再转对应的角度
                else {
                    const normal = await this.get(dir, 0, data);
                    if(!normal || normal === 'pointer') return 'pointer';
                    cursor = await util.rotateImage(normal, rotation);
                    data[key] = cursor;
                }
            }
            else if(dir === 'tr' || dir === 'lb' || dir === 'lt' || dir === 'rb') {
                // 如果没有旋转角度，则把nwse转90度即可
                if(rotation === 0) {
                    if(!data['lt']) return 'pointer';
                    // rb lt同一个指针
                    if(dir === 'rb') {
                        cursor = data[dir] = data['lt'];
                    }
                    else {
                        cursor = await util.rotateImage(data['lt'], Math.PI/2);
                        if(!data['tr']) data['tr'] = cursor;
                        if(!data['lb']) data['lb'] = cursor;
                    }
                }
                // 如果有旋转角度，则获取标准的再转对应的角度
                else {
                    const normal = await this.get(dir, 0, data);
                    if(!normal || normal === 'pointer') return 'pointer';
                    cursor = await util.rotateImage(normal, rotation);
                    data[key] = cursor;
                }
            }
        }
        return cursor;
    }
}; 

/**
 * 因为旋转后坐标要回原才好计算操作，
 * @param offset 
 * @param oldPosition 
 * @param newPosition 
 * @param rotation 
 * @param center 
 * @returns 
 */
export const getRotateEventPosition = (offset: Point, oldPosition: Point, newPosition: Point, rotation: number, center: Point) => {

    // 先回原坐标，再主算偏移量，这样保证操作更容易理解
    if(rotation) {
        const [pos1, pos2] = util.rotatePoints([oldPosition, newPosition], center, -rotation);
        offset.x = pos2.x - pos1.x;
        offset.y = pos2.y - pos1.y;
    }
    return offset;
}

/**
 *  发生旋转, 计算得到的旋转角度
 */
export const rotateChange = (oldPosition: Point, newPosition: Point, center: Point) => {
    
    // 因为center是相对于编辑器的，所以事件坐标也需要转到编辑器
    const cx1 = oldPosition.x - center.x;
    const cy1 = oldPosition.y - center.y;
    let angle1 = Math.atan(cy1 / cx1);
    const cx2 = newPosition.x - center.x;
    const cy2 = newPosition.y - center.y;
    let angle2 = Math.atan(cy2 / cx2);


    if(angle1 >= 0 && angle2 < 0) {
        if(cx1 >= 0 && cy1 >= 0 && cx2 <= 0 && cy2 >= 0) angle2 = Math.PI + angle2;
        else if(cx1 <= 0 && cy1 <=0 && cx2 >= 0 && cy2 <= 0) angle2 = Math.PI + angle2;
        //else if(cx1 <= 0 && cy1 <=0 && cx2 >= 0 && cy2 >= 0) angle2 = Math.PI + angle2;
    }
    else if(angle1 <= 0 && angle2 >= 0) {
        if(cx1 >= 0 && cy1 <= 0 && cx2 < 0) angle2 = angle2 - Math.PI;
        else angle2 = -angle2;
    }
    else if(angle1 >= 0 && angle2 > 0) {
        //if(cy2 === 0) angle2 = 0;
    }
    return angle2 - angle1;
}

/**
 *  根据操作参数，计算位移，大小和旋转角度等
 */
export const getChangeData = (dir: ItemType, offset: Point, oldPosition: Point, newPosition: Point, center: Point, rotation: number=0) => {
    // 当前移动对原对象的改变
    const args: ChangeData = {
        x: 0, 
        y: 0, 
        width: 0, 
        height: 0,
        rotation: 0,
        skew: {
            x: 0,
            y: 0
        }
    };
    // 先回原坐标，再主算偏移量，这样保证操作更容易理解
    if(rotation) {
        offset = getRotateEventPosition(offset, oldPosition, newPosition, rotation, center);
    }
    
    switch(dir) {                
        case 'l': {
            args.x = offset.x;
            args.width = -offset.x;
            break;
        }
        case 't': {
            args.y = offset.y;
            args.height = -offset.y;
            break;
        }
        case 'r': {
            args.width = offset.x;
            break;
        }
        case 'b': {
            args.height = offset.y;
            break;
        }
        case 'lt':{   
            args.x = offset.x;
            args.width = -offset.x; 
            args.y = offset.y;
            args.height = -offset.y;
            break;
        }
        case 'tr':{   
            args.width = offset.x; 
            args.y = offset.y;
            args.height = -offset.y;
            break;
        }
        case 'rb':{   
            args.width = offset.x; 
            args.height = offset.y;
            break;
        }
        case 'lb':{   
            args.x = offset.x;
            args.width = -offset.x; 
            args.height = offset.y;
            break;
        }   
    }

    // 如果中心发生了偏移，则新中心点要移到绕原中心点旋转当前旋转角度的点，才举使图形移动不正常
    if(rotation && (args.x || args.y || args.width || args.height)) {
        const newCenter = {
            x: center.x + args.x + args.width/2,
            y: center.y + args.y + args.height/2
        };
        const targetCenter = util.rotatePoints({...newCenter}, center, rotation);
        args.x += targetCenter.x - newCenter.x;
        args.y += targetCenter.y - newCenter.y;
    }
    return args;
}
