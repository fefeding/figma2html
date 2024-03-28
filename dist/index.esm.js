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
        if (this.isNumber(v))
            return v + 'px';
        return v;
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
        return v;
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
        return v;
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
            if (option.headers) {
                for (const name in option.headers) {
                    request.setRequestHeader(name, option.headers[name]);
                }
            }
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
            request.send(method === 'POST' ? params.join('&') : null);
        });
    }
};

const fullCircleRadius = Math.PI * 2;
/**
 * 操作杠指针配置
 */
const Cursors = {
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
        if (Math.abs(rotation) > fullCircleRadius)
            rotation = rotation % fullCircleRadius;
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
                        cursor = await util.rotateImage(data['t'], Math.PI / 2);
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
                    cursor = await util.rotateImage(normal, rotation);
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
                        cursor = await util.rotateImage(data['lt'], Math.PI / 2);
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
                    cursor = await util.rotateImage(normal, rotation);
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
        const [pos1, pos2] = util.rotatePoints([oldPosition, newPosition], center, -rotation);
        offset.x = pos2.x - pos1.x;
        offset.y = pos2.y - pos1.y;
    }
    return offset;
};
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
        offset = getRotateEventPosition(offset, oldPosition, newPosition, rotation, center);
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
        const targetCenter = util.rotatePoints({ ...newCenter }, center, rotation);
        args.x += targetCenter.x - newCenter.x;
        args.y += targetCenter.y - newCenter.y;
    }
    return args;
};

var controller = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Cursors: Cursors,
    fullCircleRadius: fullCircleRadius,
    getChangeData: getChangeData,
    getRotateEventPosition: getRotateEventPosition,
    rotateChange: rotateChange
});

export { controller, util as default, util };
