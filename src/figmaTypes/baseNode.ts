
import { IFilter, DropShadowFilter, BlurFilter, ContrastFilter, BrightnessFilter, SaturateFilter, InvertFilter, SepiaFilter, HueRotateFilter } from '@fefeding/css-filters';
import { Node, DomNode, DomNodeType, NodeType, NodeConverter, PaintType, PaintSolidScaleMode, IJElementData, Vector, ColorStop, EffectType, ConvertNodeOption, Paint, TypeStyle, StringKeyValue, BlendMode, IStyleTransform } from '../common/types';
import { util, type Point } from '@fefeding/utils';

export class BaseConverter<NType extends NodeType = NodeType> implements NodeConverter<NType> {
    async convert(node:  Node<NType>, dom: DomNode, parentNode?: Node, page?: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        dom.style = dom.style || {} as CSSStyleDeclaration;

        // 位置
        dom.bounds = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

        const box = node.absoluteBoundingBox || node.absoluteRenderBounds;
        if(box) {
            // dom 上保留原值
            dom.absoluteBoundingBox = {
                ...box
            };
            const center = {
                x: box.x + box.width/2,
                y: box.y + box.height/2
            };
            // 旋转（忽略极小的旋转值，如浮点误差）
            if(node.rotation && Math.abs(node.rotation) > 0.0001) {
                dom.data.rotation = node.rotation;
                dom.transform.rotateZ = node.rotation;
                dom.style.transform = `rotate(${util.toRad(node.rotation)})`;

                // 因为拿到的是新长形宽高，需要求出原始长方形宽高
                const size = this.calculateOriginalRectangleDimensions(dom.data.rotation, box.width, box.height);
                box.width = size.width;
                box.height = size.height;
                box.x = center.x - size.width/2; 
                box.y = center.y - size.height/2;

                // 因为都是相对于整个document的坐标，这里需要用原始坐标把它还原到没有旋转前的位置。才是css中的坐标　
                //const pos = util.rotatePoints(box, center, -dom.data.rotation);
                //box.x = pos.x;
                //box.y = pos.y;
            }

            if(dom.type === 'text' && box.height < node.style?.lineHeightPx) box.height = node.style.lineHeightPx;

            dom.bounds.width = box.width;
            dom.bounds.height = box.height;

            // 检查父节点是否有Auto Layout
            const parentHasAutoLayout = parentNode && (parentNode as any).layoutMode && (parentNode as any).layoutMode !== 'NONE';
            // 检查当前节点是否参与Auto Layout
            const hasLayoutAlign = (node as any).layoutAlign !== undefined;
            const hasLayoutGrow = (node as any).layoutGrow !== undefined;
            const hasLayoutSizing = (node as any).layoutSizingHorizontal !== undefined || 
                                    (node as any).layoutSizingVertical !== undefined;
            const participatesInAutoLayout = hasLayoutAlign || hasLayoutGrow || hasLayoutSizing;

            // 智能定位策略
            // 1. page的直接子元素（顶级Frame）：使用绝对定位，相对于page
            // 2. 参与Auto Layout的子元素：使用flex布局，不需要left/top
            // 3. 不参与Auto Layout的子元素：使用绝对定位

            // 优先相对于页面坐标, isElement是相于它的父级的
            if(page && !dom.isElement) {
                dom.data.left = dom.bounds.x = box.x - page.absoluteBoundingBox.x; 
                dom.data.top = dom.bounds.y = box.y - page.absoluteBoundingBox.y;
                // 顶级Frame使用绝对定位（保持之前的行为）
                dom.style.position = 'absolute';
            }
            // 相对于父位置
            else if(parentNode && parentNode.absoluteBoundingBox) {
                if(parentHasAutoLayout) {
                    if(participatesInAutoLayout) {
                        // 参与Auto Layout：位置由flex布局决定
                        dom.data.left = dom.bounds.x = 0; 
                        dom.data.top = dom.bounds.y = 0;
                        // 使用relative让它成为flex item
                        dom.style.position = 'relative';
                    } else {
                        // 不参与Auto Layout：使用绝对定位
                        // 当父元素有rotation时，relativeTransform是相对于旋转后的坐标系
                        // 在CSS中这会导致定位问题，应使用absoluteBoundingBox
                        const parentRotation = (parentNode as any).rotation;
                        if(parentRotation && Math.abs(parentRotation) > 0.0001 && (node as any).relativeTransform) {
                            // 父元素有旋转，使用absoluteBoundingBox计算位置
                            dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x; 
                            dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y;
                        } else if((node as any).relativeTransform) {
                            // 父元素无旋转，使用relativeTransform
                            dom.data.left = dom.bounds.x = (node as any).relativeTransform[0][2];
                            dom.data.top = dom.bounds.y = (node as any).relativeTransform[1][2];
                        } else {
                            dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x; 
                            dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y;
                        }
                        dom.style.position = 'absolute';
                    }
                } else {
                    // 父节点没有Auto Layout：使用绝对定位
                    // 当父元素有rotation时，relativeTransform是相对于旋转后的坐标系
                    // 在CSS中这会导致定位问题，应使用absoluteBoundingBox
                    const parentRotation = (parentNode as any).rotation;
                    if(parentRotation && Math.abs(parentRotation) > 0.0001 && (node as any).relativeTransform) {
                        // 父元素有旋转，使用absoluteBoundingBox计算位置
                        dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x; 
                        dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y;
                    } else if((node as any).relativeTransform) {
                        // 父元素无旋转，使用relativeTransform
                        dom.data.left = dom.bounds.x = (node as any).relativeTransform[0][2];
                        dom.data.top = dom.bounds.y = (node as any).relativeTransform[1][2];
                    } else {
                        dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x; 
                        dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y;
                    }
                    dom.style.position = 'absolute';
                }
            }
            // 没有父元素，使用绝对定位
            else {
                dom.data.left = dom.bounds.x = 0;
                dom.data.top = dom.bounds.y = 0;
                dom.style.position = 'absolute';
            } 
        }
        // 背景色
        if(node.backgroundColor) dom.style.backgroundColor = util.colorToString(node.backgroundColor, 255);

        if(node.cornerRadius) {
            dom.style.borderRadius = util.toPX(node.cornerRadius);
        }
        else if(node.rectangleCornerRadii) {
            dom.style.borderRadius = node.rectangleCornerRadii.map(p=>util.toPX(p)).join(' ');
        }

        if(node.opacity) dom.style.opacity = node.opacity.toString();
        if(node.constraints) {
            if(node.constraints.vertical) {
                dom.style.verticalAlign = {'CENTER': 'middle', 'TOP_BOTTOM': 'super', 'SCALE': 'center'}[node.constraints.vertical];
            }
            if(node.constraints.horizontal) {
                dom.style.textAlign = {'SCALE': 'center', 'LEFT_RIGHT': 'justify-all'}[node.constraints.vertical];
            }
        }
        dom.style.transformOrigin = 'center center';
        
        // 裁剪超出区域
        if(node.clipsContent === true || (parentNode && parentNode.clipsContent === true)) dom.style.overflow = 'hidden';
        // 是否保持宽高比
        dom.preserveRatio = node.preserveRatio;

        // padding
        if(dom.type !== 'svg') {
            for(const padding of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) {
                const v = node[padding];
                if(v) {
                    dom.style[padding] = util.toPX(v);
                }
            }
        }

        // Auto Layout 支持
        // @ts-ignore
        if(node.layoutMode && node.layoutMode !== 'NONE') {
            dom.style.display = 'flex';
            
            // 布局方向
            // @ts-ignore
            if(node.layoutMode === 'HORIZONTAL') {
                dom.style.flexDirection = 'row';
            // @ts-ignore
            } else if(node.layoutMode === 'VERTICAL') {
                dom.style.flexDirection = 'column';
            }

            // 主轴对齐
            // @ts-ignore
            if(node.primaryAxisAlignItems) {
                // @ts-ignore
                switch(node.primaryAxisAlignItems) {
                    case 'MIN':
                        // 默认，不需要设置
                        break;
                    case 'CENTER':
                        dom.style.justifyContent = 'center';
                        break;
                    case 'MAX':
                        dom.style.justifyContent = 'flex-end';
                        break;
                    case 'SPACE_BETWEEN':
                        dom.style.justifyContent = 'space-between';
                        break;
                }
            }

            // 交叉轴对齐
            // @ts-ignore
            if(node.counterAxisAlignItems) {
                // @ts-ignore
                switch(node.counterAxisAlignItems) {
                    case 'MIN':
                        // 默认，不需要设置
                        break;
                    case 'CENTER':
                        dom.style.alignItems = 'center';
                        break;
                    case 'MAX':
                        dom.style.alignItems = 'flex-end';
                        break;
                    case 'BASELINE':
                        dom.style.alignItems = 'baseline';
                        break;
                }
            }

            // 子元素间距
            // @ts-ignore
            if(node.itemSpacing) {
                // @ts-ignore
                dom.style.gap = util.toPX(node.itemSpacing);
            }
        }
        
        await this.convertStyle(node, dom, option, container);
        await this.convertFills(node, dom, option, container);// 解析fills
        await this.convertStrokes(node, dom, option, container);// 边框
        await this.convertEffects(node, dom, option, container);// 滤镜
        
        dom.data.left = dom.bounds.x;
        dom.data.top = dom.bounds.y;
        dom.data.width = dom.bounds.width;
        dom.data.height = dom.bounds.height;

        // 只有绝对定位时才设置left/top
        // 参与Auto Layout的元素（position: relative）不需要left/top
        if(dom.style.position === 'absolute') {
            dom.style.left = util.toPX(dom.bounds.x).toString();
            dom.style.top = util.toPX(dom.bounds.y).toString();
        }

        dom.style.width = util.toPX(dom.bounds.width).toString();
        dom.style.height = util.toPX(dom.bounds.height).toString();

        // 处理混合模式
        if(node.blendMode) {
            const cssBlendMode = this.convertBlendMode(node.blendMode);
            if(cssBlendMode) {
                dom.style.mixBlendMode = cssBlendMode;
            }
        }

        return dom;
    }

