
import type { FRAME, Node, NodeConverter, NodeTypes } from './types';

export class FRAMEConverter implements NodeConverter<'FRAME'> {
    convert(node: FRAME) {
        const res = {};
        return res;
    }

}

export default FRAMEConverter;