import type { Node } from './types';
export declare function convert(node: Node): {
    id: string;
    name: string;
    visible: boolean;
    type: keyof import("./types").NodeTypes;
    children: any[];
};
