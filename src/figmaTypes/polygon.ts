
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, NodeType, ColorStop, DomNodeType, BlendMode, } from '../common/types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';

export class PolygonConverter<NType extends NodeType = 'REGULAR_POLYGON'> extends BaseConverter<NType> {
    // 多边形标签名
    polygonName: DomNodeType = 'polygon';

    async convert(node:  Node<NType>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        let polygon = dom;
        let defs;
        // 如果 没有生成父的svg标签，则当前dom就是，然后再生成子元素
        if(!container) {
            container = dom;
            dom.type = 'svg';
            
            polygon = this.createDomNode(this.polygonName, {
                // @ts-ignore
                figmaData: node
            });
            polygon.id = node.id || '';

            defs = this.createDomNode('defs');
            dom.children.push(defs);
        }
        else {
            defs = container.children[0];
            if(!defs) {
                defs = this.createDomNode('defs');
                container.children.push(defs);
            }
            polygon.type = this.polygonName;
        }

        // 如果是蒙板
        if(node.isMask) {
            const mask = this.createDomNode('mask');
            mask.id = 'mask_' + util.uuid();
            defs.children.push(mask);
            mask.children.push(polygon);
            polygon.isMask = true;
        }
        else {
            if(container && !container.children.includes(polygon)) container.children.push(polygon);
            else if(!container) {
                dom.children.push(polygon);
            }
        }

        polygon.style.fillRule = 'nonzero';

        // svg外转用定位和大小，其它样式都给子元素
        dom =  await super.convert(node, dom, parentNode, page, option, container);
        polygon.bounds = dom.bounds;
        
        const mask = this.getMask(container);
        if(node.isMask) {            
            if(mask) {
                mask.attributes['x'] = polygon.bounds.x + '';
                mask.attributes['y'] = polygon.bounds.y + '';
                mask.attributes['width'] = polygon.bounds.width + '';
                mask.attributes['height'] = polygon.bounds.height + '';
            }
        }
        else if(mask) {
            polygon.style.mask = `url(#${mask.id})`;
        }
        // 虚线
        /*if(node.strokeDashes) {
            polygon.attributes['stroke-dasharray'] = node.strokeDashes.join(',');
        }*/

        if(dom.type === 'svg') {
            delete dom.style.borderRadius;
            delete dom.style.border;
        }

        // 生成路径
        this.createPolygonPath(polygon, node, container);

        return dom;
    }

    // 获取定位
    getPosition(dom: DomNode, container?: DomNode) {
        const isAbsolute = !dom.isMask && container && container.id !== dom.id;
        const left = isAbsolute? dom.bounds.x: 0;
        const top = isAbsolute? dom.bounds.y: 0;
        return {
            x: left,
            y: top
        };
    }

    // 生成多边形路径
    createPolygonPath(dom: DomNode, node:  Node<NType>, container?: DomNode) {
        const pos = this.getPosition(dom, container);
        const points = [
            [pos.x, pos.y].join(','),
            [pos.x + dom.bounds.width, pos.y].join(','),
            [pos.x + dom.bounds.width, pos.y + dom.bounds.height].join(','),
            [pos.x, pos.y + dom.bounds.height].join(','),
        ];
        dom.attributes['points'] = points.join(' ');
    }

    // 获取蒙板
    getMask(container: DomNode) {
        const defs = container.children[0];
        if(defs.children?.length) {
            for(const child of defs.children) {
                if(child.type === 'mask') return child;
            }
        }
        return null;
    }

    // 用id获取当前图形
    getPolygon(node:  Node<NType>, dom: DomNode): DomNode {
        if(dom.children && dom.children.length) {
            for(const child of dom.children) {
                if(child.id === node.id || child.figmaData?.id === node.id) return child;
                if(child.children && child.children.length) {
                    const d = this.getPolygon(node, child);
                    if(d && d !== child) return d;
                }
            }
        }
        //if(dom.figmaData?.id === node.id) return dom;
        return dom;
    }

