var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var dist = {};

var types = {};

Object.defineProperty(types, "__esModule", { value: true });

var util = {};

Object.defineProperty(util, "__esModule", { value: true });
util.default = {
    /**
     * 是否是数字，字符串数字或配身就是number返回true
     * @param v 原字符串或数字
     * @returns true/false
     */
    isNumber(v) {
        return typeof v === 'number' || /^\s*[\d]+(\.\d+)?\s*$/.test(v);
    },
    /**
     * 是否是带像素单位(px)的字符串
     * @param v
     * @returns
     */
    isPXNumber(v) {
        return /^\s*[\d\.]+\s*px\s*/i.test(v);
    },
    /**
     * 是否是带角度单位(deg)的字符串
     * @param v
     * @returns
     */
    isDegNumber(v) {
        return /^\s*[\d\.]+\s*deg\s*/i.test(v);
    },
    /**
     * 是否是带弧度单位(rad)的字符串
     * @param v
     * @returns
     */
    isRadNumber(v) {
        return /^\s*[\d\.]+\s*rad\s*/i.test(v);
    },
    /**
     * 转为像素字符串格式 : 2 -> 2px
     * @param v
     * @returns
     */
    toPX(v) {
        if (this.isNumber(v) || !this.isPXNumber(v))
            return v + 'px';
        return v + '';
    },
    /**
     * 带像素或其它单位的转换为数字: 2px -> 2
     * @param v
     * @param fractionDigits 保留小数位
     * @returns
     */
    toNumber(v, fractionDigits) {
        if (this.isNumber(v))
            v = Number(v);
        else if (typeof v === 'string')
            v = (parseFloat(v) || 0);
        if (typeof fractionDigits !== 'undefined') {
            v = Number(v.toFixed(fractionDigits));
        }
        return v;
    },
    /**
     * 弧度转角度: Math.PI -> 180
     * @param v
     * @returns
     */
    radToDeg(v) {
        return v * (180 / Math.PI);
    },
    /**
     * 角度转弧度 180 -> Math.PI
     * @param v
     * @returns
     */
    degToRad(v) {
        return v * (Math.PI / 180);
    },
    /**
     * 转为角度格式 1 -> 1deg, 3.14rad -> 180deg
     * @param v
     * @returns
     */
    toDeg(v) {
        if (this.isNumber(v))
            return v + 'deg';
        if (typeof v === 'string' && this.isRadNumber(v))
            return this.toDeg(this.radToDeg(parseFloat(v)));
        return v + '';
    },
    /**
     * 转为弧度格式, 1 -> 1rad,  180deg -> 3.14rad
     * @param v
     * @returns
     */
    toRad(v) {
        if (this.isNumber(v))
            return v + 'rad';
        if (typeof v === 'string' && this.isDegNumber(v))
            return this.toRad(this.degToRad(parseFloat(v)));
        return v + '';
    },
    /**
     * 把数值按比例转为目标数值，比如rgba的 0.5-》0.5*255
     * @param v
     * @param multiple 比例值，默认255
     */
    toMultipleInt(v, multiple = 1) {
        return Math.ceil(v * multiple);
    },
    /**
     * 把rgba颜色转为rgba()串型式
     * multiple倍数，如果是小数，则需要*255转到标准值
     */
    colorToString(color, multiple = 1) {
        let str = `${this.toMultipleInt(color.r, multiple)},${this.toMultipleInt(color.g, multiple)},${this.toMultipleInt(color.b, multiple)}`;
        if (typeof color.a !== 'undefined') {
            str = `rgba(${str},${this.toMultipleInt(color.a, multiple)})`;
        }
        else {
            str = `rgb(${str})`;
        }
        return str;
    },
    /**
     * 获取元素的绝对定位
     * @param  el - 目标元素对象
     * @returns  位置对象(top,left)
     */
    getElementPosition(el) {
        const pos = { "y": 0, "x": 0 };
        if (!el)
            return pos;
        if (el.offsetParent) {
            while (el.offsetParent) {
                pos.y += el.offsetTop;
                pos.x += el.offsetLeft;
                el = el.offsetParent;
            }
        }
        // @ts-ignore
        else if (el.x) {
            // @ts-ignore
            pos.x += el.x;
        }
        // @ts-ignore
        else if (el.y) {
            // @ts-ignore
            pos.y += el.y;
        }
        return pos;
    },
    /**
     * 获取元素bounds
     * @param el
     * @returns
     */
    getElementBoundingRect(el) {
        let bounds = {
            height: 0,
            width: 0,
            x: 0,
            y: 0
        };
        if (el.getBoundingClientRect) {
            bounds = el.getBoundingClientRect();
            const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            bounds.x += scrollLeft;
            bounds.y += scrollTop;
        }
        else {
            const pos = this.getElementPosition(el);
            bounds.x = pos.x;
            bounds.y = pos.y;
            bounds.width = el.clientWidth;
            bounds.height = el.clientHeight;
        }
        return bounds;
    },
    /**
     * 把domcument坐标转为指定元素相对坐标
     * @param pos
     * @param dom
     * @returns
     */
    toDomPosition(pos, dom) {
        const domPos = this.getElementBoundingRect(dom);
        return {
            x: pos.x - domPos.x,
            y: pos.y - domPos.y
        };
    },
    /**
     * 把一个或多个点绕某个点旋转一定角度
     * 先把坐标原点移到旋转中心点，计算后移回
     * @param  p - 一个或多个点
     * @param  rp -  旋转中心点
     * @param  r - 旋转角度
     */
    rotatePoints(p, center, r) {
        if (!r || !p)
            return p;
        let cos = Math.cos(r);
        let sin = Math.sin(r);
        if (Array.isArray(p)) {
            for (let i = 0; i < p.length; i++) {
                if (!p[i])
                    continue;
                let x1 = p[i].x - center.x;
                let y1 = p[i].y - center.y;
                p[i].x = x1 * cos - y1 * sin + center.x;
                p[i].y = x1 * sin + y1 * cos + center.y;
            }
        }
        else {
            let x1 = p.x - center.x;
            let y1 = p.y - center.y;
            p.x = x1 * cos - y1 * sin + center.x;
            p.y = x1 * sin + y1 * cos + center.y;
        }
        return p;
    },
    /**
     * 设置dom样式
     * @param dom
     * @param name
     * @param value
     * @returns
     */
    css(dom, name, value) {
        if (!name)
            return;
        if (typeof name === 'object') {
            for (const n of Object.getOwnPropertyNames(name)) {
                this.css(dom, n, name[n]);
            }
        }
        else {
            dom.style[name] = value;
        }
        return this;
    },
    /**
     * 设置或读取dom属性
     * @param dom
     * @param name
     * @param value
     * @returns
     */
    attr(dom, name, value) {
        if (typeof value !== 'undefined') {
            dom.setAttribute(name, value + '');
            return value;
        }
        else {
            return dom.getAttribute(name);
        }
    },
    /**
     * 设置class样式
     * @param dom 节点
     * @param name 样式名
     * @param remove 如果true则表示删除样式
     */
    class(dom, name, remove = false) {
        if (Array.isArray(name)) {
            for (const n of name) {
                this.class(dom, n, remove);
            }
            return;
        }
        if (remove) {
            dom.classList.remove(name);
        }
        else {
            if (!dom.classList.contains(name))
                dom.classList.add(name);
        }
    },
    /**
     * 设置光标位置
     * @param dom 元素 htmlelement
     */
    setRange(dom, position) {
        let range;
        if (position) {
            //@ts-ignore
            range = document.caretPositionFromPoint ? document.caretPositionFromPoint(position.x, position.y) : document.caretRangeFromPoint(position.x, position.y);
        }
        else {
            // 把光标置于最后
            range = document.createRange();
            if (dom) {
                const nodes = dom.childNodes;
                if (nodes.length) {
                    const last = nodes[nodes.length - 1];
                    range.setStart(last, last.textContent.length);
                }
            }
        }
        const sel = window.getSelection();
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    },
    // 本地唯一ID，这个只要保证当前线程唯一即可，非全球唯一
    uuid() {
        const time = Date.now();
        const rnd = Math.floor(Math.random() * 10000000000);
        return (time + rnd).toString();
    },
    /**
     * 把图片旋转一定角度，返回base64
     * @param url
     * @param rotation
     * @returns
     */
    async rotateImage(url, rotation) {
        if (!url)
            return url;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.setAttribute('crossorigin', 'anonymous');
            img.onload = function (e) {
                const cvs = document.createElement('canvas');
                cvs.width = img.width;
                cvs.height = img.height;
                const ctx = cvs.getContext('2d');
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.translate(cvs.width / 2, cvs.height / 2);
                ctx.rotate(rotation);
                ctx.translate(-cvs.width / 2, -cvs.height / 2);
                ctx.drawImage(img, 0, 0);
                const data = cvs.toDataURL();
                resolve(data);
            };
            img.onerror = function (e) {
                reject && reject(e);
            };
            img.src = url;
        });
    },
    /**
     * 请求远程资源
     * @param url
     * @param option
     * @returns
     */
    async request(url, option) {
        option = option || {};
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest(); //新建XMLHttpRequest对象
           
            const params = [];
            if (option.data) {
                for (const name in option.data) {
                    params.push(`${name}=${encodeURIComponent(option.data[name])}`);
                }
            }
            const method = option.method ? option.method.toUpperCase() : 'GET';
            if (method === 'GET') {
                url += (url.includes('?') ? '&' : '?') + params.join('&');
            }
            request.onreadystatechange = function (e) {
                if (this.readyState === 4) { //成功完成
                    //判断相应结果：
                    if (this.status === 200) {
                        resolve(this.responseText);
                    }
                    else {
                        reject(e);
                    }
                }
            };
            //发送请求：
            request.open(method, url);
            if (option.headers) {
                for (const name in option.headers) {
                    request.setRequestHeader(name, option.headers[name]);
                }
            }
            request.send(method === 'POST' ? params.join('&') : null);
        });
    }
};

