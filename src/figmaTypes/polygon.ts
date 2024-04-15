
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, NodeType, ColorStop, DomNodeType, } from '../common/types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';

export class PolygonConverter<NType extends NodeType = 'REGULAR_POLYGON'> extends BaseConverter<NType> {
    // 多边形标签名
    polygonName: DomNodeType = 'polygon';

    async convert(node:  Node<NType>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption) {
        dom.type = 'svg';
        let polygon = this.createDomNode(this.polygonName);

        const defs = this.createDomNode('defs');

        dom.children.push(defs);
        dom.children.push(polygon);

        // svg外转用定位和大小，其它样式都给子元素
        dom =  await super.convert(node, dom, parentNode, page, option);
        polygon.bounds = dom.bounds;

        // 生成路径
        this.createPolygonPath(polygon, node);
        
        return dom;
    }

    // 生成多边形路径
    createPolygonPath(dom: DomNode, node:  Node<NType>) {
        const points = [
            [0,0].join(','),
            [dom.bounds.width,0].join(','),
            [dom.bounds.width,dom.bounds.height].join(','),
            [0,dom.bounds.height].join(','),
        ];
        dom.attributes['points'] = points.join(' ');
    }

    // 处理填充
    async convertFills(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption) {
        if(node.fills) {
            const ellipse = dom.children[1];
            for(const fill of node.fills) {
                if(fill.visible === false) continue;

                switch(fill.type) {
                    case PaintType.SOLID: {
                        ellipse.fill = util.colorToString(fill.color, 255);
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        ellipse.fill = this.convertLinearGradient(fill, dom);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_RADIAL: {
                        ellipse.fill = this.convertRadialGradient(fill, dom);
                        break;
                    }
                    // 图片
                    case PaintType.IMAGE: {
                        await super.convertFills(node, ellipse, option);
                        break;
                    }
                }
            }
        }
        return dom;
    }

    // 处理边框
    async convertStrokes(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption) {
        if(node.strokes && node.strokes.length) {
            const ellipse = dom.children[1];
            await super.convertStrokes(node, ellipse, option);
        }
        return dom;
    }

    // 转换线性渐变
    convertLinearGradient(gradient: Paint, dom?: DomNode) {
        if(dom.type !== 'svg') return super.convertLinearGradient(gradient, dom);

        const defs = dom.children[0];
        const gradientDom = this.createDomNode('linearGradient');
        gradientDom.id = 'gradient_' + util.uuid();

        const handlePositions = gradient.gradientHandlePositions;
        if(handlePositions && handlePositions.length > 1) {
            gradientDom.x1 = (handlePositions[0].x) * 100 + '%';
            gradientDom.y1 = (handlePositions[0].y) * 100 + '%';
            gradientDom.x2 = (handlePositions[1].x) * 100 + '%';
            gradientDom.y2 = (handlePositions[1].y) * 100 + '%';
        }
        const gradientStops = gradient.gradientStops;
        const stops = this.getGradientStopDoms(gradientStops);
        gradientDom.children.push(...stops);

        defs.children.push(gradientDom);
        return `url(#${gradientDom.id})`;
    }

    // 转换径向性渐变
    convertRadialGradient(gradient: Paint, dom?: DomNode) {
        if(dom.type !== 'svg') return super.convertRadialGradient(gradient, dom);

        const defs = dom.children[0];
        const gradientDom = this.createDomNode('radialGradient');
        gradientDom.id = 'gradient_' + util.uuid();

        const handlePositions = gradient.gradientHandlePositions;

        // 该字段包含三个矢量，每个矢量都是归一化对象空间中的一个位置（归一化对象空间是如果对象的边界框的左上角是（0，0），右下角是（1,1））。第一个位置对应于渐变的开始（为了计算渐变停止，值为0），第二个位置是渐变的结束（值为1），第三个手柄位置决定渐变的宽度。
        if(handlePositions && handlePositions.length > 2) {
            gradientDom.fx = Math.round(handlePositions[0].x * 100) + '%';
            gradientDom.fy = Math.round(handlePositions[0].y * 100) + '%';
            gradientDom.cx = gradientDom.fx
            gradientDom.cy = gradientDom.fy
            // 大小位置跟起点的距离为渐变宽
            const dx = handlePositions[1].x - handlePositions[0].x;
            const dy = handlePositions[1].y - handlePositions[0].y;
            const r = Math.sqrt(dx * dx + dy * dy);
            gradientDom.r = Math.round(r * 100) + '%';
        }
        const gradientStops = gradient.gradientStops;
        const stops = this.getGradientStopDoms(gradientStops);
        gradientDom.children.push(...stops);
        
        defs.children.push(gradientDom);
        return `url(#${gradientDom.id})`;
    }
      
      // Helper function to get the gradient stops
      getGradientStopDoms(gradientStops: ColorStop[]) {
        const stops = [] as Array<DomNode>;
        for(const s of gradientStops) {
            const stop = this.createDomNode('stop');
            stop.offset = `${Math.round(s.position * 100)}%`;
            stop.style.stopColor = util.colorToString(s.color, 255);
            stops.push(stop);
        }
        return stops;
      }
}

export default PolygonConverter;