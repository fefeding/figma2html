import util from '@fefeding/utils';
import CSSFilter from '@fefeding/css-filters';
import { ImageType } from './common/types';
import BaseConverter from './figmaTypes/baseNode';
import DocumentConverter from './figmaTypes/document';
import PageConverter from './figmaTypes/page';
import FrameConverter from './figmaTypes/frame';
//import GroupConverter from './figmaTypes/group';
import TextConverter from './figmaTypes/text';
import PolygonConverter from './figmaTypes/polygon';
import StarConverter from './figmaTypes/star';
import EllipseConverter from './figmaTypes/ellipse';
import LineConverter from './figmaTypes/line';
import RectangleConverter from './figmaTypes/rectangle';
const frameConverter = new FrameConverter();
const ConverterMaps = {
    'BASE': new BaseConverter(),
    'FRAME': frameConverter,
    'GROUP': frameConverter,
    'TEXT': new TextConverter(),
    'DOCUMENT': new DocumentConverter(),
    'CANVAS': new PageConverter(),
    'REGULAR_POLYGON': new PolygonConverter(),
    'ELLIPSE': new EllipseConverter(),
    'STAR': new StarConverter(),
    'RECTANGLE': new RectangleConverter(),
    'LINE': new LineConverter(),
    'VECTOR': new RectangleConverter(),
};
// rectange是否处理成svg，是返回svg，否则返回img或div
function rectType(item) {
    if (item.type !== 'RECTANGLE')
        return '';
    // 已识别成图片的，不再处理成svg
    if (item.type === 'RECTANGLE' && item.fills && item.fills.length && item.fills.find(p => p.type === 'IMAGE')) {
        return 'img';
    }
    if (item.type === 'RECTANGLE' && item.exportSettings) {
        for (const setting of item.exportSettings) {
            if (setting.format !== ImageType.SVG) {
                return 'div';
            }
        }
    }
    return 'svg';
}
// 转node为html结构对象
export async function convert(node, parentNode, page, option, container) {
    // 如果是根，则返回document
    if (node.document) {
        const docDom = await convert(node.document, node, page, option);
        return docDom;
    }
    if (node.visible === false)
        return null;
    // 已识别成图片的，不再处理成svg
    const recType = rectType(node);
    const dom = ConverterMaps.BASE.createDomNode('div', {
        id: node.id,
        name: node.name,
        type: 'div',
        visible: true,
        data: {},
        style: {
            // 默认采用绝对定位
            position: 'absolute',
        },
        children: [],
        figmaData: node,
    });
    // 普通元素，不可当作容器
    dom.isElement = ['VECTOR', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'SLICE', 'RECTANGLE'].includes(node.type) && recType !== 'img' && recType !== 'svg' && recType !== 'div'; // || (parentNode && parentNode.clipsContent);
    const isContainer = ['GROUP', 'FRAME', 'CANVAS', 'BOOLEAN', 'BOOLEAN_OPERATION'].includes(node.type);
    const svgElements = ['VECTOR', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'RECTANGLE'];
    // 容器可能是SVG
    let isSvg = isContainer && !container;
    // 容器下所有元素都是SVG元素，则认为是svg块
    if (isSvg && node.children && node.children.length) {
        for (const child of node.children) {
            if (!svgElements.includes(child.type)) {
                isSvg = false;
                break;
            }
            // 已识别成图片的，不再处理成svg
            if (rectType(child) !== 'svg') {
                isSvg = false;
                break;
            }
        }
    }
    else {
        isSvg = false;
    }
    if (isSvg) {
        dom.type = 'svg';
        container = dom;
    }
    let converter = ConverterMaps[node.type] || ConverterMaps.BASE;
    if (recType && recType !== 'svg') {
        dom.type = recType;
        converter = ConverterMaps.BASE;
    }
    if (converter)
        await converter.convert(node, dom, parentNode, page, option, container);
    if (!page && node.type === 'FRAME' && option?.expandToPage)
        page = dom; // 当前节点开始，为页面模板
    else if (page && (!container || dom.type === 'svg')) {
        // 没有显示意义的div不处理
        if (!dom.isElement)
            page.children.push(dom);
    }
    if (node.children && node.children.length) {
        if (isSvg && (node.type === 'BOOLEAN_OPERATION' || node.type === 'BOOLEAN')) {
            // if(svgElements.includes(node.children[0].type)) node.children[0].isMask = true;
        }
        let lastChildDom = null;
        for (const child of node.children) {
            let parent = container;
            // 如果是蒙板，则加入上一个SVG元素中
            if (child.isMask && !parent && lastChildDom?.type === 'svg') {
                parent = lastChildDom;
            }
            const c = await convert(child, node, parent || page, option, parent);
            if (!c)
                continue;
            lastChildDom = c;
            if (ConverterMaps.BASE.isEmptyDom(c)) {
                console.log('empty dom', c);
                continue;
            }
            if (!c.isMask && !dom.children.includes(c) && (!page || c.isElement))
                dom.children.push(c);
        }
    }
    return dom;
}
// 把figma数据转为dom对象
export async function nodeToDom(node, option) {
    switch (node.type) {
        case 'document': {
            return await renderDocument(node, option);
        }
        case 'page': {
            return await renderPage(node, option);
        }
        case 'svg': {
            return await renderSvg(node, option);
        }
        case 'ellipse':
        case 'line':
        case 'path':
        case 'polygon': {
            return await renderEllipse(node, option);
        }
        case 'stop':
        case 'defs':
        case 'mask':
        case 'linearGradient':
        case 'radialGradient': {
            return await renderSvgElement(node, option);
        }
        default: {
            return await renderElement(node, option);
        }
    }
}
async function renderDocument(node, option) {
    const doc = await renderElement(node, option);
    return doc;
}
async function renderPage(node, option) {
    const page = await renderElement(node, option);
    //page.style.minHeight = node.bounds.height + 'px';
    return page;
}
async function renderSvg(node, option) {
    const svg = await renderSvgElement(node, option);
    //svg.setAttribute('width', node.bounds.width + '');
    //svg.setAttribute('height', node.bounds.height + '');
    return svg;
}
async function renderEllipse(node, option) {
    const ellipse = await renderSvgElement(node, option);
    if (node.fill)
        ellipse.setAttribute('fill', node.fill);
    return ellipse;
}
async function renderSvgElement(node, option) {
    let el = document.createElementNS("http://www.w3.org/2000/svg", node.type); // 创建SVG元素
    await renderElement(node, option, el);
    return el;
}
async function renderElement(node, option, dom) {
    let domType = node.type === 'text' ? 'div' : node.type;
    dom = dom || util.createElement(domType);
    // 是图片的话，在它上面套一层div
    if (node.type === 'img') {
        let img = dom;
        if (node.url)
            img.src = node.url;
        util.css(img, {
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: '0',
            top: '0'
        });
        dom = util.createElement('div');
        // 如果保持宽高比，则直隐去超出部分
        if (node.preserveRatio) {
            // 保持宽高比
            util.css(img, {
                height: 'auto'
            });
            util.css(dom, {
                overflow: 'hidden'
            });
        }
        dom.appendChild(img);
        setImageSize(node, img);
    }
    if (node.style) {
        Object.assign(dom.style, node.style);
        //if(node.preserveRatio && node.type === 'img') dom.style.height = 'auto';
    }
    if (node.text) {
        dom.innerHTML = node.text.replace(/\n/g, '<br />');
    }
    if (node.filters) {
        const filters = new CSSFilter(dom, node.filters);
        filters.apply(); // 应用于style
    }
    if (node.visible === false)
        dom.style.display = 'none';
    if (node.attributes) {
        for (const name in node.attributes) {
            if (typeof node.attributes[name] !== 'undefined' && typeof name === 'string') {
                dom.setAttribute(name, node.attributes[name]);
            }
        }
    }
    if (node.transform) {
        let transform = '';
        if (node.transform.rotateX) {
            transform += ` rotateX(${util.toRad(node.transform.rotateX)})`;
        }
        if (node.transform.rotateY) {
            transform += ` rotateY(${util.toRad(node.transform.rotateY)})`;
        }
        if (node.transform.rotateZ) {
            transform += ` rotateZ(${util.toRad(node.transform.rotateZ)})`;
        }
        if (node.transform.scaleX) {
            transform += ` scaleX(${node.transform.scaleX})`;
        }
        if (node.transform.scaleY) {
            transform += ` scaleY(${node.transform.scaleY})`;
        }
        if (node.transform.scaleZ) {
            transform += ` scaleZ(${node.transform.scaleZ})`;
        }
        if (node.transform.skewX) {
            transform += ` skewX(${util.toRad(node.transform.skewX)})`;
        }
        if (node.transform.skewY) {
            transform += ` skewY(${util.toRad(node.transform.skewY)})`;
        }
        if (node.transform.translateX) {
            transform += ` translateX(${util.isNumber(node.transform.translateX) ? util.toPX(node.transform.translateX) : node.transform.translateX})`;
        }
        if (node.transform.translateY) {
            transform += ` translateY(${util.isNumber(node.transform.translateY) ? util.toPX(node.transform.translateY) : node.transform.translateY})`;
        }
        if (node.transform.translateZ) {
            transform += ` translateZ(${util.isNumber(node.transform.translateZ) ? util.toPX(node.transform.translateZ) : node.transform.translateZ})`;
        }
        if (transform) {
            util.css(dom, {
                transform
            });
        }
    }
    if (node.name)
        dom.setAttribute('data-name', node.name);
    if (node.id)
        dom.setAttribute('id', node.id);
    if (node.cx)
        dom.setAttribute('cx', node.cx);
    if (node.cy)
        dom.setAttribute('cy', node.cy);
    if (node.r)
        dom.setAttribute('r', node.r);
    if (node.fx)
        dom.setAttribute('fx', node.fx);
    if (node.fy)
        dom.setAttribute('fy', node.fy);
    if (node.x1)
        dom.setAttribute('x1', node.x1);
    if (node.y1)
        dom.setAttribute('y1', node.y1);
    if (node.x2)
        dom.setAttribute('x2', node.x2);
    if (node.y2)
        dom.setAttribute('y2', node.y2);
    if (node.offset)
        dom.setAttribute('offset', node.offset);
    if (node.children) {
        for (const child of node.children) {
            if (child.visible === false)
                continue;
            const c = await nodeToDom(child, option);
            c && dom.appendChild(c);
        }
    }
    return dom;
}
// 根据配置设置图片大小
function setImageSize(node, img) {
    if (img.complete) {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        // 当背景图片使用 cover 时，图片会被缩放以填充整个容器，同时保持图片纵横比例，以确保整个容器都被覆盖，可能造成图片的一部分被裁剪掉
        switch (node.data?.imageSizeMode) {
            // 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。背景图像的某些部分也许无法显示在背景定位区域中。
            case 'cover': {
                const px = width / util.toNumber(node.data.width);
                const py = height / util.toNumber(node.data.height);
                if (py < px) {
                    const w = img.width / py;
                    img.style.height = util.toPX(node.data.height);
                    img.style.width = util.toPX(w);
                    img.style.left = -(w - util.toNumber(node.data.width)) / 2 + 'px';
                }
                else {
                    const h = height / px;
                    img.style.width = util.toPX(node.data.width);
                    img.style.height = util.toPX(h);
                    img.style.top = -(h - util.toNumber(node.data.height)) / 2 + 'px';
                }
                break;
            }
            // 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。
            case 'contain': {
                const px = width / util.toNumber(node.data.width);
                const py = height / util.toNumber(node.data.height);
                if (py < px) {
                    const h = height / px;
                    img.style.width = util.toPX(node.data.width);
                    img.style.height = util.toPX(h);
                    img.style.top = -(h - util.toNumber(node.data.height)) / 2 + 'px';
                }
                else {
                    const w = img.width / py;
                    img.style.height = util.toPX(node.data.height);
                    img.style.width = util.toPX(w);
                    img.style.left = -(w - util.toNumber(node.data.width)) / 2 + 'px';
                }
                break;
            }
            case 'stretch': {
                img.style.width = util.toPX(node.data.width);
                img.style.height = util.toPX(node.data.height);
                break;
            }
            case 'repeat': {
                break;
            }
        }
    }
    else {
        //img.data = node;
        img.onload = function (e) {
            setImageSize(node, this);
        };
    }
}