var controller = {};

(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getChangeData = exports.rotateChange = exports.getRotateEventPosition = exports.Cursors = exports.fullCircleRadius = void 0;
	const util_1 = __importDefault(util);
	exports.fullCircleRadius = Math.PI * 2;
	/**
	 * 操作杠指针配置
	 */
	exports.Cursors = {
	    data: {
	        'l': '',
	        'lt': '',
	        't': '',
	        'tr': '',
	        'r': '',
	        'rb': '',
	        'b': '',
	        'lb': '',
	        'rotate': '',
	        'skew': 'pointer'
	    },
	    // 根据角度旋转指针
	    async get(dir, rotation = 0, data = this.data) {
	        if (dir === 'rotate' || dir === 'skew')
	            return data[dir] || 'pointer';
	        if (Math.abs(rotation) > exports.fullCircleRadius)
	            rotation = rotation % exports.fullCircleRadius;
	        // 2PI 为一个圆，把角度转为一个圆内的值，以免重复生成图片
	        const rotationKey = Number(rotation.toFixed(2)); // 精度只取小数2位
	        const key = rotationKey === 0 ? dir : `${dir}_${rotationKey}`;
	        let cursor = data[key];
	        if (!cursor) {
	            if (dir === 'l' || dir === 'r' || dir === 't' || dir === 'b') {
	                // 如果没有旋转角度，则把ns转90度即可
	                if (rotation === 0) {
	                    if (!data['t'])
	                        return 'pointer';
	                    // b t 同指针
	                    if (dir === 'b') {
	                        cursor = data[dir] = data['t'];
	                    }
	                    else {
	                        cursor = await util_1.default.rotateImage(data['t'], Math.PI / 2);
	                        if (!data['l'])
	                            data['l'] = cursor;
	                        if (!data['r'])
	                            data['r'] = cursor;
	                    }
	                }
	                // 如果有旋转角度，则获取标准的再转对应的角度
	                else {
	                    const normal = await this.get(dir, 0, data);
	                    if (!normal || normal === 'pointer')
	                        return 'pointer';
	                    cursor = await util_1.default.rotateImage(normal, rotation);
	                    data[key] = cursor;
	                }
	            }
	            else if (dir === 'tr' || dir === 'lb' || dir === 'lt' || dir === 'rb') {
	                // 如果没有旋转角度，则把nwse转90度即可
	                if (rotation === 0) {
	                    if (!data['lt'])
	                        return 'pointer';
	                    // rb lt同一个指针
	                    if (dir === 'rb') {
	                        cursor = data[dir] = data['lt'];
	                    }
	                    else {
	                        cursor = await util_1.default.rotateImage(data['lt'], Math.PI / 2);
	                        if (!data['tr'])
	                            data['tr'] = cursor;
	                        if (!data['lb'])
	                            data['lb'] = cursor;
	                    }
	                }
	                // 如果有旋转角度，则获取标准的再转对应的角度
	                else {
	                    const normal = await this.get(dir, 0, data);
	                    if (!normal || normal === 'pointer')
	                        return 'pointer';
	                    cursor = await util_1.default.rotateImage(normal, rotation);
	                    data[key] = cursor;
	                }
	            }
	        }
	        return cursor;
	    }
	};
	/**
	 * 因为旋转后坐标要回原才好计算操作，
	 * @param offset
	 * @param oldPosition
	 * @param newPosition
	 * @param rotation
	 * @param center
	 * @returns
	 */
	const getRotateEventPosition = (offset, oldPosition, newPosition, rotation, center) => {
	    // 先回原坐标，再主算偏移量，这样保证操作更容易理解
	    if (rotation) {
	        const [pos1, pos2] = util_1.default.rotatePoints([oldPosition, newPosition], center, -rotation);
	        offset.x = pos2.x - pos1.x;
	        offset.y = pos2.y - pos1.y;
	    }
	    return offset;
	};
	exports.getRotateEventPosition = getRotateEventPosition;
	/**
	 *  发生旋转, 计算得到的旋转角度
	 */
	const rotateChange = (oldPosition, newPosition, center) => {
	    // 因为center是相对于编辑器的，所以事件坐标也需要转到编辑器
	    const cx1 = oldPosition.x - center.x;
	    const cy1 = oldPosition.y - center.y;
	    let angle1 = Math.atan(cy1 / cx1);
	    const cx2 = newPosition.x - center.x;
	    const cy2 = newPosition.y - center.y;
	    let angle2 = Math.atan(cy2 / cx2);
	    if (angle1 >= 0 && angle2 < 0) {
	        if (cx1 >= 0 && cy1 >= 0 && cx2 <= 0 && cy2 >= 0)
	            angle2 = Math.PI + angle2;
	        else if (cx1 <= 0 && cy1 <= 0 && cx2 >= 0 && cy2 <= 0)
	            angle2 = Math.PI + angle2;
	        //else if(cx1 <= 0 && cy1 <=0 && cx2 >= 0 && cy2 >= 0) angle2 = Math.PI + angle2;
	    }
	    else if (angle1 <= 0 && angle2 >= 0) {
	        if (cx1 >= 0 && cy1 <= 0 && cx2 < 0)
	            angle2 = angle2 - Math.PI;
	        else
	            angle2 = -angle2;
	    }
	    else ;
	    return angle2 - angle1;
	};
	exports.rotateChange = rotateChange;
	/**
	 *  根据操作参数，计算位移，大小和旋转角度等
	 */
	const getChangeData = (dir, offset, oldPosition, newPosition, center, rotation = 0) => {
	    // 当前移动对原对象的改变
	    const args = {
	        x: 0,
	        y: 0,
	        width: 0,
	        height: 0,
	        rotation: 0,
	        skew: {
	            x: 0,
	            y: 0
	        }
	    };
	    // 先回原坐标，再主算偏移量，这样保证操作更容易理解
	    if (rotation) {
	        offset = (0, exports.getRotateEventPosition)(offset, oldPosition, newPosition, rotation, center);
	    }
	    switch (dir) {
	        case 'l': {
	            args.x = offset.x;
	            args.width = -offset.x;
	            break;
	        }
	        case 't': {
	            args.y = offset.y;
	            args.height = -offset.y;
	            break;
	        }
	        case 'r': {
	            args.width = offset.x;
	            break;
	        }
	        case 'b': {
	            args.height = offset.y;
	            break;
	        }
	        case 'lt': {
	            args.x = offset.x;
	            args.width = -offset.x;
	            args.y = offset.y;
	            args.height = -offset.y;
	            break;
	        }
	        case 'tr': {
	            args.width = offset.x;
	            args.y = offset.y;
	            args.height = -offset.y;
	            break;
	        }
	        case 'rb': {
	            args.width = offset.x;
	            args.height = offset.y;
	            break;
	        }
	        case 'lb': {
	            args.x = offset.x;
	            args.width = -offset.x;
	            args.height = offset.y;
	            break;
	        }
	    }
	    // 如果中心发生了偏移，则新中心点要移到绕原中心点旋转当前旋转角度的点，才举使图形移动不正常
	    if (rotation && (args.x || args.y || args.width || args.height)) {
	        const newCenter = {
	            x: center.x + args.x + args.width / 2,
	            y: center.y + args.y + args.height / 2
	        };
	        const targetCenter = util_1.default.rotatePoints({ ...newCenter }, center, rotation);
	        args.x += targetCenter.x - newCenter.x;
	        args.y += targetCenter.y - newCenter.y;
	    }
	    return args;
	};
	exports.getChangeData = getChangeData; 
} (controller));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.controller = exports.util = void 0;
	__exportStar(types, exports);
	const util_1 = __importDefault(util);
	exports.util = util_1.default;
	const controller$1 = __importStar(controller);
	exports.controller = controller$1;
	exports.default = util_1.default; 
} (dist));

