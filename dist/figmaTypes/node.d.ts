import type { Node, DomNode, NodeToDomOption, ConvertNodeOption } from '../common/types';
export declare function convert(node: Node, parentNode?: Node, option?: ConvertNodeOption): Promise<DomNode>;
export declare function nodeToDom(node: DomNode, option?: NodeToDomOption): Promise<HTMLElement | SVGElement>;
