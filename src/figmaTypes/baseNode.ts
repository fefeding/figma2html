
import { Node, DomNode, DomNodeType, NodeType, NodeConverter, PaintType, PaintSolidScaleMode, IJElementData, Vector, ColorStop, EffectType, ConvertNodeOption, Paint, TypeStyle } from './types';
import { util, type Point } from 'j-design-util';

export class BaseConverter<NType extends NodeType = NodeType> implements NodeConverter<NType> {
    async convert(node:  Node<NType>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.style = dom.style || {} as CSSStyleDeclaration;

        // 位置
        dom.bounds = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        if(node.absoluteBoundingBox) {
            dom.bounds.width = node.absoluteBoundingBox.width;
            dom.bounds.height = node.absoluteBoundingBox.height;

            // 相对于父位置
            if(parentNode && parentNode.absoluteBoundingBox) {
                dom.data.left = dom.bounds.x = node.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x; 
                dom.data.top = dom.bounds.y = node.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y; 
            }
            // 没有父元素，就认为约对定位为0
            else {
                dom.data.left = dom.bounds.x = 0;
                dom.data.top = dom.bounds.y = 0;
            }
            dom.style.left = util.toPX(dom.bounds.x).toString();
            dom.style.top = util.toPX(dom.bounds.y).toString();

            dom.absoluteBoundingBox = node.absoluteBoundingBox;
        }
        // 背景色
        if(node.backgroundColor) dom.style.backgroundColor = util.colorToString(node.backgroundColor, 255);

        if(node.cornerRadius) {
            dom.style.borderRadius = util.toPX(node.cornerRadius);
        }

        if(node.opacity) dom.style.opacity = node.opacity.toString();

        // 旋转
        if(node.rotation) {
            dom.data.rotation = node.rotation;
            dom.style.transform = `rotate(${util.toRad(node.rotation)})`;
        }
        if(node.clipsContent === true) dom.style.overflow = 'hidden';

        // padding
        for(const padding of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) {
            const v = node[padding];
            if(v) {
                dom.style[padding] = util.toPX(v);
                if(['paddingLeft', 'paddingRight'].includes(padding)) dom.bounds.width -= v;
                else dom.bounds.height -= v;
            }
        }
        
        await this.convertStyle(node, dom, option);
        await this.convertFills(node, dom, option);// 解析fills
        await this.convertStrokes(node, dom, option);// 边框
        await this.convertEffects(node, dom, option);// 滤镜
        

        dom.data.width = dom.bounds.width;
        dom.data.height = dom.bounds.height;

        dom.style.width = util.toPX(dom.bounds.width).toString();
        dom.style.height = util.toPX(dom.bounds.height).toString();

        return dom;
    }

    // 生成节点对象
    createDomNode(type: DomNodeType, option?: DomNode) {
        const dom = {
            data: {} as IJElementData,
            style: {} as CSSStyleDeclaration,
            children: [] as Array<DomNode>,
            ...option,
            type: type,
        } as DomNode; 
        return dom;
    }

    // 转换style
    async convertStyle(node:  Node<NType>|TypeStyle, dom: DomNode, option?: ConvertNodeOption) {
        // @ts-ignore
        const style: TypeStyle = node.style || node;
        if(!style) return dom;

        if (style.fontFamily) dom.style.fontFamily = style.fontFamily;
        if (style.fontSize) dom.style.fontSize = util.toPX(style.fontSize);
        if (style.fontWeight) dom.style.fontWeight = style.fontWeight.toString();
        if(style.italic) dom.style.fontStyle = 'italic';
        if (style.letterSpacing) {
            dom.style.letterSpacing = util.toPX(style.letterSpacing);
        }
        if (style.lineHeightPx)
            dom.style.lineHeight = util.toPX(style.lineHeightPx);
        if (style.textAlignHorizontal)
            dom.style.textAlign = style.textAlignHorizontal;
        if (style.textAlignVertical)
            dom.style.verticalAlign = style.textAlignVertical;
        

        return dom;
    }

