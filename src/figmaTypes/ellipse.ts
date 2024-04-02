
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, Vector, ColorStop, } from './types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';

export class ELLIPSEConverter extends BaseConverter<'ELLIPSE'> {
    async convert(node:  Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'svg';
        let ellipse = this.createDomNode('ellipse');

        const defs = this.createDomNode('defs');

        dom.children.push(defs);
        dom.children.push(ellipse);

        // svg外转用定位和大小，其它样式都给子元素
        dom =  await super.convert(node, dom, parentNode, option);
        ellipse.bounds = dom.bounds;
        return dom;
    }

    // 处理填充
    convertFills(node:  Node<'ELLIPSE'>, dom: DomNode, option?: ConvertNodeOption) {
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
                        super.convertFills(node, ellipse, option);
                        break;
                    }
                }
            }
        }
        return dom;
    }

    // 处理边框
    convertStrokes(node:  Node<'ELLIPSE'>, dom: DomNode, option?: ConvertNodeOption) {
        if(node.strokes && node.strokes.length) {
            const ellipse = dom.children[1];
            super.convertStrokes(node, ellipse, option);
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
        if(handlePositions && handlePositions.length > 2) {
            gradientDom.fx = (handlePositions[0].x) * 100 + '%';
            gradientDom.fy = (handlePositions[0].y) * 100 + '%';
            gradientDom.cx = (handlePositions[1].x) * 100 + '%';
            gradientDom.cy = (handlePositions[1].y) * 100 + '%';
            gradientDom.r = (handlePositions[2].x) * 100 + '%';
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
            stop.offset = `${s.position * 100}%`;
            stop.style.stopColor = util.colorToString(s.color, 255);
            stops.push(stop);
        }
        return stops;
      }
}

export default ELLIPSEConverter;