/** A string enum with value, describing the end caps of vector paths. */
var StrokeCap;
(function (StrokeCap) {
    StrokeCap["NONE"] = "NONE";
    StrokeCap["ROUND"] = "ROUND";
    StrokeCap["SQUARE"] = "SQUARE";
    StrokeCap["LINE_ARROW"] = "LINE_ARROW";
    StrokeCap["TRIANGLE_ARROW"] = "TRIANGLE_ARROW";
})(StrokeCap || (StrokeCap = {}));
/** Where stroke is drawn relative to the vector outline as a string enum */
var StrokeAlign;
(function (StrokeAlign) {
    StrokeAlign["INSIDE"] = "INSIDE";
    StrokeAlign["OUTSIDE"] = "OUTSIDE";
    StrokeAlign["CENTER"] = "CENTER";
})(StrokeAlign || (StrokeAlign = {}));
/** A string enum with value, describing how corners in vector paths are rendered. */
var StrokeJoin;
(function (StrokeJoin) {
    StrokeJoin["MITER"] = "MITER";
    StrokeJoin["BEVEL"] = "BEVEL";
    StrokeJoin["ROUND"] = "ROUND";
})(StrokeJoin || (StrokeJoin = {}));
var ImageType;
(function (ImageType) {
    ImageType["JPG"] = "JPG";
    ImageType["PNG"] = "PNG";
    ImageType["SVG"] = "SVG";
    ImageType["PDF"] = "PDF";
})(ImageType || (ImageType = {}));
/** A string enum with value, indicating the type of boolean operation applied */
var BooleanOperationType;
(function (BooleanOperationType) {
    BooleanOperationType["UNION"] = "UNION";
    BooleanOperationType["INTERSECT"] = "INTERSECT";
    BooleanOperationType["SUBTRACT"] = "SUBTRACT";
    BooleanOperationType["EXCLUDE"] = "EXCLUDE";
})(BooleanOperationType || (BooleanOperationType = {}));
/** Text casing applied to the node, default is the original casing */
var TextCase;
(function (TextCase) {
    TextCase["ORIGINAL"] = "ORIGINAL";
    TextCase["UPPER"] = "UPPER";
    TextCase["LOWER"] = "LOWER";
    TextCase["TITLE"] = "TITLE";
    TextCase["SMALL_CAPS"] = "SMALL_CAPS";
    TextCase["SMALL_CAPS_FORCED"] = "SMALL_CAPS_FORCED";
})(TextCase || (TextCase = {}));
/** Text decoration applied to the node */
var TextDecoration;
(function (TextDecoration) {
    TextDecoration["NONE"] = "NONE";
    TextDecoration["STRIKETHROUGH"] = "STRIKETHROUGH";
    TextDecoration["UNDERLINE"] = "UNDERLINE";
})(TextDecoration || (TextDecoration = {}));
/** Dimensions along which text will auto resize, default is that the text does not auto-resize. */
var TextAutoResize;
(function (TextAutoResize) {
    TextAutoResize["NONE"] = "NONE";
    TextAutoResize["HEIGHT"] = "HEIGHT";
    TextAutoResize["WIDTH_AND_HEIGHT"] = "WIDTH_AND_HEIGHT";
    TextAutoResize["TRUNCATE"] = "TRUNCATE";
})(TextAutoResize || (TextAutoResize = {}));
/** The unit of the line height value specified by the user. */
var LineHeightUnit;
(function (LineHeightUnit) {
    LineHeightUnit["PIXELS"] = "PIXELS";
    LineHeightUnit["FONT_SIZE_%"] = "FONT_SIZE_%";
    LineHeightUnit["INTRINSIC_%"] = "INTRINSIC_%";
})(LineHeightUnit || (LineHeightUnit = {}));
var ConstrainType;
(function (ConstrainType) {
    /** Scale by value */
    ConstrainType["SCALE"] = "SCALE";
    /** Scale proportionally and set width to value */
    ConstrainType["WIDTH"] = "WIDTH";
    /** Scale proportionally and set width to value */
    ConstrainType["HEIGHT"] = "HEIGHT";
})(ConstrainType || (ConstrainType = {}));
/**
 * This type is a string enum with the following possible values
 * Normal blends:
 * "PASS_THROUGH" (Only applicable to objects with children)
 * "NORMAL"
 *
 * Darken:
 * "DARKEN"
 * "MULTIPLY"
 * "LINEAR_BURN"
 * "COLOR_BURN"
 *
 * Lighten:
 * "LIGHTEN"
 * "SCREEN"
 * "LINEAR_DODGE"
 * "COLOR_DODGE"
 *
 * Contrast:
 * "OVERLAY"
 * "SOFT_LIGHT"
 * "HARD_LIGHT"
 *
 * Inversion:
 * "DIFFERENCE"
 * "EXCLUSION"
 *
 * Component:
 * "HUE"
 * "SATURATION"
 * "COLOR"
 * "LUMINOSITY"
 */
