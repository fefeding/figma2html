var util = {
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
     * 把数值转换成指定区间的值 ，  比如-1到1之间的值转换成 0-1之间的值： toNumberRange(-1, -1,1,0,1);
     * @param v 原数值
     * @param sMin 原数值下限
     * @param sMax 原数值上限
     * @param dMin 目标区间下限
     * @param dMax 目标区间上限
     */
    toNumberRange(v, sMin, sMax, dMin, dMax) {
        const p = (v - sMin) / (sMax - sMin);
        const r = p * (dMax - dMin) + dMin;
        return r;
    },
    /**
     * 把rgba颜色转为rgba()串型式
     * multiple倍数，如果是小数，则需要*255转到标准值
     */
    colorToString(color, multiple = 1) {
        let str = `${this.toMultipleInt(color.r, multiple)},${this.toMultipleInt(color.g, multiple)},${this.toMultipleInt(color.b, multiple)}`;
        if (typeof color.a !== 'undefined') {
            str = `rgba(${str},${color.a})`;
        }
        else {
            str = `rgb(${str})`;
        }
        return str;
    },
    /**
     * 创建dom元素
     * @param tag 标签名
     */
    createElement(tag, option) {
        // svg标签创建
        if (['svg', 'defs', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'g', 'path', 'polygon', 'stop', 'text', 'mask', 'linearGradient', 'radialGradient', 'filter', 'feOffset', 'feBlend'].includes(tag)) {
            return document.createElementNS("http://www.w3.org/2000/svg", tag, option); // 创建SVG元素
        }
        return document.createElement(tag, option);
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
     * 检测是否支持某字体
     * @param family 字体名
     */
    checkFont(family) {
        if (!family)
            return false;
        const baseFont = 'Arial';
        if (baseFont.toLowerCase() === family.toLowerCase())
            return true;
        const txt = "a";
        const fontSize = 100;
        const w = 100, h = 100; // 宽高
        const cvs = document.createElement('canvas');
        const ctx = cvs.getContext('2d', {
            willReadFrequently: true
        });
        cvs.width = w;
        cvs.height = h;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        const check = function (ctx, family, w, h) {
            ctx.clearRect(0, 0, w, h);
            ctx.font = fontSize + "px" + family + ", " + baseFont;
            ctx.fillText(txt, w / 2, h / 2);
            const data = ctx.getImageData(0, 0, w, h).data;
            return [].slice.call(data).filter((p) => p != 0);
        };
        const supported = check(ctx, baseFont, w, h).join("") !== check(ctx, family, w, h).join("");
        return supported;
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
     * 获取二点在标准坐标系中的的弧度, 返回值为 0 ~ Math.PI*2
     * @param start
     * @param end
     */
    getPointCoordRotation(start, end) {
        const dy = end.y - start.y;
        const dx = end.x - start.x;
        if (dx === 0) {
            if (dy > 0)
                return Math.PI + Math.PI / 2;
            else if (dy < 0)
                return Math.PI / 2;
            else
                return 0;
        }
        else if (dy === 0) {
            if (dx > 0)
                return 0;
            else if (dx < 0)
                return Math.PI;
            else
                return 0;
        }
        const r = Math.atan2(dy, dx);
        return r <= 0 ? Math.abs(r) : (Math.PI * 2 - r);
    },
    /**
     * 把图片旋转一定角度，返回base64
     * @param url
     * @param rotation
     * @returns
     */
    async rotateImage(url, rotation, quality, type = 'image/png') {
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
                // 如果角度为0，则只是转为了base64
                if (rotation) {
                    ctx.translate(cvs.width / 2, cvs.height / 2);
                    ctx.rotate(rotation);
                    ctx.translate(-cvs.width / 2, -cvs.height / 2);
                }
                ctx.drawImage(img, 0, 0);
                const data = cvs.toDataURL(type, quality);
                resolve(data);
            };
            img.onerror = function (e) {
                reject && reject(e);
            };
            img.src = url;
        });
    },
    /**
     * 把图片转为bae64
     * @param url 图片地址
     * @returns
     */
    async image2Base64(url, quality, type = 'image/png') {
        const base64 = await this.rotateImage(url, 0, quality, type);
        return base64;
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
    },
    // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    requestAnimationFrame(callback, win) {
        let fun = win && win.requestAnimationFrame ? win.requestAnimationFrame : (typeof window !== 'undefined' && window.requestAnimationFrame ? window.requestAnimationFrame : setTimeout);
        return fun(callback, 20);
    },
    cancelAnimationFrame(handler, win) {
        let fun = win && win.cancelAnimationFrame ? win.cancelAnimationFrame : (typeof window !== 'undefined' && window.cancelAnimationFrame ? window.cancelAnimationFrame : clearTimeout);
        return fun(handler);
    }
};

var eventemitter3 = {exports: {}};

(function (module) {

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }

	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;

	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];

	  return emitter;
	}

	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return names;

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Array} The registered listeners.
	 * @public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];

	  if (!handlers) return [];
	  if (handlers.fn) return [handlers.fn];

	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }

	  return ee;
	};

	/**
	 * Return the number of listeners listening to a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Number} The number of listeners.
	 * @public
	 */
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];

	  if (!listeners) return 0;
	  if (listeners.fn) return 1;
	  return listeners.length;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {*} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return this;
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else clearEvent(this, evt);
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {(String|Symbol)} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) clearEvent(this, evt);
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	{
	  module.exports = EventEmitter;
	} 
} (eventemitter3));

/**
 * 滤镜数据
 */
class FilterData {
    /**
     * 名称
     */
    name;
    /**
     * 中文名
     */
    displayName;
    /**
     * 配置值
     */
    option;
}
class BaseFilterOption {
    constructor(option) {
        if (option) {
            if (typeof option === 'string' || typeof option === 'number') {
                this.value = option;
            }
            else {
                this.value = option.value;
            }
        }
    }
    value;
    toString() {
        return this.value.toString();
    }
    toJSON() {
        return {
            value: this.value
        };
    }
    clone() {
        const obj = new BaseFilterOption();
        // @ts-ignore
        if (this.value && this.value.clone)
            obj.value = this.value.clone();
        else
            obj.value = this.value;
        return obj;
    }
}
class ShadowFilterOptionValue {
    constructor(data) {
        if (data) {
            this.x = data.x;
            this.y = data.y;
            this.blur = data.blur;
            this.color = data.color;
        }
    }
    x;
    y;
    blur;
    color;
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            blur: this.blur || '',
            color: this.color || ''
        };
    }
    toString() {
        return `${this.x} ${this.y} ${this.blur || 0} ${this.color || '#000'}`;
    }
    clone() {
        return new ShadowFilterOptionValue(this);
    }
}
class ShadowFilterOption extends BaseFilterOption {
    constructor(option) {
        super();
        if (option) {
            // @ts-ignore
            if (option instanceof ShadowFilterOption || option.value)
                this.value = new ShadowFilterOptionValue(option.value);
            else
                this.value = new ShadowFilterOptionValue(option);
        }
    }
    toString() {
        return this.value.toString();
    }
}

class Filter {
    constructor(option) {
        if (option) {
            if (option instanceof FilterData) {
                this.name = option.name;
                this.displayName = option.displayName;
                option = option.option;
            }
            if (option instanceof BaseFilterOption) {
                this.option = option;
            }
            else if (typeof option === 'object') {
                this.option = new BaseFilterOption(option);
            }
        }
    }
    name;
    displayName;
    /**
    * 配置值
    */
    option;
    /**
     * 创建同类型的滤镜
     * @param option 滤镜参数
     * @returns
     */
    create(option = this.option, name = this.name, displayName = this.displayName, filterType = Filter) {
        const data = new FilterData();
        data.name = name;
        data.displayName = displayName;
        // @ts-ignore
        data.option = option.clone ? option.clone() : option;
        const obj = new filterType(data);
        return obj;
    }
    // 转成json
    toJSON() {
        return {
            name: this.name || '',
            displayName: this.displayName || '',
            option: this.option.toJSON()
        };
    }
    toString() {
        if (!this.name)
            return '';
        return `${this.name}(${this.option.toString()})`;
    }
}
/**
 * 反色滤镜
 */
class InvertFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: 1 }, option);
        super(option);
    }
    name = 'invert';
    displayName = '反色';
}
/**
 * 模糊滤镜 value: 4px
 */
class BlurFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: '4px' }, option);
        super(option);
    }
    name = 'blur';
    displayName = '模糊';
}
/**
 * 亮度滤镜 value: 0-1
 */
class BrightnessFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: 2 }, option);
        super(option);
    }
    name = 'brightness';
    displayName = '亮度';
}
/**
 * 灰度滤镜 value: 0-1
 */
class GrayscaleFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: 1 }, option);
        super(option);
    }
    name = 'grayscale';
    displayName = '灰度';
}
/**
 * 复古滤镜 value: 0-1
 */
class SepiaFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: 1 }, option);
        super(option);
    }
    name = 'sepia';
    displayName = '复古';
}
/**
 * 旋转滤镜 value: 0-360deg 角度 或 弧度 0-2*Math.PI rad
 */
class HueRotateFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: '240deg' }, option);
        super(option);
    }
    name = 'hue-rotate';
    displayName = '旋转';
}
/**
 * 透明度 value: 0-1
 */
class OpacityFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: 0.8 }, option);
        super(option);
    }
    name = 'opacity';
    displayName = '透明度';
}
/**
 * 阴影滤镜
 */
class DropShadowFilter extends Filter {
    constructor(option) {
        if (!option)
            option = new ShadowFilterOption();
        option.value = new ShadowFilterOptionValue(option.value || {
            x: '0',
            y: '0',
            blur: '4px',
            color: '#000'
        });
        super(option);
    }
    name = 'drop-shadow';
    displayName = '阴影';
    /**
      * 创建同类型的滤镜
      * @param option 滤镜参数
      * @returns
      */
    create(option = this.option, name = this.name, displayName = this.displayName) {
        const data = new ShadowFilterOption(option);
        const obj = new DropShadowFilter(data);
        obj.name = name;
        obj.displayName = displayName;
        return obj;
    }
}
/**
 * 对比度滤镜  value: 2
 */
class ContrastFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: 2 }, option);
        super(option);
    }
    name = 'contrast';
    displayName = '对比度';
}
/**
 * 饱和度 0-无穷 ,一般取0-1
 */