    // 转换滤镜
    async convertEffects(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption) {
        if(!node.isMaskOutline && node.effects) {
            dom.style.filter = dom.style.filter || '';
            for(const effect of node.effects) {
                if(effect.visible === false) continue;
                switch(effect.type) {
                    case EffectType.DROP_SHADOW: 
                    case EffectType.INNER_SHADOW: {
                        dom.style.filter += ` drop-shadow(${util.toPX(effect.offset.x)} ${util.toPX(effect.offset.y)} ${util.toPX(effect.radius)} ${util.colorToString(effect.color, 255)})`;
                        break;
                    }
                    case EffectType.LAYER_BLUR:
                    case EffectType.BACKGROUND_BLUR: {
                        dom.style.filter += ` blur(${util.toPX(effect.radius)})`;
                        break;
                    }
                }
            }
        }
        return dom;
    }

    // 处理填充
    async convertFills(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption) {
        // isMaskOutline 如果为true则忽略填充样式
        if(!node.isMaskOutline && node.fills) {
            for(const fill of node.fills) {
                if(fill.visible === false) continue;

                switch(fill.type) {
                    case PaintType.SOLID: {
                        dom.style.backgroundColor = util.colorToString(fill.color, 255);
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        dom.style.background = this.convertLinearGradient(fill, dom);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_RADIAL: {
                        dom.style.background = this.convertRadialGradient(fill, dom);
                        break;
                    }
                    // 图片
                    case PaintType.IMAGE: {
                        if(option && option.getImage) {
                            const img = await option.getImage(fill.imageRef);
                            if(img) {
                                if(dom.type === 'img') {
                                    dom.url = img;
                                }
                                else {
                                    dom.style.backgroundImage = `url(${img})`;
                                }
                            }
                            dom.backgroundImageUrl = img || fill.imageRef;
                        }
                        break;
                    }
                }
                        
                switch(fill.scaleMode) {
                    case PaintSolidScaleMode.FILL: {
                        dom.style.backgroundSize = 'cover';
                        break;
                    }
                    case PaintSolidScaleMode.FIT: {
                        dom.style.backgroundSize = 'contain';
                        break;
                    }
                    case PaintSolidScaleMode.STRETCH: {
                        dom.style.backgroundSize = '100% 100%';
                        break;
                    }
                    // 平铺
                    case PaintSolidScaleMode.TILE: {
                        dom.style.backgroundRepeat = 'repeat';
                        break;
                    }
                }

                if(dom && fill.imageTransform) {
                    if(!dom.transform) dom.transform = {};
                    const [[a, c, e], [b, d, f]] = fill.imageTransform;
                    // 计算旋转角度和正弦值
                    const rotation = Math.atan2(b, a);
                    const scaleX = Math.sqrt(a * a + b * b);
                    const scaleY = Math.sqrt(c * c + d * d);
                    dom.transform.translateX = e*100 + '%';                    
                    dom.transform.translateY = f*100 + '%';
                    dom.transform.rotateZ = rotation;
                    dom.transform.scaleX = scaleX;
                    dom.transform.scaleY = scaleY;
                }
            }
        }
        return dom;
    }

    // 处理边框
    async convertStrokes(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption) {
        if(node.strokes && node.strokes.length) {
            
            for(const stroke of node.strokes) {
                if(stroke.visible === false) continue;
                if(stroke.color) {
                    dom.style.outlineColor = util.colorToString(stroke.color, 255);
                }
                switch(stroke.type) {
                    case PaintType.SOLID: {
                        dom.style.outlineStyle = 'solid';
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        dom.style.borderImageSource = this.convertLinearGradient(stroke, dom);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_RADIAL: {
                        dom.style.borderImageSource = this.convertRadialGradient(stroke, dom);
                        break;
                    }
                    // 图片
                    case PaintType.IMAGE: {
                        if(option && option.getImage) {
                            const img = await option.getImage(stroke.imageRef);
                            if(img) dom.style.borderImageSource = `url(${img})`;
                        }
                        
                        switch(stroke.scaleMode) {
                            case PaintSolidScaleMode.FILL: {
                                dom.style.borderImageSlice = 'fill';
                                break;
                            }
                            case PaintSolidScaleMode.FIT: {
                                dom.style.borderImageRepeat = 'space';
                                break;
                            }
                            case PaintSolidScaleMode.STRETCH: {
                                dom.style.borderImageRepeat = 'stretch';
                                break;
                            }
                            // 平铺
                            case PaintSolidScaleMode.TILE: {
                                dom.style.borderImageRepeat = 'repeat';
                                break;
                            }
                        }
                        break;
                    }
                }                
            }
            if(node.strokeWeight) {
                if(dom.style.outlineColor) dom.style.outlineWidth = util.toPX(node.strokeWeight);
                if(dom.style.borderImageSource) dom.style.borderImageWidth = util.toPX(node.strokeWeight);
            }
            if(node.strokeDashes && node.strokeDashes.length) {
                dom.style.outlineStyle = 'dashed';
            }
        }
        return dom;
    }

    // 转换线性渐变
    convertLinearGradient(gradient: Paint, dom?: DomNode) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        
        /**
         * 需要计算figma线性渐变位置百分比，因为把图形X和Y都标准化成0-1.所以我们可以认为它就是一个正方形，在figma上编缉的渐变2个点表示stops变化区域，需要计算这2点区域映射到图形的stop比
         */
        const size = this.getGradientSize(handlePositions);
        if(size) {
            /*console.log(size);
            const startProjection = size.getProjectionOnLine(size.start);
            const startDom = this.createDomNode('div');
            startDom.style.top = startProjection.y*100 + '%';
            startDom.style.left = startProjection.x*100 + '%';
            startDom.style.position = 'absolute';
            startDom.style.backgroundColor = 'red';
            startDom.style.width = startDom.style.height = '3px';

            const startDom2 = this.createDomNode('div');
            startDom2.style.top = size.start.y*100 + '%';
            startDom2.style.left = size.start.x*100 + '%';
            startDom2.style.position = 'absolute';
            startDom2.style.backgroundColor = 'red';
            startDom2.style.width = startDom2.style.height = '3px';

            const endProjection = size.getProjectionOnLine(size.end);
            const endDom = this.createDomNode('div');
            endDom.style.top = endProjection.y*100 + '%';
            endDom.style.left = endProjection.x*100 + '%';
            endDom.style.backgroundColor = 'blue';
            endDom.style.position = 'absolute';
            endDom.style.width = endDom.style.height = '3px';
            const endDom2 = this.createDomNode('div');
            endDom2.style.top = size.end.y*100 + '%';
            endDom2.style.left = size.end.x*100 + '%';
            endDom2.style.backgroundColor = 'blue';
            endDom2.style.position = 'absolute';
            endDom2.style.width = endDom2.style.height = '3px';
            dom.children.push(startDom,startDom2, endDom,endDom2);*/

            // 线性渐变，需要把颜色偏移量对应到figma线段比例中，并且需要位移到顶点再计算颜色偏移比例
            for(const stop of gradientStops) {
                const r = size.r * stop.position;
                const p = {
                    x: r * size.cos + size.start.x,
                    y: r * size.sin + size.start.y,
                };
                const projection = size.getProjectionOnLine(p); // 得到平移后线上的投影点
                /*const stopDom = this.createDomNode('div');
                stopDom.style.top = projection.y*100 + '%';
                stopDom.style.left = projection.x*100 + '%';
                stopDom.style.backgroundColor = 'yellow';
                stopDom.style.position = 'absolute';
                stopDom.style.width = stopDom.style.height = '3px';
                dom.children.push(stopDom);*/

                const dx = projection.x - size.startInShape.x;
                const dy = projection.y - size.startInShape.y;

                stop.position = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                // 如果交点在当前右边，则偏移量为负数
                if(size.startInShape.x === 0 && size.startInShape.y === 0) {
                    if(p.x < 0 || p.y < 0) stop.position = -stop.position;
                }
                else if(size.startInShape.x === 1 && size.startInShape.y === 0) {
                    if(p.x > 1 || p.y < 0)  stop.position = -stop.position;
                }
                else if(size.startInShape.x === 1 && size.startInShape.y === 1) {
                    if(p.y > 1 || p.x > 1) stop.position = -stop.position;
                }
                else if(size.startInShape.x === 0 && size.startInShape.y === 1) {
                    if(p.x < 0 || p.y > 1) stop.position = -stop.position;
                }
            }
        }

        const linearGradient = `linear-gradient(${this.getGradientDirection(
          handlePositions
        )}, ${this.getGradientStops(gradientStops)})`;
        return linearGradient;
    }

    // 转换径向性渐变
    convertRadialGradient(gradient: Paint, dom?: DomNode) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        
        const radialGradient = `radial-gradient(${this.getRadialGradientPosition(
          handlePositions
        )}, ${this.getGradientStops(gradientStops)})`;
        return radialGradient;
    }

