
import { Node, DomNode, DomNodeType, NodeType, NodeConverter, PaintType, PaintSolidScaleMode, Paint, Vector, ColorStop, EffectType, ConvertNodeOption, StrokeAlign } from './types';
import { util } from 'j-design-util';

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

            dom.style.width = util.toPX(dom.bounds.width).toString();
            dom.style.height = util.toPX(dom.bounds.height).toString();
            // 相对于父位置
            if(parentNode && parentNode.absoluteBoundingBox) {
                dom.bounds.x = node.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x; 
                dom.bounds.y = node.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y; 
            }
            // 没有父元素，就认为约对定位为0
            else {
                dom.bounds.x = 0;
                dom.bounds.y = 0;
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

        // 旋转
        if(node.rotation) {
            dom.style.transform = `rotate(${util.toRad(node.rotation)})`;
        }
        if(node.clipsContent === true) dom.style.overflow = 'hidden';

        // padding
        for(const padding of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) {
            if(node[padding]) dom.style[padding] = util.toPX(node[padding]);
        }
        
        await this.convertStyle(node, dom, option);
        await this.convertFills(node, dom, option);// 解析fills
        await this.convertStrokes(node, dom, option);// 边框
        await this.convertEffects(node, dom, option);// 滤镜
        return dom;
    }

    // 生成节点对象
    createDomNode(type: DomNodeType) {
        const dom = {
            type: type,
            style: {} as CSSStyleDeclaration,
            children: [] as Array<DomNode>,
        } as DomNode; 
        return dom;
    }

    // 转换style
    async convertStyle(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption) {
        if(!node.style) return dom;

        if (node.style.fontFamily) dom.style.fontFamily = node.style.fontFamily;
        if (node.style.fontSize) dom.style.fontSize = util.toPX(node.style.fontSize);
        if (node.style.fontWeight) dom.style.fontWeight = node.style.fontWeight.toString();
        if(node.style.italic) dom.style.fontStyle = 'italic';
        if (node.style.letterSpacing)
            dom.style.letterSpacing = util.toPX(node.style.letterSpacing);
        if (node.style.lineHeightPx)
            dom.style.lineHeight = util.toPX(node.style.lineHeightPx);
        if (node.style.textAlignHorizontal)
            dom.style.textAlign = node.style.textAlignHorizontal;
        if (node.style.textAlignVertical)
            dom.style.verticalAlign = node.style.textAlignVertical;
        

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
            // 线性渐变，需要把颜色偏移量对应到figma线段比例中，并且需要位移到顶点再计算颜色偏移比例
            for(const stop of gradientStops) {
                const r = size.r * stop.position;
                const p = {
                    x: r * size.cos + size.start.x + size.offsetX,
                    y: r * size.sin + size.start.y + size.offsetY,
                };
                const dx = p.x - size.startInShape.x;
                const dy = p.y - size.startInShape.y;

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
        // 平移线到顶点方向的偏移量
        let offsetX = 0;
        let offsetY = 0;

        // X轴方向是向右的
        if(dx > 0) {
            // 如果二个点的X轴距离大于Y轴距离，则表示连线或延长级与左边线相交
            if(dx > Math.abs(dy)) {
                // 与Y轴的交点
                const dy2 = m * start.x;
                const y = start.y - dy2;
                // 向右上角，则起点为左下角
                if(dy < 0) {
                    startInShape.y = 1;
                    offsetX = offsetY = (1 - y)/2;// 向下移到左下角
                }
                else {
                    offsetX = y / 2;
                    offsetY = -offsetX;
                }
            }
            // 向右上角，且与底边相交
            else if(dy < 0) {
                startInShape.y = 1;
                const dx2 = (1 - start.y) / m;
                const x = start.x - dx2;
                offsetX = offsetY = -x / 2;                 
            }
            // 向右下角，跟顶边相交
            else {
                const dx2 = m === 0? start.x: start.y / m;
                const x = start.x - dx2;
                offsetX = -x/2;
                offsetY = -offsetX;
            }
        }
        // X轴向左方向
        else if(dx < 0) {
            // 如果二个点的X轴距离大于Y轴距离，则表示连线或延长级与右边线相交
            if(dx > Math.abs(dy)) {
                startInShape.x = 1;
                const dy2 = m * (1-start.x);
                const y = start.y - dy2;
                if(dy > 0) {
                    offsetX = offsetY = -y/2;
                }
                else {
                    startInShape.y = 1;
                    offsetY = (1-y)/2;
                    offsetX = -offsetY;
                }
            }
            // 向左上角，且与底边相交
            else if(dy < 0) {
                startInShape.x = 1;
                startInShape.y = 1;
                const dx2 = (1 - start.y) / m;
                const x = start.x + dx2;
                offsetX = (1-x)/2;
                offsetY = -offsetX;
            }
            // 向左下角，跟顶边相交
            else {
                startInShape.x = 1;
                const dx2 = m === 0? (start.x-1): start.y / m;
                const x = start.x - dx2;
                offsetX = offsetY = (1-x)/2;
            }
        }
        else {
            if(dy > 0) {
                offsetX = -start.x;
            }
            else {
                offsetX = -start.x;
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
            offsetX,
            offsetY
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