var BlendMode;
(function (BlendMode) {
    /** (Only applicable to objects with children) */
    BlendMode["PASS_THROUGH"] = "PASS_THROUGH";
    /** (Only applicable to objects with children) */
    BlendMode["NORMAL"] = "NORMAL";
    /** Darken */
    BlendMode["DARKEN"] = "DARKEN";
    BlendMode["MULTIPLY"] = "MULTIPLY";
    BlendMode["LINEAR_BURN"] = "LINEAR_BURN";
    BlendMode["COLOR_BURN"] = "COLOR_BURN";
    /** Lighten */
    BlendMode["LIGHTEN"] = "LIGHTEN";
    BlendMode["SCREEN"] = "SCREEN";
    BlendMode["LINEAR_DODGE"] = "LINEAR_DODGE";
    BlendMode["COLOR_DODGE"] = "COLOR_DODGE";
    /** Contrast */
    BlendMode["OVERLAY"] = "OVERLAY";
    BlendMode["SOFT_LIGHT"] = "SOFT_LIGHT";
    BlendMode["HARD_LIGHT"] = "HARD_LIGHT";
    /** Inversion */
    BlendMode["DIFFERENCE"] = "DIFFERENCE";
    BlendMode["EXCLUSION"] = "EXCLUSION";
    /** Component */
    BlendMode["HUE"] = "HUE";
    BlendMode["SATURATION"] = "SATURATION";
    BlendMode["COLOR"] = "COLOR";
    BlendMode["LUMINOSITY"] = "LUMINOSITY";
})(BlendMode || (BlendMode = {}));
/**
 * Enum describing animation easing curves
 * This type is a string enum with the following possible values
 * "EASE_IN": Ease in with an animation curve similar to CSS ease-in.
 * "EASE_OUT": Ease out with an animation curve similar to CSS ease-out.
 * "EASE_IN_AND_OUT": Ease in and then out with an animation curve similar to CSS ease-in-out.
 * "LINEAR": No easing, similar to CSS linear.
 */