    // 生成渐变尺寸
    getGradientSize(gradientHandlePositions: Vector[]) {
        if(!gradientHandlePositions || gradientHandlePositions.length < 2) return null;
        // 由于figma的渐变起始和终点是第一个和第二个坐标，但css是用的角度，这里要计算起始偏移和终点偏移，再计算stop的偏移比例，才是真实的css渐变比例
        const start = {...gradientHandlePositions[0]};
        const end = {...gradientHandlePositions[1]};
        const dx = end.x - start.x;
        const dy = end.y - start.y;

        const r = Math.sqrt(dx*dx + dy*dy);
        const cos = dx / r;
        const sin = dy / r;
        const m = dy / dx;

        // 计算渐变二点延长级起始点边与图形边的交点
        const startInShape = {
            x: 0,
            y: 0
        };

        // X轴方向是向右的
        if(dx > 0) {
            // 如果二个点的X轴距离大于Y轴距离，则表示连线或延长级与左边线相交
            if(dx > Math.abs(dy)) {
                // 向右上角，则起点为左下角
                if(dy < 0) {
                    startInShape.y = 1;
                }
            }
            // 向右上角，且与底边相交
            else if(dy < 0) {
                startInShape.y = 1;
            }
            // 向右下角，跟顶边相交
            else {
                
            }
        }
        // X轴向左方向
        else if(dx < 0) {
            // 如果二个点的X轴距离大于Y轴距离，则表示连线或延长级与右边线相交
            if(dx > Math.abs(dy)) {
                startInShape.x = 1;
                if(dy <= 0) {
                    startInShape.y = 1;
                }
            }
            // 向左上角，且与底边相交
            else if(dy < 0) {
                startInShape.x = 1;
                startInShape.y = 1;
            }
            // 向左下角，跟顶边相交
            else {
                startInShape.x = 1;
            }
        }
        else {
            if(dy <= 0) {
                startInShape.y = 1;
            }
        }

        return {
            start,
            end,
            r,
            m,
            startInShape,
            cos,
            sin,
            getProjectionOnLine(point: Point): Point {
                if(this.start.x === this.end.x) return {x: this.start.x, y: point.y};
                if(this.start.y === this.end.y) return {x: point.x, y: this.start.y};
                // 新直线b，斜率不变m
                const b = this.startInShape.y - this.m * this.startInShape.x;
                
                const xPrime = (point.y - b + (point.x/this.m)) / (this.m + (1/this.m));
                const yPrime = m * xPrime + b;
                
                return { x: xPrime, y: yPrime };
            }
        };
    }