    // 处理填充
    async convertFills(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        if(node.fills) {
            const polygon = this.getPolygon(node, container || dom);
            for(const fill of node.fills) {
                if(fill.visible === false) continue;

                switch(fill.type) {
                    case PaintType.SOLID: {
                        if(typeof fill.opacity !== 'undefined') fill.color.a = fill.opacity;
                        polygon.style.fill = util.colorToString(fill.color, 255);
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        polygon.style.fill = this.convertLinearGradient(fill, dom, container);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_DIAMOND:
                    case PaintType.GRADIENT_ANGULAR:
                    case PaintType.GRADIENT_RADIAL: {
                        polygon.style.fill = this.convertRadialGradient(fill, dom, container);
                        break;
                    }
                    // 图片
                    case PaintType.IMAGE: {
                        await super.convertFills(node, polygon, option, container);
                        break;
                    }
                }

                // 不支持的模式，直接透明
                switch(fill.blendMode) {
                    case BlendMode.SCREEN: {
                        dom.style.opacity = '0';
                        break;
                    }
                }
            }
            // 默认透明
            if(!polygon.style.fill) polygon.style.fill = 'transparent';
        }
        return dom;
    }

    // 处理边框
    async convertStrokes(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        const polygon = this.getPolygon(node, container || dom);
        if(node.strokes && node.strokes.length) {
            
            for(const stroke of node.strokes) {
                if(stroke.visible === false) continue;
                if(stroke.color) {
                    if(typeof stroke.opacity !== 'undefined') stroke.color.a = stroke.opacity;
                    polygon.attributes['stroke'] = util.colorToString(stroke.color, 255);
                }           
            }
            if(node.strokeWeight) {
                if(dom.style.outlineColor) dom.style.outlineWidth = util.toPX(node.strokeWeight);
                if(dom.style.borderImageSource) dom.style.borderImageWidth = util.toPX(node.strokeWeight);
            }
            if(node.strokeDashes && node.strokeDashes.length) {
                polygon.attributes['stroke-dasharray'] = node.strokeDashes.join(',');
            }
        }
        if(node.strokeWeight) {
            polygon.attributes['stroke-width'] = node.strokeWeight.toString();
        }
        if(node.strokeAlign) {
            //polygon.attributes['stroke-align'] = node.strokeAlign;
        }
        if(node.strokeCap) {
            polygon.style.strokeLinecap = node.strokeCap;
        }
        if(node.strokeJoin) {
            polygon.style.strokeLinejoin = node.strokeJoin;
        }
        return dom;
    }

    // 转换线性渐变
    convertLinearGradient(gradient: Paint, dom?: DomNode, container?: DomNode) {
        container = container || dom;
        if(container.type !== 'svg') return super.convertLinearGradient(gradient, dom, container);

        const defs = container.children[0];
        const gradientDom = this.createDomNode('linearGradient');
        gradientDom.id = 'gradient_' + util.uuid();

        const handlePositions = gradient.gradientHandlePositions;
        if(handlePositions && handlePositions.length > 1) {
            gradientDom.attributes['x1'] = gradientDom.x1 = (handlePositions[0].x) * 100 + '%';
            gradientDom.attributes['y1'] = gradientDom.y1 = (handlePositions[0].y) * 100 + '%';
            gradientDom.attributes['x2'] = gradientDom.x2 = (handlePositions[1].x) * 100 + '%';
            gradientDom.attributes['y2'] = gradientDom.y2 = (handlePositions[1].y) * 100 + '%';
        }
        const gradientStops = gradient.gradientStops;
        const stops = this.getGradientStopDoms(gradientStops);
        gradientDom.children.push(...stops);

        defs.children.push(gradientDom);
        return `url(#${gradientDom.id})`;
    }

    // 转换径向性渐变
    convertRadialGradient(gradient: Paint, dom?: DomNode, container?: DomNode) {
        container = container || dom;
        if(container.type !== 'svg') return super.convertRadialGradient(gradient, dom, container);

        const defs = container.children[0];
        if(!defs) return '';

        const gradientDom = this.createDomNode('radialGradient');
        gradientDom.id = 'gradient_' + util.uuid();

        const handlePositions = gradient.gradientHandlePositions;

        // 该字段包含三个矢量，每个矢量都是归一化对象空间中的一个位置（归一化对象空间是如果对象的边界框的左上角是（0，0），右下角是（1,1））。第一个位置对应于渐变的开始（为了计算渐变停止，值为0），第二个位置是渐变的结束（值为1），第三个手柄位置决定渐变的宽度。
        if(handlePositions && handlePositions.length > 2) {
            gradientDom.attributes['fx'] = gradientDom.fx = Math.round(handlePositions[0].x * 100) + '%';
            gradientDom.attributes['fy'] = gradientDom.fy = Math.round(handlePositions[0].y * 100) + '%';
            gradientDom.attributes['cx'] = gradientDom.cx = gradientDom.fx
            gradientDom.attributes['cy'] = gradientDom.cy = gradientDom.fy
            // 大小位置跟起点的距离为渐变宽
            const dx = handlePositions[1].x - handlePositions[0].x;
            const dy = handlePositions[1].y - handlePositions[0].y;
            const r = Math.sqrt(dx * dx + dy * dy);
            gradientDom.attributes['r'] = gradientDom.r = Math.round(r * 100) + '%';
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
            stop.attributes['offset'] = stop.offset = `${Math.round(s.position * 100)}%`;
            stop.style.stopColor = util.colorToString(s.color, 255);
            stops.push(stop);
        }
        return stops;
      }
}

export default PolygonConverter;