var EasingType;
(function (EasingType) {
    /** Ease in with an animation curve similar to CSS ease-in. */
    EasingType["EASE_IN"] = "EASE_IN";
    /** Ease out with an animation curve similar to CSS ease-out. */
    EasingType["EASE_OUT"] = "EASE_OUT";
    /** Ease in and then out with an animation curve similar to CSS ease-in-out. */
    EasingType["EASE_IN_AND_OUT"] = "EASE_IN_AND_OUT";
    /** No easing, similar to CSS linear. */
    EasingType["LINEAR"] = "LINEAR";
})(EasingType || (EasingType = {}));
var LayoutConstraintVertical;
(function (LayoutConstraintVertical) {
    LayoutConstraintVertical["TOP"] = "TOP";
    LayoutConstraintVertical["BOTTOM"] = "BOTTOM";
    LayoutConstraintVertical["CENTER"] = "CENTER";
    LayoutConstraintVertical["TOP_BOTTOM"] = "TOP_BOTTOM";
    LayoutConstraintVertical["SCALE"] = "SCALE";
})(LayoutConstraintVertical || (LayoutConstraintVertical = {}));
var LayoutConstraintHorizontal;
(function (LayoutConstraintHorizontal) {
    LayoutConstraintHorizontal["LEFT"] = "LEFT";
    LayoutConstraintHorizontal["RIGHT"] = "RIGHT";
    LayoutConstraintHorizontal["CENTER"] = "CENTER";
    LayoutConstraintHorizontal["LEFT_RIGHT"] = "LEFT_RIGHT";
    LayoutConstraintHorizontal["SCALE"] = "SCALE";
})(LayoutConstraintHorizontal || (LayoutConstraintHorizontal = {}));
var LayoutAlign;
(function (LayoutAlign) {
    /** Determines if the layer should stretch along the parent’s counter axis. This property is only provided for direct children of auto-layout frames. */
    LayoutAlign["INHERIT"] = "INHERIT";
    LayoutAlign["STRETCH"] = "STRETCH";
    /** In horizontal auto-layout frames, "MIN" and "MAX" correspond to "TOP" and "BOTTOM". In vertical auto-layout frames, "MIN" and "MAX" correspond to "LEFT" and "RIGHT". */
    LayoutAlign["MIN"] = "MIN";
    LayoutAlign["CENTER"] = "CENTER";
    LayoutAlign["MAX"] = "MAX";
})(LayoutAlign || (LayoutAlign = {}));
var LayoutGridPattern;
(function (LayoutGridPattern) {
    LayoutGridPattern["COLUMNS"] = "COLUMNS";
    LayoutGridPattern["ROWS"] = "ROWS";
    LayoutGridPattern["GRID"] = "GRID";
})(LayoutGridPattern || (LayoutGridPattern = {}));
var LayoutGridAlignment;
(function (LayoutGridAlignment) {
    LayoutGridAlignment["MIN"] = "MIN";
    LayoutGridAlignment["MAX"] = "MAX";
    LayoutGridAlignment["CENTER"] = "CENTER";
})(LayoutGridAlignment || (LayoutGridAlignment = {}));
var AxisSizingMode;
(function (AxisSizingMode) {
    AxisSizingMode["FIXED"] = "FIXED";
    AxisSizingMode["AUTO"] = "AUTO";
})(AxisSizingMode || (AxisSizingMode = {}));
var EffectType;
(function (EffectType) {
    EffectType["INNER_SHADOW"] = "INNER_SHADOW";
    EffectType["DROP_SHADOW"] = "DROP_SHADOW";
    EffectType["LAYER_BLUR"] = "LAYER_BLUR";
    EffectType["BACKGROUND_BLUR"] = "BACKGROUND_BLUR";
})(EffectType || (EffectType = {}));
var PaintType;
(function (PaintType) {
    PaintType["SOLID"] = "SOLID";
    PaintType["GRADIENT_LINEAR"] = "GRADIENT_LINEAR";
    PaintType["GRADIENT_RADIAL"] = "GRADIENT_RADIAL";
    PaintType["GRADIENT_ANGULAR"] = "GRADIENT_ANGULAR";
    PaintType["GRADIENT_DIAMOND"] = "GRADIENT_DIAMOND";
    PaintType["IMAGE"] = "IMAGE";
    PaintType["EMOJI"] = "EMOJI";
    PaintType["VIDEO"] = "VIDEO";
})(PaintType || (PaintType = {}));
var PaintSolidScaleMode;
(function (PaintSolidScaleMode) {
    PaintSolidScaleMode["FILL"] = "FILL";
    PaintSolidScaleMode["FIT"] = "FIT";
    PaintSolidScaleMode["TILE"] = "TILE";
    PaintSolidScaleMode["STRETCH"] = "STRETCH";
})(PaintSolidScaleMode || (PaintSolidScaleMode = {}));
var PathWindingRule;
(function (PathWindingRule) {
    PathWindingRule["EVENODD"] = "EVENODD";
    PathWindingRule["NONZERO"] = "NONZERO";
})(PathWindingRule || (PathWindingRule = {}));
/** List types are represented as string enums with one of these possible values: ORDERED: Text is an ordered list (numbered), UNORDERED: Text is an unordered list (bulleted), NONE: Text is plain text and not part of any list */
var LineTypes;
(function (LineTypes) {
    LineTypes["ORDERED"] = "ORDERED";
    LineTypes["UNORDERED"] = "UNORDERED";
    LineTypes["NONE"] = "NONE";
})(LineTypes || (LineTypes = {}));

