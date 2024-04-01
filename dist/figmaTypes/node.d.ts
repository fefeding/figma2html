import type { Node, DomNode } from './types';
export declare function convert(node: Node, parentNode?: Node): Promise<DomNode>;
export declare function nodeToDom(node: any): any;