    // 径向性位置
    getRadialGradientPosition(gradientHandlePositions: Vector[]) {
        if(!gradientHandlePositions || !gradientHandlePositions.length) return 'center';
        // 大小位置跟起点的距离为渐变宽
        let dx = gradientHandlePositions[1].x - gradientHandlePositions[0].x;
        let dy = gradientHandlePositions[1].y - gradientHandlePositions[0].y;
        const rx = Math.sqrt(dx * dx + dy * dy) * 100;


        dx = gradientHandlePositions[2].x - gradientHandlePositions[0].x;
        dy = gradientHandlePositions[2].y - gradientHandlePositions[0].y;
        const ry = Math.sqrt(dx * dx + dy * dy) * 100;
        
        return `ellipse ${rx}% ${ry}% at ${gradientHandlePositions[0].x*100}% ${gradientHandlePositions[0].y*100}%`;
    }

    // Helper function to get the gradient direction
    getGradientDirection(gradientHandlePositions: Vector[]) {
        if (gradientHandlePositions.length >= 2) {
          const start = gradientHandlePositions[0];
          const end = gradientHandlePositions[1]; // Use the second handle, ignoring the last one
      
          // Calculate the angle in radians
          const angleRadians = Math.PI/2 - util.getPointCoordRotation(start, end);
          //const angleRadians = Math.PI/2 - Math.atan2(end.y - start.y, end.x - start.x);

          return util.toDeg(util.radToDeg(angleRadians));
        } else {
          console.error("Insufficient handle positions for gradient calculation.");
          return ""; // or any default value
        }
      }
      
      // Helper function to get the gradient stops
      getGradientStops(gradientStops: ColorStop[]): string|Array<DomNode> {
        // Constructing the gradient stops string based on received data
        const stopsString = gradientStops
          .map((stop) => util.colorToString(stop.color, 255) + ` ${stop.position * 100}%`)
          .join(", ");
        return stopsString;
      }
}

export default BaseConverter;