class SaturateFilter extends Filter {
    constructor(option) {
        option = Object.assign({ value: 3 }, option);
        super(option);
    }
    name = 'saturate';
    displayName = '饱和度';
}
const filters = {
    /**
     * 反色滤镜
     */
    invert: new InvertFilter(),
    /**
     * 模糊滤镜 value: 4px
     */
    blur: new BlurFilter(),
    /**
     * 亮度滤镜 value: 0-1
     */
    brightness: new BrightnessFilter(),
    /**
     * 灰度滤镜 value: 0-1
     */
    grayscale: new GrayscaleFilter(),
    /**
     * 复古滤镜 value: 0-1
     */
    sepia: new SepiaFilter(),
    /**
     * 旋转滤镜
     */
    hueRotate: new HueRotateFilter(),
    /**
     * 阴影
     */
    dropShadow: new DropShadowFilter(),
    /**
     * 透明度
     */
    opacity: new OpacityFilter(),
    /**
     * 对比度
     */
    contrast: new ContrastFilter(),
    /**
     * 饱和度 0-无穷 ,一般取0-1
     */
    saturate: new SaturateFilter(),
};
// 获取fiter实例对象
function get(name) {
    if (!name)
        return null;
    if (filters[name])
        return filters[name];
    for (const key in filters) {
        const filter = filters[key];
        if (filter instanceof Filter && filter.name === name) {
            return filter;
        }
    }
    return null;
}

