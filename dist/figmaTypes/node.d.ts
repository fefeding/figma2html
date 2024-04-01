import type { Node, DomNode, NodeToDomOption } from './types';
export declare function convert(node: Node, parentNode?: Node): Promise<DomNode>;
export declare function nodeToDom(node: DomNode, option?: NodeToDomOption): Promise<HTMLElement>;
