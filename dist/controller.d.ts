import { ItemType, ChangeData, Point, ControllerCursorData } from './types';
export declare const fullCircleRadius: number;
/**
 * 操作杠指针配置
 */
export declare const Cursors: {
    data: ControllerCursorData;
    get(dir: ItemType | 'rotate' | 'skew', rotation?: number, data?: ControllerCursorData): Promise<string>;
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
export declare const getRotateEventPosition: (offset: Point, oldPosition: Point, newPosition: Point, rotation: number, center: Point) => Point;
/**
 *  发生旋转, 计算得到的旋转角度
 */
export declare const rotateChange: (oldPosition: Point, newPosition: Point, center: Point) => number;
/**
 *  根据操作参数，计算位移，大小和旋转角度等
 */
export declare const getChangeData: (dir: ItemType, offset: Point, oldPosition: Point, newPosition: Point, center: Point, rotation?: number) => ChangeData;