class BaseConverter {
    async convert(node, dom, parentNode, option) {
        dom.style = dom.style || {};
        // 位置
        dom.bounds = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        if (node.absoluteBoundingBox) {
            dom.bounds.width = node.absoluteBoundingBox.width;
            dom.bounds.height = node.absoluteBoundingBox.height;
            dom.style.width = dist.util.toPX(dom.bounds.width).toString();
            dom.style.height = dist.util.toPX(dom.bounds.height).toString();
            // 相对于父位置
            if (parentNode && parentNode.absoluteBoundingBox) {
                dom.bounds.x = node.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x;
                dom.bounds.y = node.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y;
            }
            // 没有父元素，就认为约对定位为0
            else {
                dom.bounds.x = 0;
                dom.bounds.y = 0;
            }
            dom.style.left = dist.util.toPX(dom.bounds.x).toString();
            dom.style.top = dist.util.toPX(dom.bounds.y).toString();
            dom.absoluteBoundingBox = node.absoluteBoundingBox;
        }
        // 背景色
        if (node.backgroundColor)
            dom.style.backgroundColor = dist.util.colorToString(node.backgroundColor, 255);
        if (node.cornerRadius) {
            dom.style.borderRadius = dist.util.toPX(node.cornerRadius);
        }
        // 旋转
        if (node.rotation) {
            dom.style.transform = `rotate(${dist.util.toRad(node.rotation)})`;
        }
        // padding
        for (const padding of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) {
            if (node[padding])
                dom.style[padding] = dist.util.toPX(node[padding]);
        }
        this.convertStyle(node, dom, option);
        this.convertFills(node, dom, option); // 解析fills
        this.convertStrokes(node, dom, option); // 边框
        this.convertEffects(node, dom, option); // 滤镜
        return dom;
    }
    // 转换style
    convertStyle(node, dom, option) {
        if (!node.style)
            return dom;
        if (node.style.fontFamily)
            dom.style.fontFamily = node.style.fontFamily;
        if (node.style.fontSize)
            dom.style.fontSize = dist.util.toPX(node.style.fontSize);
        if (node.style.fontWeight)
            dom.style.fontWeight = node.style.fontWeight.toString();
        if (node.style.italic)
            dom.style.fontStyle = 'italic';
        if (node.style.letterSpacing)
            dom.style.letterSpacing = dist.util.toPX(node.style.letterSpacing);
        if (node.style.lineHeightPx)
            dom.style.lineHeight = dist.util.toPX(node.style.lineHeightPx);
        if (node.style.textAlignHorizontal)
            dom.style.textAlign = node.style.textAlignHorizontal;
        if (node.style.textAlignVertical)
            dom.style.verticalAlign = node.style.textAlignVertical;
        return dom;
    }
    // 转换滤镜
    convertEffects(node, dom, option) {
        if (node.effects) {
            for (const effect of node.effects) {
                if (!effect.visible === false)
                    continue;
                switch (effect.type) {
                    case EffectType.DROP_SHADOW:
                    case EffectType.INNER_SHADOW: {
                        dom.style.filter += ` drop-shadow(${dist.util.toPX(effect.offset.x)} ${dist.util.toPX(effect.offset.y)} ${dist.util.toPX(effect.radius)} ${dist.util.colorToString(effect.color, 255)})`;
                        break;
                    }
                    case EffectType.LAYER_BLUR:
                    case EffectType.BACKGROUND_BLUR: {
                        dom.style.filter += ` blur(${dist.util.toPX(effect.radius)})`;
                        break;
                    }
                }
            }
        }
        return dom;
    }
    // 处理填充
    convertFills(node, dom, option) {
        if (node.fills) {
            for (const fill of node.fills) {
                if (fill.visible === false)
                    continue;
                switch (fill.type) {
                    case PaintType.SOLID: {
                        dom.style.backgroundColor = dist.util.colorToString(fill.color, 255);
                        break;
                    }
                    // 线性渐变
                    case PaintType.GRADIENT_LINEAR: {
                        dom.style.background = this.convertLinearGradient(fill);
                        break;
                    }
                    // 径向性渐变
                    case PaintType.GRADIENT_RADIAL: {
                        dom.style.background = this.convertRadialGradient(fill);
                        break;
                    }
                    // 图片
                    case PaintType.IMAGE: {
                        if (option && option.images) {
                            const img = option.images[fill.imageRef];
                            if (img) {
                                if (dom.type === 'img') {
                                    dom.url = img;
                                }
                                else {
                                    dom.style.backgroundImage = `url(${img})`;
                                }
                            }
                            dom.backgroundImageUrl = img || fill.imageRef;
                        }
                        switch (fill.scaleMode) {
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
                        break;
                    }
                }
            }
        }
        return dom;
    }
    // 处理边框
    convertStrokes(node, dom, option) {
        if (node.strokes && node.strokes.length) {
            for (const stroke of node.strokes) {
                if (stroke.visible === false)
                    continue;
                if (stroke.color)
                    dom.style.borderColor = dist.util.colorToString(stroke.color, 255);
                switch (stroke.type) {
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
                        if (option && option.images) {
                            const img = option.images[stroke.imageRef];
                            if (img)
                                dom.style.borderImage = `url(${img})`;
                        }
                        switch (stroke.scaleMode) {
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
            if (node.strokeWeight)
                dom.style.borderWidth = dom.style.borderImageWidth = dist.util.toPX(node.strokeWeight);
        }
        return dom;
    }
    // 转换线性渐变
    convertLinearGradient(gradient) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        // console.log(handlePositions);
        const linearGradient = `linear-gradient(${this.getGradientDirection(handlePositions)}, ${this.getGradientStops(gradientStops)})`;
        return linearGradient;
    }
    // 转换径向性渐变
    convertRadialGradient(gradient) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        // console.log(handlePositions);
        const radialGradient = `radial-gradient(${this.getRadialGradientPosition(handlePositions)}, ${this.getGradientStops(gradientStops)})`;
        return radialGradient;
    }
    // 径向性位置
    getRadialGradientPosition(gradientHandlePositions) {
        if (!gradientHandlePositions || !gradientHandlePositions.length)
            return 'center';
        return `farthest-corner at ${dist.util.toPX(gradientHandlePositions[0].x)} ${dist.util.toPX(gradientHandlePositions[0].y)}`;
    }
    // Helper function to get the gradient direction
    getGradientDirection(gradientHandlePositions) {
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
        }
        else {
            console.error("Insufficient handle positions for gradient calculation.");
            return ""; // or any default value
        }
    }
    // Helper function to get the gradient stops
    getGradientStops(gradientStops) {
        // Constructing the gradient stops string based on received data
        const stopsString = gradientStops
            .map((stop) => dist.util.colorToString(stop.color, 255) + ` ${stop.position * 100}%`)
            .join(", ");
        return stopsString;
    }
}

class DocumentConverter extends BaseConverter {
    async convert(node, dom, parentNode, option) {
        dom.type = 'div';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, option);
    }
}