    // 生成节点对象
    createDomNode(type: DomNodeType, option?: DomNode) {
        const dom = {
            data: {} as IJElementData,
            attributes: {} as StringKeyValue,
            children: [] as Array<DomNode>,
            ...option,
            style: {
                boxSizing: 'border-box',
                ...option?.style,
            } as CSSStyleDeclaration,
            filters: new Array<IFilter>,
            transform: {} as IStyleTransform,
            type: type,
        } as DomNode; 
        return dom;
    }

    // 转换style
    async convertStyle(node:  Node<NType>|TypeStyle, dom: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        // @ts-ignore - BOOLEAN_OPERATION 继承 VECTOR 的样式，应该处理
        const style: TypeStyle = node.style || node;
        if(!style) return dom;

        if (style.fontFamily) dom.style.fontFamily = style.fontFamily;
        if (style.fontSize) dom.style.fontSize = util.toPX(style.fontSize);
        if (style.fontWeight) dom.style.fontWeight = style.fontWeight.toString();
        if(style.italic) dom.style.fontStyle = 'italic';
        if (typeof style.letterSpacing !== 'undefined') {
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
    async convertEffects(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        if(!node.isMaskOutline && node.effects) {
            //dom.style.filter = dom.style.filter || '';
            for(const effect of node.effects) {
                if(effect.visible === false) continue;
                switch(effect.type) {
                    case EffectType.INNER_SHADOW: 
                    case EffectType.DROP_SHADOW: {
                        //dom.style.filter += ` drop-shadow(${util.toPX(effect.offset.x)} ${util.toPX(effect.offset.y)} ${util.toPX(effect.radius)} ${util.colorToString(effect.color, 255)})`;
                        // 如果 有spread，则加到盒子上
                        if(effect.spread || effect.type === EffectType.INNER_SHADOW) {
                            dom.style.boxShadow = `${util.toPX(effect.offset.x)} ${util.toPX(effect.offset.y)} ${util.toPX(effect.radius)}  ${util.toPX(effect.spread||0)} ${util.colorToString(effect.color, 255)} ${effect.type === EffectType.INNER_SHADOW?'inset':''}`;
                        }
                        else {
                            dom.filters.push(new DropShadowFilter({
                                value: {
                                    x: util.toPX(effect.offset.x),
                                    y: util.toPX(effect.offset.y),
                                    blur: util.toPX(effect.radius),
                                    color: util.colorToString(effect.color, 255)
                                }
                            }));
                        }
                        break;
                    }
                    case EffectType.LAYER_BLUR: {
                        //dom.style.filter += ` blur(${util.toPX(effect.radius)})`;
                        dom.filters.push(new BlurFilter({
                            value: util.toPX(effect.radius)
                        }));
                        break;
                    }
                    case EffectType.BACKGROUND_BLUR:{
                        break;
                    }
                }
            }
        }
        return dom;
    }

    // 处理填充
    async convertFills(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode) {
        // isMaskOutline 如果为true则忽略填充样式
        if(!node.isMaskOutline && node.fills) {
            for(const fill of node.fills) {
                if(fill.visible === false) continue;

                switch(fill.type) {
                    case PaintType.SOLID: {
                        if(typeof fill.opacity !== 'undefined') fill.color.a = fill.opacity;
                        dom.style.backgroundColor = util.colorToString(fill.color, 255);
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        dom.style.background = this.convertLinearGradient(fill, dom, container);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_DIAMOND:
                    case PaintType.GRADIENT_ANGULAR:
                    case PaintType.GRADIENT_RADIAL: {
                        dom.style.background = this.convertRadialGradient(fill, dom, container);
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
                        dom.data.imageSizeMode = dom.style.backgroundSize = 'cover';
                        break;
                    }
                    case PaintSolidScaleMode.FIT: {
                        dom.data.imageSizeMode = dom.style.backgroundSize = 'contain';
                        break;
                    }
                    case PaintSolidScaleMode.CROP: {
                        dom.data.imageSizeMode = dom.style.backgroundSize = 'stretch';
                        break;
                    }
                    case PaintSolidScaleMode.STRETCH: {
                        dom.style.backgroundSize = '100% 100%';
                        dom.data.imageSizeMode = 'stretch';
                        break;
                    }
                    // 平铺
                    case PaintSolidScaleMode.TILE: {
                        dom.data.imageSizeMode = dom.style.backgroundRepeat = 'repeat';
                        break;
                    }
                }

                // 处理填充的混合模式
                if(fill.blendMode) {
                    const cssBlendMode = this.convertBlendMode(fill.blendMode);
                    if(cssBlendMode && cssBlendMode !== 'normal') {
                        // 对于填充的混合模式，使用 background-blend-mode
                        dom.style.backgroundBlendMode = cssBlendMode;
                    }
                }

                if(dom && fill.imageTransform && fill.scaleMode === PaintSolidScaleMode.STRETCH) {
                    if(!dom.transform) dom.transform = {} as IStyleTransform;

                    /**
                     * [[cos(angle), sin(angle), 0],
                        [-sin(angle), cos(angle), 0]]
                     */
                    const [
                        [a, c, e], 
                        [b, d, f]
                    ] = fill.imageTransform;

                    // 计算旋转角度和正弦值
                    dom.transform.translateX = util.toPX(e) // * node.absoluteBoundingBox.width;                    
                    dom.transform.translateY = util.toPX(f)  //* node.absoluteBoundingBox.width;

                    //dom.transform.scaleX = Math.sqrt(a*a + b*b);
                    //dom.transform.scaleY = Math.sqrt(c*c + d*d);

                    //dom.transform.skewX = Math.atan2(b, a);
                    //dom.transform.skewY =  Math.atan2(b, a);

                    // 计算旋转角度和正弦值
                    const rotation = Math.atan2(b, a);//util.getPointCoordRotation({x: a, y: b}, {x: c, y: d}); //Math.atan2(b, a);
                    dom.transform.rotateZ = rotation;

                    //const scaleX = Math.sqrt(a * a + b * b);
                    //const scaleY = Math.sqrt(c * c + d * d);

                    dom.preserveRatio = true;
                }
                // 如果有滤镜，则给指定
                if(fill.filters) {
                    /* exposure?: number; // 曝光度 (exposure): 控制图像的明亮程度或暗度。
                    contrast?: number; // 对比
                    saturation?: number; // 饱和度
                    temperature?: number; // 色温
                    tint?: number; // 色调
                    highlights?: number; // 调整图像中高光部分的亮度和对比度。
                    shadows?: number; // 阴影
                    */
                    if(fill.filters.contrast) {
                        const v = util.toNumberRange(fill.filters.contrast, -1, 1, 0.5, 1);
                        dom.filters.push(new ContrastFilter({
                            value: v
                        }));
                    }
                    if(fill.filters.exposure) {
                        const v = util.toNumberRange(fill.filters.exposure, -1, 1, 0.3, 2);
                        dom.filters.push(new BrightnessFilter({
                            value: v
                        }));
                    }
                    if(fill.filters.saturation) {
                        const v = util.toNumberRange(fill.filters.saturation, -1, 1, 0, 2);
                        dom.filters.push(new SaturateFilter({
                            value: v
                        }));
                    }
                    if(fill.filters.temperature) {
                        const v = fill.filters.temperature;//util.toNumberRange(fill.filters.temperature, -1, 1, -Math.PI, Math.PI);
                        dom.filters.push(new HueRotateFilter({
                            value: util.toRad(v)
                        }));
                    }
                    if(fill.filters.tint) {
                        const v = util.toNumberRange(fill.filters.tint, -1, 1, 5, 7);
                        dom.filters.push(new HueRotateFilter({
                            value: util.toDeg(util.radToDeg(v))
                        }));
                    }
                    if(fill.filters.highlights) {
                        const v = util.toNumberRange(fill.filters.highlights, -1, 1, 0.6, 1.1);
                        dom.filters.push(new BrightnessFilter({
                            value: v
                        }));
                    }
                    if(fill.filters.shadows) {
                        const v = Math.abs(fill.filters.shadows);
                        let color = `rgba(255,255,255,${v})`;
                        if(fill.filters.shadows < 0) {
                            color = `rgba(0,0,0,${v})`;
                        }
                        dom.filters.push(new DropShadowFilter({
                            value: {
                                x: '0',
                                y: '0',
                                blur: '2px',
                                color
                            }
                        }));
                    }
                }
            }
        }
        return dom;
    }

    // 处理边框
    async convertStrokes(node:  Node<NType>, dom: DomNode, option?: ConvertNodeOption, container?: DomNode) {

        if(node.strokes && node.strokes.length) {
            
            for(const stroke of node.strokes) {
                if(stroke.visible === false) continue;
                if(stroke.color) {
                    if(typeof stroke.opacity !== 'undefined') stroke.color.a = stroke.opacity;
                    dom.style.outlineColor = util.colorToString(stroke.color, 255);
                }
                switch(stroke.type) {
                    case PaintType.SOLID: {
                        dom.style.outlineStyle = 'solid';
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        dom.style.borderImageSource = this.convertLinearGradient(stroke, dom, container);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_DIAMOND:
                    case PaintType.GRADIENT_ANGULAR:
                    case PaintType.GRADIENT_RADIAL: {
                        dom.style.borderImageSource = this.convertRadialGradient(stroke, dom, container);
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

    // 是否是空的dom节点
    isEmptyDom(dom: DomNode) {
        // 有子节点，不是空
        if(dom.children && dom.children.length) return false;
        
        // 有文本内容，不是空
        if(dom.text) return false;
        
        // 非 div 类型（如 svg, img 等），不是空
        if(dom.type !== 'div') return false;
        
        // 检查样式是否有意义的内容
        const style = dom.style;
        
        // 有滤镜效果
        if(dom.filters && dom.filters.length) return false;
        if(style.filter) return false;
        
        // 有背景相关
        if(style.borderImageSource || style.backgroundImage || style.background) return false;
        if(style.backgroundColor && !this.isTransparentColor(style.backgroundColor)) return false;
        
        // 有边框
        if(style.border || style.borderWidth || style.borderStyle || style.borderColor) return false;
        if(style.borderRadius || style.borderTopLeftRadius) return false;
        
        // 有阴影
        if(style.boxShadow || style.boxShadow) return false;
        
        // 有变换
        if(dom.transform && Object.keys(dom.transform).length > 0) return false;
        if(style.transform) return false;
        
        // 有混合模式
        if(style.mixBlendMode && style.mixBlendMode !== 'normal') return false;
        
        // 有透明度设置
        if(style.opacity !== undefined && style.opacity !== '1') return false;
        
        // 有明确的尺寸和位置（可能是占位元素）
        // 如果有明确的尺寸，即使没有其他样式，也可能是有意义的
        const hasExplicitSize = (style.width && style.width !== '0px' && style.width !== 'auto') ||
                                (style.height && style.height !== '0px' && style.height !== 'auto');
        
        // 如果没有任何样式属性，认为是空
        const hasAnyStyle = Object.keys(style).some(key => {
            const value = style[key];
            return value !== undefined && value !== '' && value !== 'initial' && value !== 'inherit';
        });
        
        return !hasAnyStyle;
    }

    // 是否是透明色
    isTransparentColor(color) {
        if(color == 'transparent') return true;
        if(color === 'rgba(0,0,0,0)' || /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\)/.test(color)) return true;
        if(typeof color === 'object' && 'a' in color && color.a === 0) return true;
        return false;
    }

    // 转换线性渐变
    convertLinearGradient(gradient: Paint, dom?: DomNode, container?: DomNode) {
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
    convertRadialGradient(gradient: Paint, dom?: DomNode, container?: DomNode) {
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

      // 计算原始长方形宽高
      calculateOriginalRectangleDimensions(radian: number, newWidth: number, newHeight: number) {       
        // 旋转后的长方形的宽和高 newWidth newHeight

        const cos = Math.cos(radian);
        const sin = Math.sin(radian)
        // 解方程求原始长方形的宽度和高度
        const w = (newWidth * Math.abs(cos) - newHeight * Math.abs(sin)) / (cos**2 - sin**2);
        const h = (newHeight * Math.abs(cos) - newWidth * Math.abs(sin)) / (cos**2 - sin**2);
        
        return { width: w,  height: h };
    }

    // 转换混合模式
    convertBlendMode(blendMode: BlendMode): string {
        // Figma 混合模式到 CSS mix-blend-mode 的映射
        const blendModeMap: { [key: string]: string } = {
            [BlendMode.PASS_THROUGH]: 'normal',      // 仅适用于组，子元素不继承混合模式
            [BlendMode.NORMAL]: 'normal',
            [BlendMode.DARKEN]: 'darken',
            [BlendMode.MULTIPLY]: 'multiply',
            [BlendMode.LINEAR_BURN]: 'color-burn',   // CSS 没有 linear-burn，用 color-burn 近似
            [BlendMode.COLOR_BURN]: 'color-burn',
            [BlendMode.LIGHTEN]: 'lighten',
            [BlendMode.SCREEN]: 'screen',
            [BlendMode.LINEAR_DODGE]: 'color-dodge', // CSS 没有 linear-dodge，用 color-dodge 近似
            [BlendMode.COLOR_DODGE]: 'color-dodge',
            [BlendMode.OVERLAY]: 'overlay',
            [BlendMode.SOFT_LIGHT]: 'soft-light',
            [BlendMode.HARD_LIGHT]: 'hard-light',
            [BlendMode.DIFFERENCE]: 'difference',
            [BlendMode.EXCLUSION]: 'exclusion',
            [BlendMode.HUE]: 'hue',
            [BlendMode.SATURATION]: 'saturation',
            [BlendMode.COLOR]: 'color',
            [BlendMode.LUMINOSITY]: 'luminosity',
        };

        return blendModeMap[blendMode] || 'normal';
    }
    
}

export default BaseConverter;