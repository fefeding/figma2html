import { type Node, type DomNode, type NodeToDomOption, type ConvertNodeOption } from './common/types';
export declare function convert(node: Node, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode): Promise<DomNode>;
export declare function nodeToDom(node: DomNode, option?: NodeToDomOption): Promise<HTMLElement | SVGElement>;
