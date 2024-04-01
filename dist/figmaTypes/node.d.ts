import type { Node, DomNode, NodeToDomOption, ConvertNodeOption } from './types';
export declare function convert(node: Node, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
export declare function nodeToDom(node: DomNode, option?: NodeToDomOption): Promise<HTMLElement>;