
import { Node, DomNode, ConvertNodeOption, PaintType, PaintSolidScaleMode, Paint, Vector, ColorStop, } from './types';
import { util } from 'j-design-util';
import BaseConverter from './baseNode';

export class FRAMEConverter extends BaseConverter<'ELLIPSE'> {
    async convert(node:  Node<'ELLIPSE'>, dom: DomNode, parentNode?: Node, option?: ConvertNodeOption) {
        dom.type = 'svg';
        let ellipse = {
            type: 'ellipse',
            style: {} as CSSStyleDeclaration,
            children: [] as Array<DomNode>,
        } as DomNode; 
        // svg外转用定位和大小，其它样式都给子元素
        ellipse =  await super.convert(node, ellipse, parentNode, option);
        dom.style.left = ellipse.style.left;
        dom.style.top = ellipse.style.top;
        //dom.style.width = ellipse.style.width;
        //dom.style.height = ellipse.style.height;

        delete ellipse.style.left;
        delete ellipse.style.top;
        delete ellipse.style.width;
        delete ellipse.style.height;

        dom.bounds = ellipse.bounds;

        dom.children.push(ellipse);
        return dom;
    }

    // 处理填充
    convertFills(node:  Node<'ELLIPSE'>, dom: DomNode, option?: ConvertNodeOption) {
        if(node.fills) {
            for(const fill of node.fills) {
                if(fill.visible === false) continue;

                switch(fill.type) {
                    case PaintType.SOLID: {
                        dom.fill = util.colorToString(fill.color, 255);
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        dom.fill = this.convertLinearGradient(fill);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_RADIAL: {
                        dom.fill = this.convertRadialGradient(fill);
                        break;
                    }
                    // 图片
                    case PaintType.IMAGE: {
                        super.convertFills(node, dom, option);
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
            for(const stroke of node.strokes) {
                if(stroke.visible === false) continue;
                if(stroke.color) dom.style.borderColor = util.colorToString(stroke.color, 255);
                switch(stroke.type) {
                    case PaintType.SOLID: {
                        dom.style.borderStyle = 'solid';
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        dom.style.borderImageSource = this.convertLinearGradient(stroke);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_RADIAL: {
                        dom.style.borderImageSource = this.convertRadialGradient(stroke);
                        break;
                    }
                    // 图片
                    case PaintType.IMAGE: {
                        if(option && option.images) {
                            const img = option.images[stroke.imageRef];
                            if(img) dom.style.borderImage = `url(${img})`;
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
            if(node.strokeWeight) dom.style.borderWidth = dom.style.borderImageWidth = util.toPX(node.strokeWeight);
        }
        return dom;
    }

    // 转换线性渐变
    convertLinearGradient(gradient: Paint) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        // console.log(handlePositions);
        const linearGradient = `linear-gradient(${this.getGradientDirection(
          handlePositions
        )}, ${this.getGradientStops(gradientStops)})`;
        return linearGradient;
    }

    // 转换径向性渐变
    convertRadialGradient(gradient: Paint) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        // console.log(handlePositions);
        const radialGradient = `radial-gradient(${this.getRadialGradientPosition(
          handlePositions
        )}, ${this.getGradientStops(gradientStops)})`;
        return radialGradient;
    }

    // 径向性位置
    getRadialGradientPosition(gradientHandlePositions: Vector[]) {
        if(!gradientHandlePositions || !gradientHandlePositions.length) return 'center';
        return `farthest-corner at ${util.toPX(gradientHandlePositions[0].x)} ${util.toPX(gradientHandlePositions[0].y)}`;
    }

    // Helper function to get the gradient direction
    getGradientDirection(gradientHandlePositions: Vector[]) {
        if (gradientHandlePositions.length >= 2) {
          const start = gradientHandlePositions[0];
          const end = gradientHandlePositions[1]; // Use the second handle, ignoring the last one
      
          // Calculate the angle in radians
          const angleRadians = Math.atan2(end.y - start.y, end.x - start.x);
      
          // Convert radians to degrees and normalize to the range [0, 360)
          let angleDegrees = (angleRadians * 180) / Math.PI;
          angleDegrees = (angleDegrees + 360) % 360;
          // console.log(`${angleDegrees}deg`);
          return `${angleDegrees}deg`;
        } else {
          console.error("Insufficient handle positions for gradient calculation.");
          return ""; // or any default value
        }
      }
      
      // Helper function to get the gradient stops
      getGradientStops(gradientStops: ColorStop[]) {
        // Constructing the gradient stops string based on received data
        const stopsString = gradientStops
          .map((stop) => util.colorToString(stop.color, 255) + ` ${stop.position * 100}%`)
          .join(", ");
        return stopsString;
      }
}

export default FRAMEConverter;