class CSSFilters {
    constructor(target, filters) {
        if (target)
            this.target = target;
        if (filters && filters.length) {
            this.add(filters);
        }
    }
    // 所有支持的滤镜
    filters = new Array();
    /**
     * 绑定的dom否元素对象
     */
    target;
    /**
     * 当前滤镜个数
     */
    get count() {
        return this.filters.length;
    }
    /**
     * 根据滤镜名获取滤镜对象
     * @param name
     * @returns
     */
    get(name) {
        for (const f of this.filters) {
            if (f.name === name)
                return f;
        }
    }
    clear() {
        this.filters.splice(0, this.filters.length);
    }
    /**
     * 添加滤镜
     * @param filter
     */
    add(filter, option) {
        if (Array.isArray(filter)) {
            for (const f of filter) {
                this.add(f, option);
            }
            return;
        }
        else if (typeof filter === 'string') {
            const filterObj = get(filter);
            if (!filterObj) {
                console.error(`${filter}不存在`);
                return;
            }
            filter = filterObj.create(option || filterObj.option);
            return this.add(filter);
        }
        /*if(filter.name) {
            const existsFilter = this.get(filter.name);
            if(existsFilter) {
                console.error(`${filter.displayName || filter.name}已经存在滤镜集合中，不能重复`);
                return existsFilter;
            }
        }*/
        if (filter instanceof Filter) {
            this.filters.push(filter);
            this.apply();
            return filter;
        }
        else if (filter.name) {
            return this.add(filter.name, filter.option);
        }
    }
    /**
     * 移除滤镜
     * @param filter
     */
    remove(filter) {
        if (Array.isArray(filter)) {
            for (const f of filter)
                this.remove(f);
        }
        else {
            for (let i = this.filters.length - 1; i >= 0; i--) {
                if ((typeof filter === 'string' && this.filters[i].name === filter) || this.filters[i] === filter) {
                    this.filters.splice(i, 1);
                }
            }
        }
        this.apply();
    }
    toJSON() {
        const res = [];
        if (this.count) {
            for (const f of this.filters) {
                res.push(f.toJSON());
            }
        }
        return res;
    }
    toString() {
        const res = [];
        for (const f of this.filters) {
            const r = f.toString();
            if (r)
                res.push(r);
        }
        if (res.length)
            return res.join(' ');
        return '';
    }
    /**
     * 生效
     * @param target
     */
    apply(target = this.target) {
        if (target && target.style)
            target.style.filter = this.toString();
    }
}

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
var MaskType;
(function (MaskType) {
    MaskType["ALPHA"] = "ALPHA";
    MaskType["VECTOR"] = "VECTOR";
    MaskType["LUMINANCE"] = "LUMINANCE"; //the luminance value of each pixel of the mask node will be used to determine the opacity of that pixel in the masked result.
})(MaskType || (MaskType = {}));
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
    PaintSolidScaleMode["CROP"] = "CROP";
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
    async convert(node, dom, parentNode, page, option, container) {
        dom.style = dom.style || {};
        // 位置
        dom.bounds = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const sourceBox = node.absoluteBoundingBox || node.absoluteRenderBounds || this.getNodeAbsoluteBoundingBox(node);
        if (sourceBox) {
            if (!node.absoluteBoundingBox) {
                node.absoluteBoundingBox = {
                    ...sourceBox
                };
            }
            const box = {
                ...sourceBox
            };
            // dom 上保留原值
            dom.absoluteBoundingBox = {
                ...box
            };
            const center = {
                x: box.x + box.width / 2,
                y: box.y + box.height / 2
            };
            const parentRotation = parentNode.rotation;
            const parentHasRotation = parentRotation && Math.abs(parentRotation) > 0.0001;
            // 旋转（忽略极小的旋转值，如浮点误差）
            if (node.rotation && Math.abs(node.rotation) > 0.0001) {
                dom.data.rotation = node.rotation;
                dom.transform.rotateZ = node.rotation;
                dom.style.transform = `rotate(${util.toRad(node.rotation)})`;
                // 优先使用 Figma 提供的局部尺寸，避免 90° 等角度反推失真
                if (node.size && util.isNumber(node.size.x) && util.isNumber(node.size.y)) {
                    box.width = node.size.x;
                    box.height = node.size.y;
                    box.x = center.x - box.width / 2;
                    box.y = center.y - box.height / 2;
                }
                else {
                    const size = this.calculateOriginalRectangleDimensions(dom.data.rotation, box.width, box.height);
                    if (Number.isFinite(size.width) && Number.isFinite(size.height) && size.width > 0 && size.height > 0) {
                        box.width = size.width;
                        box.height = size.height;
                        box.x = center.x - size.width / 2;
                        box.y = center.y - size.height / 2;
                    }
                }
            }
            // 父级有旋转时，absoluteBoundingBox 是全局包围盒，尺寸应回退到节点局部 size
            if (parentHasRotation && node.size && util.isNumber(node.size.x) && util.isNumber(node.size.y)) {
                box.width = node.size.x;
                box.height = node.size.y;
            }
            if (dom.type === 'text' && box.height < node.style?.lineHeightPx)
                box.height = node.style.lineHeightPx;
            dom.bounds.width = box.width;
            dom.bounds.height = box.height;
            // ========== 智能定位策略 ==========
            // 核心原则：正确识别 Auto Layout，优先使用 Flexbox 布局
            // 检查父节点是否有Auto Layout
            const parentLayoutMode = parentNode ? parentNode.layoutMode : undefined;
            const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
            // 检查当前节点是否显式设置为绝对定位
            const isExplicitAbsolute = node.layoutPositioning === 'ABSOLUTE';
            // 核心判断：是否参与Auto Layout（作为 Flex Item）
            const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
            // 检查父元素是否有旋转（已在上方计算）
            // 定位逻辑
            if (participatesInAutoLayout) {
                // ========== 参与 Auto Layout (Flex Item) ==========
                dom.data.left = dom.bounds.x = 0;
                dom.data.top = dom.bounds.y = 0;
                dom.style.position = 'relative';
                dom.style.flexShrink = '0';
                // 清除可能的定位属性，让 Flexbox 决定位置
                delete dom.style.left;
                delete dom.style.top;
            }
            else if (parentNode && parentNode.absoluteBoundingBox) {
                // ========== 绝对定位 (相对于父节点) ==========
                dom.style.position = 'absolute';
                if (parentHasRotation && isExplicitAbsolute) {
                    // 处理父节点旋转时的绝对定位
                    const parentCenter = {
                        x: parentNode.absoluteBoundingBox.x + parentNode.absoluteBoundingBox.width / 2,
                        y: parentNode.absoluteBoundingBox.y + parentNode.absoluteBoundingBox.height / 2
                    };
                    const childCenter = {
                        x: box.x + box.width / 2,
                        y: box.y + box.height / 2
                    };
                    const offsetX = childCenter.x - parentCenter.x;
                    const offsetY = childCenter.y - parentCenter.y;
                    const cos = Math.cos(-parentRotation);
                    const sin = Math.sin(-parentRotation);
                    const rotatedX = offsetX * cos - offsetY * sin;
                    const rotatedY = offsetX * sin + offsetY * cos;
                    dom.data.left = dom.bounds.x = rotatedX - box.width / 2 + parentNode.absoluteBoundingBox.width / 2;
                    dom.data.top = dom.bounds.y = rotatedY - box.height / 2 + parentNode.absoluteBoundingBox.height / 2;
                }
                else if (node.relativeTransform) {
                    // 优先使用 relativeTransform [ [1, 0, x], [0, 1, y] ]
                    dom.data.left = dom.bounds.x = node.relativeTransform[0][2];
                    dom.data.top = dom.bounds.y = node.relativeTransform[1][2];
                }
                else {
                    // 回退到 absoluteBoundingBox 差值计算
                    dom.data.left = dom.bounds.x = box.x - parentNode.absoluteBoundingBox.x;
                    dom.data.top = dom.bounds.y = box.y - parentNode.absoluteBoundingBox.y;
                }
            }
            else if (page && page.absoluteBoundingBox) {
                // ========== 相对于页面的定位 (顶级节点) ==========
                dom.data.left = dom.bounds.x = box.x - page.absoluteBoundingBox.x;
                dom.data.top = dom.bounds.y = box.y - page.absoluteBoundingBox.y;
                dom.style.position = 'absolute';
            }
            else {
                // ========== 无父节点 ==========
                dom.data.left = dom.bounds.x = 0;
                dom.data.top = dom.bounds.y = 0;
                dom.style.position = 'relative';
            }
        }
        // 背景色
        if (node.backgroundColor)
            dom.style.backgroundColor = util.colorToString(node.backgroundColor, 255);
        if (node.cornerRadius) {
            dom.style.borderRadius = util.toPX(node.cornerRadius);
        }
        else if (node.rectangleCornerRadii) {
            dom.style.borderRadius = node.rectangleCornerRadii.map(p => util.toPX(p)).join(' ');
        }
        if (node.opacity)
            dom.style.opacity = node.opacity.toString();
        if (node.constraints) {
            if (node.constraints.vertical) {
                dom.style.verticalAlign = { 'CENTER': 'middle', 'TOP_BOTTOM': 'super', 'SCALE': 'center' }[node.constraints.vertical];
            }
            if (node.constraints.horizontal) {
                dom.style.textAlign = { 'SCALE': 'center', 'LEFT_RIGHT': 'justify-all' }[node.constraints.vertical];
            }
        }
        dom.style.transformOrigin = 'center center';
        // 裁剪超出区域
        if (node.clipsContent === true || (parentNode && parentNode.clipsContent === true))
            dom.style.overflow = 'hidden';
        // 是否保持宽高比
        dom.preserveRatio = node.preserveRatio;
        // padding
        if (dom.type !== 'svg') {
            for (const padding of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) {
                const v = node[padding];
                if (v) {
                    dom.style[padding] = util.toPX(v);
                }
            }
        }
        // Auto Layout 支持
        // @ts-ignore
        if (node.layoutMode && node.layoutMode !== 'NONE') {
            dom.style.display = 'flex';
            // 布局方向
            // @ts-ignore
            if (node.layoutMode === 'HORIZONTAL') {
                dom.style.flexDirection = 'row';
                // @ts-ignore
            }
            else if (node.layoutMode === 'VERTICAL') {
                dom.style.flexDirection = 'column';
            }
            // 主轴对齐
            // @ts-ignore
            if (node.primaryAxisAlignItems) {
                // @ts-ignore
                switch (node.primaryAxisAlignItems) {
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
            if (node.counterAxisAlignItems) {
                // @ts-ignore
                switch (node.counterAxisAlignItems) {
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
            if (node.itemSpacing) {
                // @ts-ignore
                dom.style.gap = util.toPX(node.itemSpacing);
            }
        }
        await this.convertStyle(node, dom, option, container);
        await this.convertFills(node, dom, option, container); // 解析fills
        await this.convertStrokes(node, dom, option, container); // 边框
        await this.convertEffects(node, dom, option, container); // 滤镜
        dom.data.left = dom.bounds.x;
        dom.data.top = dom.bounds.y;
        dom.data.width = dom.bounds.width;
        dom.data.height = dom.bounds.height;
        // 只有绝对定位时才设置left/top
        // 参与Auto Layout的元素（position: relative）不需要left/top
        if (dom.style.position === 'absolute') {
            dom.style.left = util.toPX(dom.bounds.x).toString();
            dom.style.top = util.toPX(dom.bounds.y).toString();
        }
        dom.style.width = util.toPX(dom.bounds.width).toString();
        dom.style.height = util.toPX(dom.bounds.height).toString();
        // 处理混合模式
        if (node.blendMode) {
            const cssBlendMode = this.convertBlendMode(node.blendMode);
            if (cssBlendMode) {
                dom.style.mixBlendMode = cssBlendMode;
            }
        }
        return dom;
    }
    getNodeAbsoluteBoundingBox(node) {
        const directBox = node.absoluteBoundingBox || node.absoluteRenderBounds;
        if (directBox) {
            return {
                ...directBox
            };
        }
        if (!node.children || !node.children.length)
            return null;
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const child of node.children) {
            if (!child || child.visible === false)
                continue;
            const childBox = this.getNodeAbsoluteBoundingBox(child);
            if (!childBox)
                continue;
            minX = Math.min(minX, childBox.x);
            minY = Math.min(minY, childBox.y);
            maxX = Math.max(maxX, childBox.x + childBox.width);
            maxY = Math.max(maxY, childBox.y + childBox.height);
        }
        if (!Number.isFinite(minX) || !Number.isFinite(minY) || !Number.isFinite(maxX) || !Number.isFinite(maxY)) {
            return null;
        }
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    }
    // 生成节点对象
    createDomNode(type, option) {
        const dom = {
            data: {},
            attributes: {},
            children: [],
            ...option,
            style: {
                boxSizing: 'border-box',
                ...option?.style,
            },
            filters: new Array,
            transform: {},
            type: type,
        };
        return dom;
    }
    // 转换style
    async convertStyle(node, dom, option, container) {
        // @ts-ignore - BOOLEAN_OPERATION 继承 VECTOR 的样式，应该处理
        const style = node.style || node;
        if (!style)
            return dom;
        if (style.fontFamily)
            dom.style.fontFamily = style.fontFamily;
        if (style.fontSize)
            dom.style.fontSize = util.toPX(style.fontSize);
        if (style.fontWeight)
            dom.style.fontWeight = style.fontWeight.toString();
        if (style.italic)
            dom.style.fontStyle = 'italic';
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
    async convertEffects(node, dom, option, container) {
        if (!node.isMaskOutline && node.effects) {
            //dom.style.filter = dom.style.filter || '';
            for (const effect of node.effects) {
                if (effect.visible === false)
                    continue;
                switch (effect.type) {
                    case EffectType.INNER_SHADOW:
                    case EffectType.DROP_SHADOW: {
                        //dom.style.filter += ` drop-shadow(${util.toPX(effect.offset.x)} ${util.toPX(effect.offset.y)} ${util.toPX(effect.radius)} ${util.colorToString(effect.color, 255)})`;
                        // 如果 有spread，则加到盒子上
                        if (effect.spread || effect.type === EffectType.INNER_SHADOW) {
                            dom.style.boxShadow = `${util.toPX(effect.offset.x)} ${util.toPX(effect.offset.y)} ${util.toPX(effect.radius)}  ${util.toPX(effect.spread || 0)} ${util.colorToString(effect.color, 255)} ${effect.type === EffectType.INNER_SHADOW ? 'inset' : ''}`;
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
                    case EffectType.BACKGROUND_BLUR: {
                        break;
                    }
                }
            }
        }
        return dom;
    }
    // 处理填充
    async convertFills(node, dom, option, container) {
        if (node.isMaskOutline || !node.fills)
            return dom;
        const visibleFills = node.fills.filter(fill => fill.visible !== false);
        if (!visibleFills.length)
            return dom;
        const backgroundLayers = [];
        const backgroundSizes = [];
        const backgroundRepeats = [];
        const backgroundBlendModes = [];
        for (const fill of visibleFills) {
            let backgroundLayer = '';
            const fillConfig = this.getFillBackgroundConfig(fill);
            switch (fill.type) {
                case PaintType.SOLID: {
                    const color = {
                        ...fill.color,
                        a: typeof fill.opacity !== 'undefined' ? fill.opacity : fill.color.a,
                    };
                    const colorString = util.colorToString(color, 255);
                    if (visibleFills.length > 1 && dom.type !== 'img') {
                        backgroundLayer = `linear-gradient(${colorString}, ${colorString})`;
                    }
                    else {
                        dom.style.backgroundColor = colorString;
                    }
                    break;
                }
                case PaintType.GRADIENT_LINEAR: {
                    backgroundLayer = this.convertLinearGradient(fill, dom, container);
                    break;
                }
                case PaintType.GRADIENT_DIAMOND:
                case PaintType.GRADIENT_ANGULAR:
                case PaintType.GRADIENT_RADIAL: {
                    backgroundLayer = this.convertRadialGradient(fill, dom, container);
                    break;
                }
                case PaintType.IMAGE: {
                    if (option && option.getImage) {
                        const img = await option.getImage(fill.imageRef);
                        dom.backgroundImageUrl = img || fill.imageRef;
                        if (img) {
                            if (dom.type === 'img') {
                                dom.url = img;
                            }
                            else {
                                backgroundLayer = `url(${img})`;
                            }
                        }
                    }
                    break;
                }
            }
            if (fill.scaleMode) {
                dom.data.imageSizeMode = fillConfig.mode;
            }
            if (backgroundLayer && dom.type !== 'img') {
                backgroundLayers.push(backgroundLayer);
                backgroundSizes.push(fillConfig.size);
                backgroundRepeats.push(fillConfig.repeat);
                backgroundBlendModes.push(fill.blendMode ? this.convertBlendMode(fill.blendMode) : 'normal');
            }
            if (dom && fill.imageTransform && fill.scaleMode === PaintSolidScaleMode.STRETCH) {
                if (!dom.transform)
                    dom.transform = {};
                const [[a, c, e], [b, d, f]] = fill.imageTransform;
                dom.transform.translateX = util.toPX(e);
                dom.transform.translateY = util.toPX(f);
                const rotation = Math.atan2(b, a);
                dom.transform.rotateZ = rotation;
                dom.preserveRatio = true;
            }
            if (fill.filters) {
                if (fill.filters.contrast) {
                    const v = util.toNumberRange(fill.filters.contrast, -1, 1, 0.5, 1);
                    dom.filters.push(new ContrastFilter({
                        value: v
                    }));
                }
                if (fill.filters.exposure) {
                    const v = util.toNumberRange(fill.filters.exposure, -1, 1, 0.3, 2);
                    dom.filters.push(new BrightnessFilter({
                        value: v
                    }));
                }
                if (fill.filters.saturation) {
                    const v = util.toNumberRange(fill.filters.saturation, -1, 1, 0, 2);
                    dom.filters.push(new SaturateFilter({
                        value: v
                    }));
                }
                if (fill.filters.temperature) {
                    const v = fill.filters.temperature;
                    dom.filters.push(new HueRotateFilter({
                        value: util.toRad(v)
                    }));
                }
                if (fill.filters.tint) {
                    const v = util.toNumberRange(fill.filters.tint, -1, 1, 5, 7);
                    dom.filters.push(new HueRotateFilter({
                        value: util.toDeg(util.radToDeg(v))
                    }));
                }
                if (fill.filters.highlights) {
                    const v = util.toNumberRange(fill.filters.highlights, -1, 1, 0.6, 1.1);
                    dom.filters.push(new BrightnessFilter({
                        value: v
                    }));
                }
                if (fill.filters.shadows) {
                    const v = Math.abs(fill.filters.shadows);
                    let color = `rgba(255,255,255,${v})`;
                    if (fill.filters.shadows < 0) {
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
        if (backgroundLayers.length) {
            const layeredBackgrounds = [...backgroundLayers].reverse();
            const layeredSizes = [...backgroundSizes].reverse();
            const layeredRepeats = [...backgroundRepeats].reverse();
            const layeredBlendModes = [...backgroundBlendModes].reverse();
            dom.style.background = layeredBackgrounds.join(', ');
            dom.style.backgroundSize = layeredSizes.join(', ');
            dom.style.backgroundRepeat = layeredRepeats.join(', ');
            if (layeredBlendModes.some(mode => mode && mode !== 'normal')) {
                dom.style.backgroundBlendMode = layeredBlendModes.join(', ');
            }
        }
        else if (dom.type !== 'img' && dom.backgroundImageUrl) {
            const fillConfig = this.getFillBackgroundConfig(visibleFills[0]);
            dom.style.backgroundSize = fillConfig.size;
            dom.style.backgroundRepeat = fillConfig.repeat;
        }
        return dom;
    }
    getFillBackgroundConfig(fill) {
        switch (fill.scaleMode) {
            case PaintSolidScaleMode.FILL:
                return {
                    mode: 'cover',
                    size: 'cover',
                    repeat: 'no-repeat',
                };
            case PaintSolidScaleMode.FIT:
                return {
                    mode: 'contain',
                    size: 'contain',
                    repeat: 'no-repeat',
                };
            case PaintSolidScaleMode.CROP:
            case PaintSolidScaleMode.STRETCH:
                return {
                    mode: 'stretch',
                    size: '100% 100%',
                    repeat: 'no-repeat',
                };
            case PaintSolidScaleMode.TILE:
                return {
                    mode: 'repeat',
                    size: 'auto',
                    repeat: 'repeat',
                };
            default:
                return {
                    mode: 'cover',
                    size: 'auto',
                    repeat: 'no-repeat',
                };
        }
    }
    // 处理边框
    async convertStrokes(node, dom, option, container) {
        if (node.strokes && node.strokes.length) {
            for (const stroke of node.strokes) {
                if (stroke.visible === false)
                    continue;
                if (stroke.color) {
                    if (typeof stroke.opacity !== 'undefined')
                        stroke.color.a = stroke.opacity;
                    dom.style.outlineColor = util.colorToString(stroke.color, 255);
                }
                switch (stroke.type) {
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
                        if (option && option.getImage) {
                            const img = await option.getImage(stroke.imageRef);
                            if (img)
                                dom.style.borderImageSource = `url(${img})`;
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
            if (node.strokeWeight) {
                if (dom.style.outlineColor)
                    dom.style.outlineWidth = util.toPX(node.strokeWeight);
                if (dom.style.borderImageSource)
                    dom.style.borderImageWidth = util.toPX(node.strokeWeight);
            }
            if (node.strokeDashes && node.strokeDashes.length) {
                dom.style.outlineStyle = 'dashed';
            }
        }
        return dom;
    }
    // 是否是空的dom节点
    isEmptyDom(dom) {
        // 有子节点，不是空
        if (dom.children && dom.children.length)
            return false;
        // 有文本内容，不是空
        if (dom.text)
            return false;
        // 非 div 类型（如 svg, img 等），不是空
        if (dom.type !== 'div')
            return false;
        // 检查样式是否有意义的内容
        const style = dom.style;
        // 有滤镜效果
        if (dom.filters && dom.filters.length)
            return false;
        if (style.filter)
            return false;
        // 有背景相关
        if (style.borderImageSource || style.backgroundImage || style.background)
            return false;
        if (style.backgroundColor && !this.isTransparentColor(style.backgroundColor))
            return false;
        // 有边框
        if (style.border || style.borderWidth || style.borderStyle || style.borderColor)
            return false;
        if (style.borderRadius || style.borderTopLeftRadius)
            return false;
        // 有阴影
        if (style.boxShadow || style.boxShadow)
            return false;
        // 有变换
        if (dom.transform && Object.keys(dom.transform).length > 0)
            return false;
        if (style.transform)
            return false;
        // 有混合模式
        if (style.mixBlendMode && style.mixBlendMode !== 'normal')
            return false;
        // 有透明度设置
        if (style.opacity !== undefined && style.opacity !== '1')
            return false;
        // 有明确的尺寸和位置（可能是占位元素）
        // 如果有明确的尺寸，即使没有其他样式，也可能是有意义的
        (style.width && style.width !== '0px' && style.width !== 'auto') ||
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
        if (color == 'transparent')
            return true;
        if (color === 'rgba(0,0,0,0)' || /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\)/.test(color))
            return true;
        if (typeof color === 'object' && 'a' in color && color.a === 0)
            return true;
        return false;
    }
    // 转换线性渐变
    convertLinearGradient(gradient, dom, container) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        /**
         * 需要计算figma线性渐变位置百分比，因为把图形X和Y都标准化成0-1.所以我们可以认为它就是一个正方形，在figma上编缉的渐变2个点表示stops变化区域，需要计算这2点区域映射到图形的stop比
         */
        const size = this.getGradientSize(handlePositions);
        if (size) {
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
            for (const stop of gradientStops) {
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
                if (size.startInShape.x === 0 && size.startInShape.y === 0) {
                    if (p.x < 0 || p.y < 0)
                        stop.position = -stop.position;
                }
                else if (size.startInShape.x === 1 && size.startInShape.y === 0) {
                    if (p.x > 1 || p.y < 0)
                        stop.position = -stop.position;
                }
                else if (size.startInShape.x === 1 && size.startInShape.y === 1) {
                    if (p.y > 1 || p.x > 1)
                        stop.position = -stop.position;
                }
                else if (size.startInShape.x === 0 && size.startInShape.y === 1) {
                    if (p.x < 0 || p.y > 1)
                        stop.position = -stop.position;
                }
            }
        }
        const linearGradient = `linear-gradient(${this.getGradientDirection(handlePositions)}, ${this.getGradientStops(gradientStops)})`;
        return linearGradient;
    }
    // 转换径向性渐变
    convertRadialGradient(gradient, dom, container) {
        const handlePositions = gradient.gradientHandlePositions;
        const gradientStops = gradient.gradientStops;
        const radialGradient = `radial-gradient(${this.getRadialGradientPosition(handlePositions)}, ${this.getGradientStops(gradientStops)})`;
        return radialGradient;
    }
    // 生成渐变尺寸
    getGradientSize(gradientHandlePositions) {
        if (!gradientHandlePositions || gradientHandlePositions.length < 2)
            return null;
        // 由于figma的渐变起始和终点是第一个和第二个坐标，但css是用的角度，这里要计算起始偏移和终点偏移，再计算stop的偏移比例，才是真实的css渐变比例
        const start = { ...gradientHandlePositions[0] };
        const end = { ...gradientHandlePositions[1] };
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const r = Math.sqrt(dx * dx + dy * dy);
        const cos = dx / r;
        const sin = dy / r;
        const m = dy / dx;
        // 计算渐变二点延长级起始点边与图形边的交点
        const startInShape = {
            x: 0,
            y: 0
        };
        // X轴方向是向右的
        if (dx > 0) {
            // 如果二个点的X轴距离大于Y轴距离，则表示连线或延长级与左边线相交
            if (dx > Math.abs(dy)) {
                // 向右上角，则起点为左下角
                if (dy < 0) {
                    startInShape.y = 1;
                }
            }
            // 向右上角，且与底边相交
            else if (dy < 0) {
                startInShape.y = 1;
            }
            // 向右下角，跟顶边相交
            else ;
        }
        // X轴向左方向
        else if (dx < 0) {
            // 如果二个点的X轴距离大于Y轴距离，则表示连线或延长级与右边线相交
            if (dx > Math.abs(dy)) {
                startInShape.x = 1;
                if (dy <= 0) {
                    startInShape.y = 1;
                }
            }
            // 向左上角，且与底边相交
            else if (dy < 0) {
                startInShape.x = 1;
                startInShape.y = 1;
            }
            // 向左下角，跟顶边相交
            else {
                startInShape.x = 1;
            }
        }
        else {
            if (dy <= 0) {
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
            getProjectionOnLine(point) {
                if (this.start.x === this.end.x)
                    return { x: this.start.x, y: point.y };
                if (this.start.y === this.end.y)
                    return { x: point.x, y: this.start.y };
                // 新直线b，斜率不变m
                const b = this.startInShape.y - this.m * this.startInShape.x;
                const xPrime = (point.y - b + (point.x / this.m)) / (this.m + (1 / this.m));
                const yPrime = m * xPrime + b;
                return { x: xPrime, y: yPrime };
            }
        };
    }
    // 径向性位置
    getRadialGradientPosition(gradientHandlePositions) {
        if (!gradientHandlePositions || !gradientHandlePositions.length)
            return 'center';
        // 大小位置跟起点的距离为渐变宽
        let dx = gradientHandlePositions[1].x - gradientHandlePositions[0].x;
        let dy = gradientHandlePositions[1].y - gradientHandlePositions[0].y;
        const rx = Math.sqrt(dx * dx + dy * dy) * 100;
        dx = gradientHandlePositions[2].x - gradientHandlePositions[0].x;
        dy = gradientHandlePositions[2].y - gradientHandlePositions[0].y;
        const ry = Math.sqrt(dx * dx + dy * dy) * 100;
        return `ellipse ${rx}% ${ry}% at ${gradientHandlePositions[0].x * 100}% ${gradientHandlePositions[0].y * 100}%`;
    }
    // Helper function to get the gradient direction
    getGradientDirection(gradientHandlePositions) {
        if (gradientHandlePositions.length >= 2) {
            const start = gradientHandlePositions[0];
            const end = gradientHandlePositions[1]; // Use the second handle, ignoring the last one
            // Calculate the angle in radians
            const angleRadians = Math.PI / 2 - util.getPointCoordRotation(start, end);
            //const angleRadians = Math.PI/2 - Math.atan2(end.y - start.y, end.x - start.x);
            return util.toDeg(util.radToDeg(angleRadians));
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
            .map((stop) => util.colorToString(stop.color, 255) + ` ${stop.position * 100}%`)
            .join(", ");
        return stopsString;
    }
    // 计算原始长方形宽高
    calculateOriginalRectangleDimensions(radian, newWidth, newHeight) {
        // 旋转后的长方形的宽和高 newWidth newHeight
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const denominator = cos ** 2 - sin ** 2;
        // 在接近 45°/135° 时，反推会出现数值不稳定，直接回退
        if (Math.abs(denominator) < 1e-6) {
            return { width: newWidth, height: newHeight };
        }
        // 解方程求原始长方形的宽度和高度
        const w = (newWidth * Math.abs(cos) - newHeight * Math.abs(sin)) / denominator;
        const h = (newHeight * Math.abs(cos) - newWidth * Math.abs(sin)) / denominator;
        return {
            width: Number.isFinite(w) && w > 0 ? w : newWidth,
            height: Number.isFinite(h) && h > 0 ? h : newHeight
        };
    }
    // 转换混合模式
    convertBlendMode(blendMode) {
        // Figma 混合模式到 CSS mix-blend-mode 的映射
        const blendModeMap = {
            [BlendMode.PASS_THROUGH]: 'normal', // 仅适用于组，子元素不继承混合模式
            [BlendMode.NORMAL]: 'normal',
            [BlendMode.DARKEN]: 'darken',
            [BlendMode.MULTIPLY]: 'multiply',
            [BlendMode.LINEAR_BURN]: 'color-burn', // CSS 没有 linear-burn，用 color-burn 近似
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

class DocumentConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option) {
        dom.type = 'div';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, page, option);
    }
}

class PageConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option) {
        dom.type = 'page';
        dom.style.position = 'relative';
        return super.convert(node, dom, parentNode, page, option);
    }
}

class FRAMEConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        if (parentNode && parentNode.type === 'CANVAS') {
            dom.style.overflow = 'hidden';
            if (!parentNode.absoluteBoundingBox) {
                const parentBounds = this.getNodeAbsoluteBoundingBox(parentNode);
                if (parentBounds) {
                    parentNode.absoluteBoundingBox = parentBounds;
                }
            }
        }
        // ========== Auto Layout 子元素的 Flex 属性处理 ==========
        // 检查是否参与父元素的 Auto Layout
        const parentLayoutMode = parentNode ? parentNode.layoutMode : undefined;
        const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
        const isExplicitAbsolute = node.layoutPositioning === 'ABSOLUTE';
        const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
        if (participatesInAutoLayout) {
            // ========== 作为 Flex Item 的属性转换 ==========
            // 处理 layoutGrow（flex-grow）- 控制元素是否拉伸填充剩余空间
            const layoutGrow = node.layoutGrow;
            if (layoutGrow !== undefined && layoutGrow !== 0) {
                dom.style.flexGrow = layoutGrow.toString();
                // 如果有flexGrow，可能需要设置flexBasis
                dom.style.flexBasis = '0';
            }
            // 处理 layoutAlign（align-self）- 交叉轴对齐
            const layoutAlign = node.layoutAlign;
            if (layoutAlign && layoutAlign !== 'INHERIT') {
                switch (layoutAlign) {
                    case 'STRETCH':
                        dom.style.alignSelf = 'stretch';
                        break;
                    case 'MIN':
                        dom.style.alignSelf = 'flex-start';
                        break;
                    case 'CENTER':
                        dom.style.alignSelf = 'center';
                        break;
                    case 'MAX':
                        dom.style.alignSelf = 'flex-end';
                        break;
                }
            }
            // 处理 layoutSizingHorizontal（水平方向尺寸策略）
            const layoutSizingHorizontal = node.layoutSizingHorizontal;
            if (layoutSizingHorizontal) {
                switch (layoutSizingHorizontal) {
                    case 'FILL':
                        // FILL 是“填充父容器在该轴向的可用空间”
                        // 若父是 HORIZONTAL，则水平是主轴，使用 flex-grow
                        if (parentNode.layoutMode === 'HORIZONTAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            // 父是 VERTICAL 时，水平是交叉轴，使用 stretch
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.width = 'auto';
                        break;
                    case 'HUG':
                        // 自适应内容宽度
                        dom.style.width = 'auto';
                        break;
                    // 'FIXED' 使用默认的固定宽度
                }
            }
            // 处理 layoutSizingVertical（垂直方向尺寸策略）
            const layoutSizingVertical = node.layoutSizingVertical;
            if (layoutSizingVertical) {
                switch (layoutSizingVertical) {
                    case 'FILL':
                        // 若父是 VERTICAL，则垂直是主轴，使用 flex-grow
                        if (parentNode.layoutMode === 'VERTICAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            // 父是 HORIZONTAL 时，垂直是交叉轴，使用 stretch
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.height = 'auto';
                        break;
                    case 'HUG':
                        // 自适应内容高度
                        dom.style.height = 'auto';
                        break;
                    // 'FIXED' 使用默认的固定高度
                }
            }
            // 处理 constraints（约束）- 在 Flex 容器中的附加约束
            if (node.constraints && !layoutSizingHorizontal && !layoutSizingVertical) {
                // 水平约束
                if (node.constraints.horizontal === 'LEFT_RIGHT' || node.constraints.horizontal === 'SCALE') {
                    // 左右约束或缩放：在水平布局中拉伸
                    if (parentNode.layoutMode === 'HORIZONTAL' && !layoutGrow) {
                        dom.style.flexGrow = '1';
                        dom.style.flexBasis = '0';
                    }
                }
                // 垂直约束
                if (node.constraints.vertical === 'TOP_BOTTOM' || node.constraints.vertical === 'SCALE') {
                    // 上下约束或缩放：在垂直布局中拉伸
                    if (parentNode.layoutMode === 'VERTICAL' && layoutAlign !== 'STRETCH') {
                        dom.style.alignSelf = 'stretch';
                    }
                }
            }
        }
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

class TEXTConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option) {
        dom.type = 'text';
        if (node.characters)
            dom.text = dom.data.text = node.characters;
        const res = await super.convert(node, dom, parentNode, page, option);
        //dom.style.letterSpacing = dom.style.letterSpacing || '1px';
        /*if(dom.style.letterSpacing) {
            const v = util.toNumber(dom.style.letterSpacing);
            dom.bounds.width += v * (dom.bounds.width/node.style.fontSize);
        }*/
        let isSingleLine = false; // 单行处理
        // 如果行高好高度一致,则表示单行文本，可以不指定宽度
        if (dom.bounds?.height < node.style?.fontSize * 2) {
            isSingleLine = true;
            const w = this.testTextWidth(dom);
            dom.data.width = Math.max(w, util.toNumber(dom.data.width));
        }
        else {
            //dom.style.minWidth = util.toPX(dom.data.width);
            dom.data.width = dom.bounds.width;
        }
        await this.convertCharacterStyleOverrides(node, res, option, isSingleLine); // 处理分字样式
        dom.style.width = util.toPX(++dom.data.width);
        return res;
    }
    // 解析字体多样式
    async convertCharacterStyleOverrides(node, dom, option, isSingleLine = false) {
        let width = 0;
        if (node.characterStyleOverrides && node.characterStyleOverrides.length && node.styleOverrideTable) {
            const text = dom.text || '';
            let index = 0;
            let lastStyleOverrides = -1;
            let lastDom = null;
            for (; index < node.characterStyleOverrides.length; index++) {
                const s = node.characterStyleOverrides[index];
                const f = text[index];
                if (!f)
                    continue;
                // 如果是连续的同样的样式文字，则组合
                if (!lastDom || lastStyleOverrides !== s) {
                    lastDom = this.createDomNode('span');
                    lastDom.text = '';
                    lastDom.style.position = 'relative'; // 连续字符不能用绝对定位
                    const style = node.styleOverrideTable[s];
                    if (style) {
                        await this.convertFills(style, lastDom, option);
                        await this.convertStyle(style, lastDom, option);
                    }
                    dom.children.push(lastDom);
                }
                lastDom.text += f;
                lastStyleOverrides = s;
            }
            // 还有未处理完的，则加到后面
            if (text.length > index) {
                const fDom = this.createDomNode('span');
                fDom.text = text.substring(index);
                dom.children.push(fDom);
            }
            for (const c of dom.children) {
                // 单行需要计算宽度
                if (isSingleLine) {
                    const w = this.testTextWidth(c, dom);
                    width += w;
                }
                // 处理完样式后，需要删除可以继承父的样式
                this.checkParentAndChildStyleForDelete(dom, c);
            }
            dom.data.text = dom.text = '';
            //dom.type = 'div';
        }
        // 这种方式文本宽度需要重新计算
        dom.data.width = Math.max(width, util.toNumber(dom.data.width));
    }
    // 处理填充, 文本的fill就是字体的颜色
    async convertFills(node, dom, option) {
        // @ts-ignore
        if (!node.isMaskOutline && node.fills && node.fills.length) {
            const fill = node.fills[0];
            switch (fill.type) {
                case PaintType.SOLID: {
                    dom.style.color = util.colorToString(fill.color, 255);
                    break;
                }
                // 线性渐变
                case PaintType.GRADIENT_LINEAR: {
                    dom.style.background = this.convertLinearGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if (!dom.style.color)
                        dom.style.color = 'transparent';
                    break;
                }
                // 径向性渐变
                case PaintType.GRADIENT_RADIAL: {
                    dom.style.background = this.convertRadialGradient(fill, dom);
                    dom.style.backgroundClip = 'text';
                    if (!dom.style.color)
                        dom.style.color = 'transparent';
                    break;
                }
                // 图片
                case PaintType.IMAGE: {
                    if (option && option.getImage) {
                        const img = await option.getImage(fill.imageRef);
                        if (img)
                            dom.style.background = `url(${img})`;
                        dom.style.backgroundClip = 'text';
                        if (!dom.style.color)
                            dom.style.color = 'transparent';
                    }
                    break;
                }
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
        }
        return dom;
    }
    // 检查父子相同的字体样式，如果子元素没有的样式，继承自父的
    checkParentAndChildStyle(parent, child) {
        if (!parent.style || !child.style)
            return;
        const checkStyles = ['color', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'font', 'letterSpacing', 'lineHeight', 'textAlign', 'verticalAlign'];
        for (const n of checkStyles) {
            if (parent.style[n] && !child.style[n])
                child.style[n] = parent.style[n];
        }
    }
    // 检查父子相同的字体样式，从子元素移除相机的字体相关样式
    checkParentAndChildStyleForDelete(parent, child) {
        if (!parent.style || !child.style)
            return;
        const checkStyles = ['color', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'font', 'letterSpacing', 'lineHeight', 'textAlign', 'verticalAlign'];
        for (const n of checkStyles) {
            if (parent.style[n] == child.style[n])
                delete child.style[n];
        }
    }
    // 测试字宽度
    testTextWidth(dom, parent) {
        const span = document.createElement('span');
        Object.assign(span.style, parent?.style || {}, dom.style);
        span.style.width = 'auto';
        span.style.position = 'absolute';
        span.innerText = dom.text;
        span.style.visibility = 'hidden';
        document.body.appendChild(span);
        let w = span.offsetWidth || span.clientWidth;
        if (dom.style.letterSpacing) {
            const v = util.toNumber(dom.style.letterSpacing);
            w += v;
        }
        document.body.removeChild(span);
        return w;
    }
}

class PolygonConverter extends BaseConverter {
    // 多边形标签名
    polygonName = 'polygon';
    async convert(node, dom, parentNode, page, option, container) {
        let polygon;
        let defs;
        // 如果 没有生成父的svg标签，则当前dom就是，然后再生成子元素
        if (!container) {
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
            if (!defs || defs.type !== 'defs') {
                defs = this.createDomNode('defs');
                container.children.unshift(defs);
            }
            // 创建新的polygon元素
            polygon = this.createDomNode(this.polygonName, {
                id: node.id || '',
                // @ts-ignore
                figmaData: node
            });
        }
        // 如果是蒙板
        if (node.isMask) {
            const mask = this.createDomNode('mask');
            mask.id = 'mask_' + util.uuid();
            defs.children.push(mask);
            mask.children.push(polygon);
            polygon.isMask = true;
        }
        else {
            if (container && !container.children.includes(polygon))
                container.children.push(polygon);
            else if (!container) {
                dom.children.push(polygon);
            }
        }
        polygon.style.fillRule = 'nonzero';
        // svg外转用定位和大小，其它样式都给子元素
        dom = await super.convert(node, dom, parentNode, page, option, container);
        polygon.bounds = dom.bounds;
        // 保存polygon引用，以便convertFills和convertStrokes使用
        dom._polygon = polygon;
        const mask = this.getMask(container);
        if (node.isMask) {
            if (mask) {
                mask.attributes['x'] = polygon.bounds.x + '';
                mask.attributes['y'] = polygon.bounds.y + '';
                mask.attributes['width'] = polygon.bounds.width + '';
                mask.attributes['height'] = polygon.bounds.height + '';
            }
        }
        else if (mask) {
            polygon.style.mask = `url(#${mask.id})`;
        }
        // 虚线
        /*if(node.strokeDashes) {
            polygon.attributes['stroke-dasharray'] = node.strokeDashes.join(',');
        }*/
        if (dom.type === 'svg') {
            delete dom.style.borderRadius;
            delete dom.style.border;
        }
        // 生成路径
        this.createPolygonPath(polygon, node, container);
        await this.createAdditionalFillLayers(node, dom, polygon, option, container);
        return dom;
    }
    // 获取定位
    getPosition(dom, container) {
        const isAbsolute = !dom.isMask && container && container.id !== dom.id;
        const left = isAbsolute ? dom.bounds.x : 0;
        const top = isAbsolute ? dom.bounds.y : 0;
        return {
            x: left,
            y: top
        };
    }
    // 生成多边形路径
    createPolygonPath(dom, node, container) {
        const pos = this.getPosition(dom, container);
        // 优先使用 fillGeometry（矢量路径数据）
        // @ts-ignore
        if (node.fillGeometry && node.fillGeometry.length > 0) {
            // 如果有多个路径，合并成一个
            // @ts-ignore
            const paths = node.fillGeometry.map(geo => geo.path).join(' ');
            dom.attributes['d'] = paths;
            // @ts-ignore
            if (node.fillGeometry[0].windingRule) {
                // @ts-ignore
                dom.attributes['fill-rule'] = node.fillGeometry[0].windingRule.toLowerCase();
            }
        }
        // 如果没有 fillGeometry，使用 strokeGeometry
        // @ts-ignore
        else if (node.strokeGeometry && node.strokeGeometry.length > 0) {
            // @ts-ignore
            const paths = node.strokeGeometry.map(geo => geo.path).join(' ');
            dom.attributes['d'] = paths;
            // @ts-ignore
            if (node.strokeGeometry[0].windingRule) {
                // @ts-ignore
                dom.attributes['fill-rule'] = node.strokeGeometry[0].windingRule.toLowerCase();
            }
        }
        // 兜底：使用边界框创建简单的矩形路径
        else {
            const path = `M ${pos.x} ${pos.y} L ${pos.x + dom.bounds.width} ${pos.y} L ${pos.x + dom.bounds.width} ${pos.y + dom.bounds.height} L ${pos.x} ${pos.y + dom.bounds.height} Z`;
            dom.attributes['d'] = path;
        }
    }
    async createAdditionalFillLayers(node, dom, polygon, option, container) {
        if (node.isMask)
            return;
        if (!node.fills || node.fills.length < 2)
            return;
        const visibleFills = node.fills.filter(fill => fill.visible !== false);
        if (visibleFills.length < 2)
            return;
        const svgContainer = container || dom;
        const polygonIndex = svgContainer.children.indexOf(polygon);
        if (polygonIndex < 0)
            return;
        let insertIndex = polygonIndex;
        for (const fill of [...visibleFills.slice(1)].reverse()) {
            const layerPolygon = this.createDomNode(polygon.type, {
                // @ts-ignore
                figmaData: node,
                attributes: {
                    ...polygon.attributes,
                },
                style: {
                    ...polygon.style,
                },
            });
            layerPolygon.bounds = {
                ...polygon.bounds,
            };
            delete layerPolygon.attributes['stroke'];
            delete layerPolygon.attributes['stroke-width'];
            delete layerPolygon.attributes['stroke-dasharray'];
            delete layerPolygon.style.fill;
            delete layerPolygon.style.mixBlendMode;
            await this.applySingleFillToPolygon(fill, node, layerPolygon, dom, option, container);
            svgContainer.children.splice(insertIndex, 0, layerPolygon);
            insertIndex++;
        }
    }
    async applySingleFillToPolygon(fill, node, polygon, dom, option, container) {
        switch (fill.type) {
            case PaintType.SOLID: {
                const color = {
                    ...fill.color,
                    a: typeof fill.opacity !== 'undefined' ? fill.opacity : fill.color.a,
                };
                polygon.style.fill = util.colorToString(color, 255);
                break;
            }
            case PaintType.GRADIENT_LINEAR: {
                polygon.style.fill = this.convertLinearGradient(fill, dom, container);
                break;
            }
            case PaintType.GRADIENT_DIAMOND:
            case PaintType.GRADIENT_ANGULAR:
            case PaintType.GRADIENT_RADIAL: {
                polygon.style.fill = this.convertRadialGradient(fill, dom, container);
                break;
            }
            case PaintType.IMAGE: {
                await super.convertFills({
                    ...node,
                    fills: [fill],
                }, polygon, option, container);
                break;
            }
        }
        if (fill.blendMode) {
            const cssBlendMode = this.convertBlendMode(fill.blendMode);
            if (cssBlendMode && cssBlendMode !== 'normal') {
                polygon.style.mixBlendMode = cssBlendMode;
            }
        }
        if (!polygon.style.fill)
            polygon.style.fill = 'none';
    }
    // 获取蒙板
    getMask(container) {
        const defs = container.children[0];
        if (defs.children?.length) {
            for (const child of defs.children) {
                if (child.type === 'mask')
                    return child;
            }
        }
        return null;
    }
    // 用id获取当前图形
    getPolygon(node, dom) {
        // 优先使用保存的polygon引用
        if (dom._polygon)
            return dom._polygon;
        if (dom.children && dom.children.length) {
            for (const child of dom.children) {
                if (child.id === node.id || child.figmaData?.id === node.id)
                    return child;
                if (child.children && child.children.length) {
                    const d = this.getPolygon(node, child);
                    if (d && d !== child)
                        return d;
                }
            }
        }
        //if(dom.figmaData?.id === node.id) return dom;
        return dom;
    }
    // 处理填充
    async convertFills(node, dom, option, container) {
        const polygon = this.getPolygon(node, container || dom);
        const parentFills = node._parentFills;
        if (parentFills && parentFills.length > 0) {
            polygon.style.fill = 'transparent';
            return dom;
        }
        if (!node.fills || node.fills.length === 0) {
            polygon.style.fill = 'none';
            return dom;
        }
        const visibleFill = node.fills.find(fill => fill.visible !== false);
        if (!visibleFill) {
            polygon.style.fill = 'none';
            return dom;
        }
        await this.applySingleFillToPolygon(visibleFill, node, polygon, dom, option, container);
        return dom;
    }
    // 处理边框
    async convertStrokes(node, dom, option, container) {
        const polygon = this.getPolygon(node, container || dom);
        if (node.strokes && node.strokes.length) {
            for (const stroke of node.strokes) {
                if (stroke.visible === false)
                    continue;
                switch (stroke.type) {
                    case PaintType.SOLID: {
                        if (stroke.color) {
                            if (typeof stroke.opacity !== 'undefined')
                                stroke.color.a = stroke.opacity;
                            polygon.attributes['stroke'] = util.colorToString(stroke.color, 255);
                        }
                        break;
                    }
                    case PaintType.GRADIENT_LINEAR: {
                        polygon.attributes['stroke'] = this.convertLinearGradient(stroke, dom, container);
                        break;
                    }
                    case PaintType.GRADIENT_DIAMOND:
                    case PaintType.GRADIENT_ANGULAR:
                    case PaintType.GRADIENT_RADIAL: {
                        polygon.attributes['stroke'] = this.convertRadialGradient(stroke, dom, container);
                        break;
                    }
                    case PaintType.IMAGE: {
                        // 图片描边暂不支持
                        break;
                    }
                }
            }
            if (node.strokeWeight) {
                if (dom.style.outlineColor)
                    dom.style.outlineWidth = util.toPX(node.strokeWeight);
                if (dom.style.borderImageSource)
                    dom.style.borderImageWidth = util.toPX(node.strokeWeight);
            }
            if (node.strokeDashes && node.strokeDashes.length) {
                polygon.attributes['stroke-dasharray'] = node.strokeDashes.join(',');
            }
        }
        if (node.strokeWeight) {
            polygon.attributes['stroke-width'] = node.strokeWeight.toString();
        }
        if (node.strokeAlign) ;
        if (node.strokeCap) {
            polygon.style.strokeLinecap = node.strokeCap;
        }
        if (node.strokeJoin) {
            polygon.style.strokeLinejoin = node.strokeJoin;
        }
        return dom;
    }
    // 转换线性渐变
    convertLinearGradient(gradient, dom, container) {
        container = container || dom;
        if (container.type !== 'svg')
            return super.convertLinearGradient(gradient, dom, container);
        const defs = container.children[0];
        const gradientDom = this.createDomNode('linearGradient');
        gradientDom.id = 'gradient_' + util.uuid();
        const handlePositions = gradient.gradientHandlePositions;
        if (handlePositions && handlePositions.length > 1) {
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
    convertRadialGradient(gradient, dom, container) {
        container = container || dom;
        if (container.type !== 'svg')
            return super.convertRadialGradient(gradient, dom, container);
        const defs = container.children[0];
        if (!defs)
            return '';
        const gradientDom = this.createDomNode('radialGradient');
        gradientDom.id = 'gradient_' + util.uuid();
        const handlePositions = gradient.gradientHandlePositions;
        // 该字段包含三个矢量，每个矢量都是归一化对象空间中的一个位置（归一化对象空间是如果对象的边界框的左上角是（0，0），右下角是（1,1））。第一个位置对应于渐变的开始（为了计算渐变停止，值为0），第二个位置是渐变的结束（值为1），第三个手柄位置决定渐变的宽度。
        if (handlePositions && handlePositions.length > 2) {
            gradientDom.attributes['fx'] = gradientDom.fx = Math.round(handlePositions[0].x * 100) + '%';
            gradientDom.attributes['fy'] = gradientDom.fy = Math.round(handlePositions[0].y * 100) + '%';
            gradientDom.attributes['cx'] = gradientDom.cx = gradientDom.fx;
            gradientDom.attributes['cy'] = gradientDom.cy = gradientDom.fy;
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
    getGradientStopDoms(gradientStops) {
        const stops = [];
        for (const s of gradientStops) {
            const stop = this.createDomNode('stop');
            stop.attributes['offset'] = stop.offset = `${Math.round(s.position * 100)}%`;
            stop.style.stopColor = util.colorToString(s.color, 255);
            stops.push(stop);
        }
        return stops;
    }
}

// 五角星
class StarConverter extends PolygonConverter {
    // 生成多边形路径
    createPolygonPath(dom, node, container) {
        const pos = this.getPosition(dom, container);
        const radius = Math.min(dom.bounds.width, dom.bounds.height) / 2; // 画五角星的半径
        const center = {
            x: dom.bounds.width / 2 + pos.x,
            y: dom.bounds.height / 2 + pos.y
        };
        const point1 = [center.x, 0]; // 顶点
        const stepAngle = Math.PI * 2 / 5; // 圆分成五份
        const angle2 = Math.PI / 2 - stepAngle; // 右上角的点的角度
        const point2 = [
            center.x + Math.cos(angle2) * radius,
            center.y - Math.sin(angle2) * radius,
        ];
        const angle3 = stepAngle - angle2;
        const point3 = [
            center.x + Math.cos(angle3) * radius,
            center.y + Math.sin(angle3) * radius,
        ];
        const point4 = [
            center.x - Math.cos(angle3) * radius,
            center.y + Math.sin(angle3) * radius,
        ];
        const point5 = [
            center.x - Math.cos(angle2) * radius,
            center.y - Math.sin(angle2) * radius,
        ];
        // 每隔一个点连线
        dom.attributes['points'] = [
            point1.join(','),
            point3.join(','),
            point5.join(','),
            point2.join(','),
            point4.join(','),
        ].join(' ');
    }
}

class ELLIPSEConverter extends PolygonConverter {
    // 多边形标签名
    polygonName = 'ellipse';
    async convert(node, dom, parentNode, page, option, container) {
        // 如果有角度信息，则用多边形来计算
        if (node.arcData && (node.arcData.endingAngle - node.arcData.startingAngle < Math.PI * 2)) {
            this.polygonName = 'polygon';
        }
        else {
            this.polygonName = 'ellipse';
        }
        return super.convert(node, dom, parentNode, page, option, container);
    }
    // 生成多边形路径
    createPolygonPath(dom, node, container) {
        const pos = this.getPosition(dom, container);
        const center = {
            x: dom.bounds.width / 2 + pos.x,
            y: dom.bounds.height / 2 + pos.y
        };
        if (this.polygonName === 'polygon') {
            // 圆的半径
            let radius = Math.min(dom.bounds.width, dom.bounds.height) / 2;
            // 减去边框大小
            if (node.strokeWeight) {
                radius -= node.strokeWeight;
            }
            const points = this.createArcPoints(center, radius, node.arcData.startingAngle, node.arcData.endingAngle);
            // 有内圆
            if (node.arcData.innerRadius > 0) {
                const innerPoints = this.createArcPoints(center, radius * node.arcData.innerRadius, node.arcData.startingAngle, node.arcData.endingAngle);
                // 为了首尾相接，把内圆坐标反转
                points.push(...innerPoints.reverse());
            }
            dom.attributes['points'] = points.map(p => p.join(',')).join(' ');
        }
        else {
            dom.attributes['cx'] = center.x + '';
            dom.attributes['cy'] = center.y + '';
            dom.attributes['rx'] = dom.bounds.width / 2 + '';
            dom.attributes['ry'] = dom.bounds.height / 2 + '';
        }
    }
    createArcPoints(center, radius, startAngle = 0, endAngle = Math.PI * 2) {
        const step = 1 / radius;
        const points = [];
        //椭圆方程x=a*cos(r) ,y=b*sin(r)	
        for (let r = startAngle; r <= endAngle; r += step) {
            const x = Math.cos(r) * radius + center.x;
            const y = Math.sin(r) * radius + center.y;
            points.push([
                x, y
            ]);
        }
        return points;
    }
}

class LINEConverter extends PolygonConverter {
    polygonName = 'line';
    async convert(node, dom, parentNode, page, option, container) {
        const res = await super.convert(node, dom, parentNode, page, option, container);
        if (dom.style.transform) {
            //polygon.style.transform = dom.style.transform;
            delete dom.style.transform;
        }
        delete dom.attributes['width'];
        delete dom.style['width'];
        delete dom.style['height'];
        delete dom.attributes['height'];
        delete dom.data['height'];
        delete dom.data['height'];
        return res;
    }
    // 生成多边形路径
    createPolygonPath(dom, node, container) {
        const pos = this.getPosition(dom, container);
        dom.attributes['x1'] = pos.x + '';
        dom.attributes['y1'] = pos.y + '';
        dom.attributes['x2'] = (pos.x + dom.bounds.width) + '';
        dom.attributes['y2'] = (pos.y + dom.bounds.height) + '';
    }
}

class RECTANGLEConverter extends PolygonConverter {
    polygonName = 'path';
    async convert(node, dom, parentNode, page, option, container) {
        return super.convert(node, dom, parentNode, page, option, container);
    }
    // 生成多边形路径
    createPolygonPath(dom, node, container) {
        const pos = this.getPosition(dom, container);
        //dom.attributes['x'] = pos.x + '';
        //dom.attributes['y'] = pos.y + '';
        //dom.attributes['width'] = dom.bounds.width + '';
        //dom.attributes['height'] = dom.bounds.height + '';
        const path = [];
        const defaultRadius = node.cornerRadius || 0;
        const [r1, r2, r3, r4] = node.rectangleCornerRadii || [defaultRadius, defaultRadius, defaultRadius, defaultRadius];
        if (r1) {
            path.push('M', pos.x, pos.y + r1);
            // 圆弧
            path.push('A', r1, r1, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x + r1, pos.y); // 终点
        }
        else {
            path.push('M', pos.x, pos.y);
        }
        if (r2) {
            path.push('L', pos.x + dom.bounds.width - r2, pos.y);
            // 圆弧
            path.push('A', r2, r2, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x + dom.bounds.width, pos.y + r2); // 终点
        }
        else {
            path.push('L', pos.x + dom.bounds.width, pos.y);
        }
        if (r3) {
            path.push('L', pos.x + dom.bounds.width, pos.y + dom.bounds.height - r3);
            // 圆弧
            path.push('A', r3, r3, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x + dom.bounds.width - r3, pos.y + dom.bounds.height); // 终点
        }
        else {
            path.push('L', pos.x + dom.bounds.width, pos.y + dom.bounds.height);
        }
        if (r4) {
            path.push('L', pos.x + r4, pos.y + dom.bounds.height);
            // 圆弧
            path.push('A', r4, r4, 90, 0, 1); // 小角度，顺时针
            path.push(pos.x, pos.y + dom.bounds.height - r4); // 终点
        }
        else {
            path.push('L', pos.x, pos.y + dom.bounds.height);
        }
        dom.attributes['d'] = path.join(' ') + 'Z';
    }
}

class VECTORConverter extends PolygonConverter {
    // VECTOR 使用 path 元素
    polygonName = 'path';
    async convert(node, dom, parentNode, page, option, container) {
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

/**
 * SLICE 节点转换器
 * 切片节点主要用于导出，在 HTML 中通常不需要渲染
 * 但如果需要显示，可以创建一个带边框的占位区域
 */
class SLICEConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        // 切片节点通常不渲染，只保留位置和大小信息
        dom.style.border = '1px dashed #ccc';
        dom.style.backgroundColor = 'transparent';
        // 可以添加一个标签标识这是切片
        dom.attributes = dom.attributes || {};
        dom.attributes['data-slice'] = 'true';
        // 如果有导出设置，记录格式信息
        if (node.exportSettings && node.exportSettings.length > 0) {
            const formats = node.exportSettings.map(s => s.format).join(',');
            dom.attributes['data-export-formats'] = formats;
        }
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

/**
 * COMPONENT 节点转换器
 * 组件节点本质上和 FRAME 类似，但包含组件特有的属性
 */
class COMPONENTConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        // 标记为组件
        dom.attributes = dom.attributes || {};
        dom.attributes['data-component'] = 'true';
        // ========== Flex Item 属性处理 ==========
        // 检查是否参与父元素的 Auto Layout
        const parentLayoutMode = parentNode ? parentNode.layoutMode : undefined;
        const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
        const isExplicitAbsolute = node.layoutPositioning === 'ABSOLUTE';
        const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
        if (participatesInAutoLayout) {
            // 处理 layoutGrow（flex-grow）
            const layoutGrow = node.layoutGrow;
            if (layoutGrow !== undefined && layoutGrow !== 0) {
                dom.style.flexGrow = layoutGrow.toString();
                dom.style.flexBasis = '0';
            }
            // 处理 layoutAlign（align-self）
            const layoutAlign = node.layoutAlign;
            if (layoutAlign && layoutAlign !== 'INHERIT') {
                switch (layoutAlign) {
                    case 'STRETCH':
                        dom.style.alignSelf = 'stretch';
                        break;
                    case 'MIN':
                        dom.style.alignSelf = 'flex-start';
                        break;
                    case 'CENTER':
                        dom.style.alignSelf = 'center';
                        break;
                    case 'MAX':
                        dom.style.alignSelf = 'flex-end';
                        break;
                }
            }
            // 处理 layoutSizingHorizontal
            const layoutSizingHorizontal = node.layoutSizingHorizontal;
            if (layoutSizingHorizontal) {
                switch (layoutSizingHorizontal) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'HORIZONTAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.width = 'auto';
                        break;
                    case 'HUG':
                        dom.style.width = 'auto';
                        break;
                }
            }
            // 处理 layoutSizingVertical
            const layoutSizingVertical = node.layoutSizingVertical;
            if (layoutSizingVertical) {
                switch (layoutSizingVertical) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'VERTICAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.height = 'auto';
                        break;
                    case 'HUG':
                        dom.style.height = 'auto';
                        break;
                }
            }
        }
        // 调用基类转换方法处理定位和其他样式
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

/**
 * COMPONENT_SET 节点转换器
 * 组件集用于管理组件的变体（variants）
 */
class COMPONENT_SETConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        // 标记为组件集
        dom.attributes = dom.attributes || {};
        dom.attributes['data-component-set'] = 'true';
        // ========== Flex Item 属性处理 ==========
        // 检查是否参与父元素的 Auto Layout
        const parentLayoutMode = parentNode ? parentNode.layoutMode : undefined;
        const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
        const isExplicitAbsolute = node.layoutPositioning === 'ABSOLUTE';
        const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
        if (participatesInAutoLayout) {
            // 处理 layoutGrow（flex-grow）
            const layoutGrow = node.layoutGrow;
            if (layoutGrow !== undefined && layoutGrow !== 0) {
                dom.style.flexGrow = layoutGrow.toString();
                dom.style.flexBasis = '0';
            }
            // 处理 layoutAlign（align-self）
            const layoutAlign = node.layoutAlign;
            if (layoutAlign && layoutAlign !== 'INHERIT') {
                switch (layoutAlign) {
                    case 'STRETCH':
                        dom.style.alignSelf = 'stretch';
                        break;
                    case 'MIN':
                        dom.style.alignSelf = 'flex-start';
                        break;
                    case 'CENTER':
                        dom.style.alignSelf = 'center';
                        break;
                    case 'MAX':
                        dom.style.alignSelf = 'flex-end';
                        break;
                }
            }
            // 处理 layoutSizingHorizontal
            const layoutSizingHorizontal = node.layoutSizingHorizontal;
            if (layoutSizingHorizontal) {
                switch (layoutSizingHorizontal) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'HORIZONTAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.width = 'auto';
                        break;
                    case 'HUG':
                        dom.style.width = 'auto';
                        break;
                }
            }
            // 处理 layoutSizingVertical
            const layoutSizingVertical = node.layoutSizingVertical;
            if (layoutSizingVertical) {
                switch (layoutSizingVertical) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'VERTICAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.height = 'auto';
                        break;
                    case 'HUG':
                        dom.style.height = 'auto';
                        break;
                }
            }
        }
        // 调用基类转换方法处理定位和其他样式
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

/**
 * INSTANCE 节点转换器
 * 组件实例会继承主组件的样式，但可以有自己的覆盖
 */
class INSTANCEConverter extends BaseConverter {
    async convert(node, dom, parentNode, page, option, container) {
        // 标记为组件实例
        dom.attributes = dom.attributes || {};
        dom.attributes['data-instance'] = 'true';
        // 记录引用的主组件 ID
        if (node.componentId) {
            dom.attributes['data-component-id'] = node.componentId;
        }
        // ========== Flex Item 属性处理 ==========
        // 检查是否参与父元素的 Auto Layout
        const parentLayoutMode = parentNode ? parentNode.layoutMode : undefined;
        const parentHasAutoLayout = parentLayoutMode === 'HORIZONTAL' || parentLayoutMode === 'VERTICAL';
        const isExplicitAbsolute = node.layoutPositioning === 'ABSOLUTE';
        const participatesInAutoLayout = parentHasAutoLayout && !isExplicitAbsolute;
        if (participatesInAutoLayout) {
            // 处理 layoutGrow（flex-grow）
            const layoutGrow = node.layoutGrow;
            if (layoutGrow !== undefined && layoutGrow !== 0) {
                dom.style.flexGrow = layoutGrow.toString();
                dom.style.flexBasis = '0';
            }
            // 处理 layoutAlign（align-self）
            const layoutAlign = node.layoutAlign;
            if (layoutAlign && layoutAlign !== 'INHERIT') {
                switch (layoutAlign) {
                    case 'STRETCH':
                        dom.style.alignSelf = 'stretch';
                        break;
                    case 'MIN':
                        dom.style.alignSelf = 'flex-start';
                        break;
                    case 'CENTER':
                        dom.style.alignSelf = 'center';
                        break;
                    case 'MAX':
                        dom.style.alignSelf = 'flex-end';
                        break;
                }
            }
            // 处理 layoutSizingHorizontal
            const layoutSizingHorizontal = node.layoutSizingHorizontal;
            if (layoutSizingHorizontal) {
                switch (layoutSizingHorizontal) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'HORIZONTAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.width = 'auto';
                        break;
                    case 'HUG':
                        dom.style.width = 'auto';
                        break;
                }
            }
            // 处理 layoutSizingVertical
            const layoutSizingVertical = node.layoutSizingVertical;
            if (layoutSizingVertical) {
                switch (layoutSizingVertical) {
                    case 'FILL':
                        if (parentNode.layoutMode === 'VERTICAL') {
                            dom.style.flexGrow = '1';
                            dom.style.flexBasis = '0';
                        }
                        else {
                            dom.style.alignSelf = 'stretch';
                        }
                        dom.style.height = 'auto';
                        break;
                    case 'HUG':
                        dom.style.height = 'auto';
                        break;
                }
            }
        }
        // 调用基类转换方法处理定位和其他样式
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

class BooleanOperationConverter extends PolygonConverter {
    // 使用 path 元素
    polygonName = 'path';
    async convert(node, dom, parentNode, page, option, container) {
        // BOOLEAN_OPERATION 有自己的 fillGeometry（合并后的形状）
        // 应该使用这个形状，而不是依赖子元素
        // 子元素的渲染在 node.ts 中根据 fillGeometry 的存在来判断是否跳过
        return super.convert(node, dom, parentNode, page, option, container);
    }
}

const frameConverter = new FRAMEConverter();
const componentConverter = new COMPONENTConverter();
const ConverterMaps = {
    'BASE': new BaseConverter(),
    'FRAME': frameConverter,
    'GROUP': frameConverter,
    'TEXT': new TEXTConverter(),
    'DOCUMENT': new DocumentConverter(),
    'CANVAS': new PageConverter(),
    'REGULAR_POLYGON': new PolygonConverter(),
    'ELLIPSE': new ELLIPSEConverter(),
    'STAR': new StarConverter(),
    'RECTANGLE': new RECTANGLEConverter(),
    'LINE': new LINEConverter(),
    'VECTOR': new VECTORConverter(),
    'SLICE': new SLICEConverter(),
    'COMPONENT': componentConverter,
    'COMPONENT_SET': new COMPONENT_SETConverter(),
    'INSTANCE': new INSTANCEConverter(),
    'BOOLEAN_OPERATION': new BooleanOperationConverter(),
    'BOOLEAN': new BooleanOperationConverter(),
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
async function convert(node, parentNode, page, option, container) {
    try {
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
                // 默认绝对定位，由baseNode.ts中的逻辑决定最终的定位方式
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
        let converter = ConverterMaps[node.type];
        // 如果没有找到对应的转换器，使用基础转换器
        if (!converter) {
            console.warn(`[figma2html] No converter found for node type: ${node.type}, using base converter`);
            converter = ConverterMaps.BASE;
        }
        if (recType && recType !== 'svg') {
            dom.type = recType;
            converter = ConverterMaps.BASE;
        }
        await converter.convert(node, dom, parentNode, page, option, container);
        if (!page && node.type === 'FRAME' && option?.expandToPage)
            page = dom; // 当前节点开始，为页面模板
        if (node.children && node.children.length) {
            // 检查是否应该跳过子元素渲染
            // BOOLEAN_OPERATION 有自己的 fillGeometry 时，不需要渲染子元素
            const shouldSkipChildren = (node.type === 'BOOLEAN_OPERATION' || node.type === 'BOOLEAN') &&
                node.fillGeometry && node.fillGeometry.length > 0;
            if (!shouldSkipChildren) {
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
                    // 如果当前节点是 BOOLEAN_OPERATION 且有自己的填充，但没有 fillGeometry
                    // 则标记子元素使用透明填充，让父元素的填充显示
                    if ((node.type === 'BOOLEAN_OPERATION' || node.type === 'BOOLEAN') &&
                        node.fills && node.fills.length > 0 &&
                        !node.fillGeometry) {
                        child._parentFills = node.fills;
                    }
                    try {
                        const c = await convert(child, node, parent || page, option, parent);
                        if (!c)
                            continue;
                        lastChildDom = c;
                        if (ConverterMaps.BASE.isEmptyDom(c)) {
                            console.log('[figma2html] Empty dom skipped:', c.name || c.id);
                            continue;
                        }
                        // 统一将子节点加入父节点的 children 中，不再扁平化
                        if (!c.isMask && !dom.children.includes(c))
                            dom.children.push(c);
                    }
                    catch (error) {
                        console.error(`[figma2html] Failed to convert child node ${child.name || child.id}:`, error);
                    }
                }
            }
        }
        return dom;
    }
    catch (error) {
        console.error(`[figma2html] Failed to convert node ${node.name || node.id}:`, error);
        return null;
    }
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
        const filters = new CSSFilters(dom, node.filters);
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
        }
    }
    else {
        //img.data = node;
        img.onload = function (e) {
            setImageSize(node, this);
        };
    }
}

/**
 * 获取figma文件
 * @param fileId
 * @param token
 */
async function loadFigmaFile(fileId, token) {
    if (!fileId) {
        throw new Error('[figma2html] fileId is required');
    }
    if (!token) {
        throw new Error('[figma2html] token is required');
    }
    // 添加 geometry=paths 参数以获取矢量路径数据
    const url = `https://api.figma.com/v1/files/${fileId}?geometry=paths`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    try {
        const data = await util.request(url, option);
        const parsed = JSON.parse(data);
        // 检查 API 错误
        if (parsed.err) {
            throw new Error(`[figma2html] Figma API error: ${parsed.err}`);
        }
        return parsed;
    }
    catch (error) {
        console.error('[figma2html] Failed to load Figma file:', error);
        throw error;
    }
}
// 获取文件所有图片
async function getFigmaFileImages(fileId, token) {
    if (!fileId) {
        console.warn('[figma2html] fileId is required for getFigmaFileImages');
        return {};
    }
    if (!token) {
        console.warn('[figma2html] token is required for getFigmaFileImages');
        return {};
    }
    const url = `https://api.figma.com/v1/files/${fileId}/images`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    try {
        const data = await util.request(url, option);
        const images = JSON.parse(data);
        if (images.err) {
            console.error('[figma2html] Figma API error:', images.err);
            return {};
        }
        if (images.meta && images.meta.images)
            return images.meta.images;
        return {};
    }
    catch (error) {
        console.error('[figma2html] Failed to get Figma file images:', error);
        return {};
    }
}
// 获取图片
async function getFigmaImage(key, token, ids) {
    if (!key || !token || !ids) {
        console.warn('[figma2html] key, token and ids are required for getFigmaImage');
        return {};
    }
    const url = `https://api.figma.com/v1/images/${key}?ids=${encodeURIComponent(ids)}`;
    const option = {
        headers: {
            "X-Figma-Token": token,
        }
    };
    try {
        const data = await util.request(url, option);
        const images = JSON.parse(data);
        if (images.err) {
            console.error('[figma2html] Figma API error:', images.err);
            return {};
        }
        if (images.meta && images.meta.images)
            return images.meta.images;
        return images;
    }
    catch (error) {
        console.error('[figma2html] Failed to get Figma image:', error);
        return {};
    }
}

export { convert, convert as default, getFigmaFileImages, getFigmaImage, loadFigmaFile, nodeToDom, util };