class PageConverter extends BaseConverter {
    async convert(node, dom, parentNode, option) {
        dom.type = 'page';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, option);
    }
}

let FRAMEConverter$2 = class FRAMEConverter extends BaseConverter {
    async convert(node, dom, parentNode, option) {
        if (parentNode && parentNode.type === 'CANVAS') {
            dom.style.overflow = 'hidden';
            if (parentNode && !parentNode.absoluteBoundingBox) {
                // 如果是一级节点，则下面的节点都相对于它
                parentNode.absoluteBoundingBox = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                // 取最左顶点角
                if (parentNode.children && parentNode.children.length) {
                    for (const child of parentNode.children) {
                        if (child.absoluteBoundingBox) {
                            parentNode.absoluteBoundingBox.x = Math.min(parentNode.absoluteBoundingBox.x, child.absoluteBoundingBox.x);
                            parentNode.absoluteBoundingBox.y = Math.min(parentNode.absoluteBoundingBox.y, child.absoluteBoundingBox.y);
                        }
                    }
                }
            }
        }
        return super.convert(node, dom, parentNode, option);
    }
};

class TEXTConverter extends BaseConverter {
    async convert(node, dom, parentNode, option) {
        dom.type = 'span';
        if (node.characters)
            dom.text = node.characters;
        const res = await super.convert(node, dom, parentNode, option);
        res.style.width = 'auto'; // text没必要指定宽度
        return res;
    }
    // 处理填充, 文本的fill就是字体的颜色
    convertFills(node, dom) {
        if (node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch (fill.type) {
                case PaintType.SOLID: {
                    dom.style.color = dist.util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case PaintType.GRADIENT_LINEAR: {
                    dom.style.background = this.convertLinearGradient(fill);
                    dom.style.backgroundClip = 'text';
                    break;
                }
                // 径向性渐变
                case PaintType.GRADIENT_RADIAL: {
                    dom.style.background = this.convertRadialGradient(fill);
                    dom.style.backgroundClip = 'text';
                    break;
                }
            }
        }
        return dom;
    }
}

let FRAMEConverter$1 = class FRAMEConverter extends BaseConverter {
    async convert(node, dom, parentNode, option) {
        dom.type = 'svg';
        let ellipse = {
            type: 'ellipse',
            style: {},
            children: [],
        };
        // svg外转用定位和大小，其它样式都给子元素
        ellipse = await super.convert(node, ellipse, parentNode, option);
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
};

class FRAMEConverter extends BaseConverter {
    async convert(node, dom, parentNode, option) {
        // 如果是填充的图5片，则直接用img
        if (node.fills && node.fills.length && node.fills[0].type === 'IMAGE') {
            dom.type = 'img';
        }
        return super.convert(node, dom, parentNode, option);
    }
}

const frameConverter = new FRAMEConverter$2();
const ConverterMaps = {
    'BASE': new BaseConverter(),
    'FRAME': frameConverter,
    'GROUP': frameConverter,
    'TEXT': new TEXTConverter(),
    'DOCUMENT': new DocumentConverter(),
    'CANVAS': new PageConverter(),
    'ELLIPSE': new FRAMEConverter$1(),
    'RECTANGLE': new FRAMEConverter(),
};
// 转node为html结构对象
async function convert(node, parentNode, option) {
    // 如果是根，则返回document
    if (node.document) {
        const docDom = await convert(node.document, node, option);
        return docDom;
    }
    const dom = {
        id: node.id,
        name: node.name,
        visible: node.visible === false ? false : true,
        type: 'div',
        style: {
            // 默认采用绝对定位
            position: 'absolute',
        },
        children: [],
        figmaData: node,
    };
    const converter = ConverterMaps[node.type] || ConverterMaps.BASE;
    if (converter)
        await converter.convert(node, dom, parentNode, option);
    if (node.children && node.children.length) {
        for (const child of node.children) {
            const c = await convert(child, node, option);
            dom.children.push(c);
        }
    }
    return dom;
}
// 把figma数据转为dom对象
async function nodeToDom(node, option) {
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
        case 'ellipse': {
            return await renderEllipse(node, option);
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
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); // 创建SVG元素
    await renderElement(node, option, svg);
    svg.setAttribute('width', node.bounds.width + '');
    svg.setAttribute('height', node.bounds.height + '');
    return svg;
}
async function renderEllipse(node, option) {
    const ellipse = await renderElement(node, option);
    ellipse.setAttribute('cx', node.bounds.width / 2 + '');
    ellipse.setAttribute('cy', node.bounds.height / 2 + '');
    ellipse.setAttribute('rx', node.bounds.width / 2 + '');
    ellipse.setAttribute('ry', node.bounds.height / 2 + '');
    ellipse.setAttribute('fill', node.style.background || node.style.backgroundColor);
    return ellipse;
}
async function renderElement(node, option, dom) {
    dom = dom || document.createElement(node.type);
    if (node.style) {
        Object.assign(dom.style, node.style);
    }
    if (node.text) {
        dom.textContent = node.text;
    }
    // @ts-ignore
    if (node.type === 'img' && node.url)
        dom.src = node.url;
    if (node.visible === false)
        dom.style.display = 'none';
    if (node.name)
        dom.setAttribute('data-name', node.name);
    if (node.id)
        dom.setAttribute('data-id', node.id);
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

/**
 * 获取figma文件
 * @param fileId
 * @param token
 */
async function loadFigmaFile(fileId, token) {
    const url = `https://api.figma.com/v1/files/${fileId}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await dist.util.request(url, option);
    return JSON.parse(data);
}
// 获取文件所有图片
async function getFigmaFileImages(fileId, token) {
    const url = `https://api.figma.com/v1/files/${fileId}/images`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await dist.util.request(url, option);
    const images = JSON.parse(data);
    if (images.meta && images.meta.images)
        return images.meta.images;
    return {};
}
// 获取图片
async function getFigmaImage(key, token, ids) {
    const url = `https://api.figma.com/v1/images/${key}?ids=${encodeURIComponent(ids)}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    const data = await dist.util.request(url, option);
    const images = JSON.parse(data);
    if (images.meta && images.meta.images)
        return images.meta.images;
    return images;
}

var util$1 = dist.util;
export { convert, convert as default, getFigmaFileImages, getFigmaImage, loadFigmaFile, nodeToDom, util$1 as util };
