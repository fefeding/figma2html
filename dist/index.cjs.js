"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFigmaFileImages = exports.getFigmaImage = exports.loadFigmaFile = exports.util = exports.nodeToDom = exports.convert = void 0;
var j_design_util_1 = require("j-design-util");
Object.defineProperty(exports, "util", { enumerable: true, get: function () { return j_design_util_1.util; } });
var node_1 = require("./node");
Object.defineProperty(exports, "convert", { enumerable: true, get: function () { return node_1.convert; } });
Object.defineProperty(exports, "nodeToDom", { enumerable: true, get: function () { return node_1.nodeToDom; } });
/**
 * 获取figma文件
 * @param fileId
 * @param token
 */
function loadFigmaFile(fileId, token) {
    return __awaiter(this, void 0, void 0, function () {
        var url, option, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.figma.com/v1/files/".concat(fileId);
                    option = {
                        headers: {
                            "X-Figma-Token": token,
                        }
                    };
                    return [4 /*yield*/, j_design_util_1.util.request(url, option)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, JSON.parse(data)];
            }
        });
    });
}
exports.loadFigmaFile = loadFigmaFile;
// 获取文件所有图片
function getFigmaFileImages(fileId, token) {
    return __awaiter(this, void 0, void 0, function () {
        var url, option, data, images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.figma.com/v1/files/".concat(fileId, "/images");
                    option = {
                        headers: {
                            "X-Figma-Token": token,
                        }
                    };
                    return [4 /*yield*/, j_design_util_1.util.request(url, option)];
                case 1:
                    data = _a.sent();
                    images = JSON.parse(data);
                    if (images.meta && images.meta.images)
                        return [2 /*return*/, images.meta.images];
                    return [2 /*return*/, {}];
            }
        });
    });
}
exports.getFigmaFileImages = getFigmaFileImages;
// 获取图片
function getFigmaImage(key, token, ids) {
    return __awaiter(this, void 0, void 0, function () {
        var url, option, data, images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.figma.com/v1/images/".concat(key, "?ids=").concat(encodeURIComponent(ids));
                    option = {
                        headers: {
                            "X-Figma-Token": token,
                        }
                    };
                    return [4 /*yield*/, j_design_util_1.util.request(url, option)];
                case 1:
                    data = _a.sent();
                    images = JSON.parse(data);
                    if (images.meta && images.meta.images)
                        return [2 /*return*/, images.meta.images];
                    return [2 /*return*/, images];
            }
        });
    });
}
exports.getFigmaImage = getFigmaImage;
exports.default = node_1.convert;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeToDom = exports.convert = void 0;
var j_design_util_1 = __importDefault(require("j-design-util"));
var j_css_filters_1 = __importDefault(require("j-css-filters"));
var types_1 = require("./common/types");
var baseNode_1 = __importDefault(require("./figmaTypes/baseNode"));
var document_1 = __importDefault(require("./figmaTypes/document"));
var page_1 = __importDefault(require("./figmaTypes/page"));
var frame_1 = __importDefault(require("./figmaTypes/frame"));
//import GroupConverter from './figmaTypes/group';
var text_1 = __importDefault(require("./figmaTypes/text"));
var polygon_1 = __importDefault(require("./figmaTypes/polygon"));
var star_1 = __importDefault(require("./figmaTypes/star"));
var ellipse_1 = __importDefault(require("./figmaTypes/ellipse"));
var line_1 = __importDefault(require("./figmaTypes/line"));
var rectangle_1 = __importDefault(require("./figmaTypes/rectangle"));
var frameConverter = new frame_1.default();
var ConverterMaps = {
    'BASE': new baseNode_1.default(),
    'FRAME': frameConverter,
    'GROUP': frameConverter,
    'TEXT': new text_1.default(),
    'DOCUMENT': new document_1.default(),
    'CANVAS': new page_1.default(),
    'REGULAR_POLYGON': new polygon_1.default(),
    'ELLIPSE': new ellipse_1.default(),
    'STAR': new star_1.default(),
    'RECTANGLE': new rectangle_1.default(),
    'LINE': new line_1.default(),
    'VECTOR': new rectangle_1.default(),
};
// rectange是否处理成svg，是返回svg，否则返回img或div
function rectType(item) {
    var e_1, _a;
    if (item.type !== 'RECTANGLE')
        return '';
    // 已识别成图片的，不再处理成svg
    if (item.type === 'RECTANGLE' && item.fills && item.fills.length && item.fills.find(function (p) { return p.type === 'IMAGE'; })) {
        return 'img';
    }
    if (item.type === 'RECTANGLE' && item.exportSettings) {
        try {
            for (var _b = __values(item.exportSettings), _c = _b.next(); !_c.done; _c = _b.next()) {
                var setting = _c.value;
                if (setting.format !== types_1.ImageType.SVG) {
                    return 'div';
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return 'svg';
}
// 转node为html结构对象
function convert(node, parentNode, page, option, container) {
    return __awaiter(this, void 0, void 0, function () {
        var docDom, recType, dom, isContainer, svgElements, isSvg, _a, _b, child, converter, lastChildDom, _c, _d, child, parent_1, c, e_2_1;
        var e_3, _e, e_2, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!node.document) return [3 /*break*/, 2];
                    return [4 /*yield*/, convert(node.document, node, page, option)];
                case 1:
                    docDom = _g.sent();
                    return [2 /*return*/, docDom];
                case 2:
                    if (node.visible === false)
                        return [2 /*return*/, null];
                    recType = rectType(node);
                    dom = ConverterMaps.BASE.createDomNode('div', {
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
                    isContainer = ['GROUP', 'FRAME', 'CANVAS', 'BOOLEAN', 'BOOLEAN_OPERATION'].includes(node.type);
                    svgElements = ['VECTOR', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'RECTANGLE'];
                    isSvg = isContainer && !container;
                    // 容器下所有元素都是SVG元素，则认为是svg块
                    if (isSvg && node.children && node.children.length) {
                        try {
                            for (_a = __values(node.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                                child = _b.value;
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
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                    else {
                        isSvg = false;
                    }
                    if (isSvg) {
                        dom.type = 'svg';
                        container = dom;
                    }
                    converter = ConverterMaps[node.type] || ConverterMaps.BASE;
                    if (recType && recType !== 'svg') {
                        dom.type = recType;
                        converter = ConverterMaps.BASE;
                    }
                    if (!converter) return [3 /*break*/, 4];
                    return [4 /*yield*/, converter.convert(node, dom, parentNode, page, option, container)];
                case 3:
                    _g.sent();
                    _g.label = 4;
                case 4:
                    if (!page && node.type === 'FRAME' && (option === null || option === void 0 ? void 0 : option.expandToPage))
                        page = dom; // 当前节点开始，为页面模板
                    else if (page && (!container || dom.type === 'svg')) {
                        // 没有显示意义的div不处理
                        if (!dom.isElement)
                            page.children.push(dom);
                    }
                    if (!(node.children && node.children.length)) return [3 /*break*/, 12];
                    if (isSvg && (node.type === 'BOOLEAN_OPERATION' || node.type === 'BOOLEAN')) {
                        // if(svgElements.includes(node.children[0].type)) node.children[0].isMask = true;
                    }
                    lastChildDom = null;
                    _g.label = 5;
                case 5:
                    _g.trys.push([5, 10, 11, 12]);
                    _c = __values(node.children), _d = _c.next();
                    _g.label = 6;
                case 6:
                    if (!!_d.done) return [3 /*break*/, 9];
                    child = _d.value;
                    parent_1 = container;
                    // 如果是蒙板，则加入上一个SVG元素中
                    if (child.isMask && !parent_1 && (lastChildDom === null || lastChildDom === void 0 ? void 0 : lastChildDom.type) === 'svg') {
                        parent_1 = lastChildDom;
                    }
                    return [4 /*yield*/, convert(child, node, parent_1 || page, option, parent_1)];
                case 7:
                    c = _g.sent();
                    if (!c)
                        return [3 /*break*/, 8];
                    lastChildDom = c;
                    if (ConverterMaps.BASE.isEmptyDom(c)) {
                        console.log('empty dom', c);
                        return [3 /*break*/, 8];
                    }
                    if (!c.isMask && !dom.children.includes(c) && (!page || c.isElement))
                        dom.children.push(c);
                    _g.label = 8;
                case 8:
                    _d = _c.next();
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/, dom];
            }
        });
    });
}
exports.convert = convert;
// 把figma数据转为dom对象
function nodeToDom(node, option) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = node.type;
                    switch (_a) {
                        case 'document': return [3 /*break*/, 1];
                        case 'page': return [3 /*break*/, 3];
                        case 'svg': return [3 /*break*/, 5];
                        case 'ellipse': return [3 /*break*/, 7];
                        case 'line': return [3 /*break*/, 7];
                        case 'path': return [3 /*break*/, 7];
                        case 'polygon': return [3 /*break*/, 7];
                        case 'stop': return [3 /*break*/, 9];
                        case 'defs': return [3 /*break*/, 9];
                        case 'mask': return [3 /*break*/, 9];
                        case 'linearGradient': return [3 /*break*/, 9];
                        case 'radialGradient': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 1: return [4 /*yield*/, renderDocument(node, option)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, renderPage(node, option)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, renderSvg(node, option)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, renderEllipse(node, option)];
                case 8: return [2 /*return*/, _b.sent()];
                case 9: return [4 /*yield*/, renderSvgElement(node, option)];
                case 10: return [2 /*return*/, _b.sent()];
                case 11: return [4 /*yield*/, renderElement(node, option)];
                case 12: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.nodeToDom = nodeToDom;
function renderDocument(node, option) {
    return __awaiter(this, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, renderElement(node, option)];
                case 1:
                    doc = _a.sent();
                    return [2 /*return*/, doc];
            }
        });
    });
}
function renderPage(node, option) {
    return __awaiter(this, void 0, void 0, function () {
        var page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, renderElement(node, option)];
                case 1:
                    page = _a.sent();
                    //page.style.minHeight = node.bounds.height + 'px';
                    return [2 /*return*/, page];
            }
        });
    });
}
function renderSvg(node, option) {
    return __awaiter(this, void 0, void 0, function () {
        var svg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, renderSvgElement(node, option)];
                case 1:
                    svg = _a.sent();
                    //svg.setAttribute('width', node.bounds.width + '');
                    //svg.setAttribute('height', node.bounds.height + '');
                    return [2 /*return*/, svg];
            }
        });
    });
}
function renderEllipse(node, option) {
    return __awaiter(this, void 0, void 0, function () {
        var ellipse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, renderSvgElement(node, option)];
                case 1:
                    ellipse = _a.sent();
                    if (node.fill)
                        ellipse.setAttribute('fill', node.fill);
                    return [2 /*return*/, ellipse];
            }
        });
    });
}
function renderSvgElement(node, option) {
    return __awaiter(this, void 0, void 0, function () {
        var el;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    el = document.createElementNS("http://www.w3.org/2000/svg", node.type);
                    return [4 /*yield*/, renderElement(node, option, el)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, el];
            }
        });
    });
}
function renderElement(node, option, dom) {
    return __awaiter(this, void 0, void 0, function () {
        var transform, img, filters, name_1, _a, _b, child, c, e_4_1;
        var e_4, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    dom = dom || j_design_util_1.default.createElement(node.type);
                    if (node.transform) {
                        transform = '';
                        if (node.transform.rotateX) {
                            transform += " rotateX(".concat(node.transform.rotateX, ")");
                        }
                        if (node.transform.rotateY) {
                            transform += " rotateY(".concat(node.transform.rotateY, ")");
                        }
                        if (node.transform.rotateZ) {
                            transform += " rotateZ(".concat(node.transform.rotateZ, ")");
                        }
                        if (node.transform.scaleX) {
                            transform += " scaleX(".concat(node.transform.scaleX, ")");
                        }
                        if (node.transform.scaleY) {
                            transform += " scaleY(".concat(node.transform.scaleY, ")");
                        }
                        if (node.transform.scaleZ) {
                            transform += " scaleZ(".concat(node.transform.scaleZ, ")");
                        }
                        if (node.transform.translateX) {
                            transform += " translateX(".concat(j_design_util_1.default.isNumber(node.transform.translateX) ? j_design_util_1.default.toPX(node.transform.translateX) : node.transform.translateX, ")");
                        }
                        if (node.transform.translateY) {
                            transform += " translateY(".concat(j_design_util_1.default.isNumber(node.transform.translateY) ? j_design_util_1.default.toPX(node.transform.translateY) : node.transform.translateY, ")");
                        }
                        if (node.transform.translateZ) {
                            transform += " translateZ(".concat(j_design_util_1.default.isNumber(node.transform.translateZ) ? j_design_util_1.default.toPX(node.transform.translateZ) : node.transform.translateZ, ")");
                        }
                        if (transform) {
                            j_design_util_1.default.css(dom, {
                                transform: transform
                            });
                        }
                    }
                    // 是图片的话，在它上面套一层div
                    if (node.type === 'img') {
                        img = dom;
                        if (node.url)
                            img.src = node.url;
                        j_design_util_1.default.css(img, {
                            width: '100%',
                            height: '100%'
                        });
                        dom = j_design_util_1.default.createElement('div');
                        // 如果保持宽高比，则直隐去超出部分
                        if (node.preserveRatio) {
                            // 保持宽高比
                            j_design_util_1.default.css(img, {
                                height: 'auto'
                            });
                            j_design_util_1.default.css(dom, {
                                overflow: 'hidden'
                            });
                        }
                        dom.appendChild(img);
                    }
                    if (node.style) {
                        Object.assign(dom.style, node.style);
                        //if(node.preserveRatio && node.type === 'img') dom.style.height = 'auto';
                    }
                    if (node.text) {
                        dom.innerHTML = node.text.replace(/\n/g, '<br />');
                    }
                    if (node.filters) {
                        filters = new j_css_filters_1.default(dom, node.filters);
                        filters.apply(); // 应用于style
                    }
                    if (node.visible === false)
                        dom.style.display = 'none';
                    if (node.attributes) {
                        for (name_1 in node.attributes) {
                            if (typeof node.attributes[name_1] !== 'undefined' && typeof name_1 === 'string') {
                                dom.setAttribute(name_1, node.attributes[name_1]);
                            }
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
                    if (!node.children) return [3 /*break*/, 8];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    _a = __values(node.children), _b = _a.next();
                    _d.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 5];
                    child = _b.value;
                    if (child.visible === false)
                        return [3 /*break*/, 4];
                    return [4 /*yield*/, nodeToDom(child, option)];
                case 3:
                    c = _d.sent();
                    c && dom.appendChild(c);
                    _d.label = 4;
                case 4:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, dom];
            }
        });
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineTypes = exports.PathWindingRule = exports.PaintSolidScaleMode = exports.PaintType = exports.EffectType = exports.AxisSizingMode = exports.MaskType = exports.LayoutGridAlignment = exports.LayoutGridPattern = exports.LayoutAlign = exports.LayoutConstraintHorizontal = exports.LayoutConstraintVertical = exports.EasingType = exports.BlendMode = exports.ConstrainType = exports.LineHeightUnit = exports.TextAutoResize = exports.TextDecoration = exports.TextCase = exports.BooleanOperationType = exports.ImageType = exports.StrokeJoin = exports.StrokeAlign = exports.StrokeCap = void 0;
/** A string enum with value, describing the end caps of vector paths. */
var StrokeCap;
(function (StrokeCap) {
    StrokeCap["NONE"] = "NONE";
    StrokeCap["ROUND"] = "ROUND";
    StrokeCap["SQUARE"] = "SQUARE";
    StrokeCap["LINE_ARROW"] = "LINE_ARROW";
    StrokeCap["TRIANGLE_ARROW"] = "TRIANGLE_ARROW";
})(StrokeCap || (exports.StrokeCap = StrokeCap = {}));
/** Where stroke is drawn relative to the vector outline as a string enum */
var StrokeAlign;
(function (StrokeAlign) {
    StrokeAlign["INSIDE"] = "INSIDE";
    StrokeAlign["OUTSIDE"] = "OUTSIDE";
    StrokeAlign["CENTER"] = "CENTER";
})(StrokeAlign || (exports.StrokeAlign = StrokeAlign = {}));
/** A string enum with value, describing how corners in vector paths are rendered. */
var StrokeJoin;
(function (StrokeJoin) {
    StrokeJoin["MITER"] = "MITER";
    StrokeJoin["BEVEL"] = "BEVEL";
    StrokeJoin["ROUND"] = "ROUND";
})(StrokeJoin || (exports.StrokeJoin = StrokeJoin = {}));
var ImageType;
(function (ImageType) {
    ImageType["JPG"] = "JPG";
    ImageType["PNG"] = "PNG";
    ImageType["SVG"] = "SVG";
    ImageType["PDF"] = "PDF";
})(ImageType || (exports.ImageType = ImageType = {}));
/** A string enum with value, indicating the type of boolean operation applied */
var BooleanOperationType;
(function (BooleanOperationType) {
    BooleanOperationType["UNION"] = "UNION";
    BooleanOperationType["INTERSECT"] = "INTERSECT";
    BooleanOperationType["SUBTRACT"] = "SUBTRACT";
    BooleanOperationType["EXCLUDE"] = "EXCLUDE";
})(BooleanOperationType || (exports.BooleanOperationType = BooleanOperationType = {}));
/** Text casing applied to the node, default is the original casing */
var TextCase;
(function (TextCase) {
    TextCase["ORIGINAL"] = "ORIGINAL";
    TextCase["UPPER"] = "UPPER";
    TextCase["LOWER"] = "LOWER";
    TextCase["TITLE"] = "TITLE";
    TextCase["SMALL_CAPS"] = "SMALL_CAPS";
    TextCase["SMALL_CAPS_FORCED"] = "SMALL_CAPS_FORCED";
})(TextCase || (exports.TextCase = TextCase = {}));
/** Text decoration applied to the node */
var TextDecoration;
(function (TextDecoration) {
    TextDecoration["NONE"] = "NONE";
    TextDecoration["STRIKETHROUGH"] = "STRIKETHROUGH";
    TextDecoration["UNDERLINE"] = "UNDERLINE";
})(TextDecoration || (exports.TextDecoration = TextDecoration = {}));
/** Dimensions along which text will auto resize, default is that the text does not auto-resize. */
var TextAutoResize;
(function (TextAutoResize) {
    TextAutoResize["NONE"] = "NONE";
    TextAutoResize["HEIGHT"] = "HEIGHT";
    TextAutoResize["WIDTH_AND_HEIGHT"] = "WIDTH_AND_HEIGHT";
    TextAutoResize["TRUNCATE"] = "TRUNCATE";
})(TextAutoResize || (exports.TextAutoResize = TextAutoResize = {}));
/** The unit of the line height value specified by the user. */
var LineHeightUnit;
(function (LineHeightUnit) {
    LineHeightUnit["PIXELS"] = "PIXELS";
    LineHeightUnit["FONT_SIZE_%"] = "FONT_SIZE_%";
    LineHeightUnit["INTRINSIC_%"] = "INTRINSIC_%";
})(LineHeightUnit || (exports.LineHeightUnit = LineHeightUnit = {}));
var ConstrainType;
(function (ConstrainType) {
    /** Scale by value */
    ConstrainType["SCALE"] = "SCALE";
    /** Scale proportionally and set width to value */
    ConstrainType["WIDTH"] = "WIDTH";
    /** Scale proportionally and set width to value */
    ConstrainType["HEIGHT"] = "HEIGHT";
})(ConstrainType || (exports.ConstrainType = ConstrainType = {}));
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
})(BlendMode || (exports.BlendMode = BlendMode = {}));
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
})(EasingType || (exports.EasingType = EasingType = {}));
var LayoutConstraintVertical;
(function (LayoutConstraintVertical) {
    LayoutConstraintVertical["TOP"] = "TOP";
    LayoutConstraintVertical["BOTTOM"] = "BOTTOM";
    LayoutConstraintVertical["CENTER"] = "CENTER";
    LayoutConstraintVertical["TOP_BOTTOM"] = "TOP_BOTTOM";
    LayoutConstraintVertical["SCALE"] = "SCALE";
})(LayoutConstraintVertical || (exports.LayoutConstraintVertical = LayoutConstraintVertical = {}));
var LayoutConstraintHorizontal;
(function (LayoutConstraintHorizontal) {
    LayoutConstraintHorizontal["LEFT"] = "LEFT";
    LayoutConstraintHorizontal["RIGHT"] = "RIGHT";
    LayoutConstraintHorizontal["CENTER"] = "CENTER";
    LayoutConstraintHorizontal["LEFT_RIGHT"] = "LEFT_RIGHT";
    LayoutConstraintHorizontal["SCALE"] = "SCALE";
})(LayoutConstraintHorizontal || (exports.LayoutConstraintHorizontal = LayoutConstraintHorizontal = {}));
var LayoutAlign;
(function (LayoutAlign) {
    /** Determines if the layer should stretch along the parent’s counter axis. This property is only provided for direct children of auto-layout frames. */
    LayoutAlign["INHERIT"] = "INHERIT";
    LayoutAlign["STRETCH"] = "STRETCH";
    /** In horizontal auto-layout frames, "MIN" and "MAX" correspond to "TOP" and "BOTTOM". In vertical auto-layout frames, "MIN" and "MAX" correspond to "LEFT" and "RIGHT". */
    LayoutAlign["MIN"] = "MIN";
    LayoutAlign["CENTER"] = "CENTER";
    LayoutAlign["MAX"] = "MAX";
})(LayoutAlign || (exports.LayoutAlign = LayoutAlign = {}));
var LayoutGridPattern;
(function (LayoutGridPattern) {
    LayoutGridPattern["COLUMNS"] = "COLUMNS";
    LayoutGridPattern["ROWS"] = "ROWS";
    LayoutGridPattern["GRID"] = "GRID";
})(LayoutGridPattern || (exports.LayoutGridPattern = LayoutGridPattern = {}));
var LayoutGridAlignment;
(function (LayoutGridAlignment) {
    LayoutGridAlignment["MIN"] = "MIN";
    LayoutGridAlignment["MAX"] = "MAX";
    LayoutGridAlignment["CENTER"] = "CENTER";
})(LayoutGridAlignment || (exports.LayoutGridAlignment = LayoutGridAlignment = {}));
var MaskType;
(function (MaskType) {
    MaskType["ALPHA"] = "ALPHA";
    MaskType["VECTOR"] = "VECTOR";
    MaskType["LUMINANCE"] = "LUMINANCE"; //the luminance value of each pixel of the mask node will be used to determine the opacity of that pixel in the masked result.
})(MaskType || (exports.MaskType = MaskType = {}));
var AxisSizingMode;
(function (AxisSizingMode) {
    AxisSizingMode["FIXED"] = "FIXED";
    AxisSizingMode["AUTO"] = "AUTO";
})(AxisSizingMode || (exports.AxisSizingMode = AxisSizingMode = {}));
var EffectType;
(function (EffectType) {
    EffectType["INNER_SHADOW"] = "INNER_SHADOW";
    EffectType["DROP_SHADOW"] = "DROP_SHADOW";
    EffectType["LAYER_BLUR"] = "LAYER_BLUR";
    EffectType["BACKGROUND_BLUR"] = "BACKGROUND_BLUR";
})(EffectType || (exports.EffectType = EffectType = {}));
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
})(PaintType || (exports.PaintType = PaintType = {}));
var PaintSolidScaleMode;
(function (PaintSolidScaleMode) {
    PaintSolidScaleMode["FILL"] = "FILL";
    PaintSolidScaleMode["FIT"] = "FIT";
    PaintSolidScaleMode["TILE"] = "TILE";
    PaintSolidScaleMode["STRETCH"] = "STRETCH";
})(PaintSolidScaleMode || (exports.PaintSolidScaleMode = PaintSolidScaleMode = {}));
var PathWindingRule;
(function (PathWindingRule) {
    PathWindingRule["EVENODD"] = "EVENODD";
    PathWindingRule["NONZERO"] = "NONZERO";
})(PathWindingRule || (exports.PathWindingRule = PathWindingRule = {}));
/** List types are represented as string enums with one of these possible values: ORDERED: Text is an ordered list (numbered), UNORDERED: Text is an unordered list (bulleted), NONE: Text is plain text and not part of any list */
var LineTypes;
(function (LineTypes) {
    LineTypes["ORDERED"] = "ORDERED";
    LineTypes["UNORDERED"] = "UNORDERED";
    LineTypes["NONE"] = "NONE";
})(LineTypes || (exports.LineTypes = LineTypes = {}));

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConverter = void 0;
var j_css_filters_1 = require("j-css-filters");
var types_1 = require("../common/types");
var j_design_util_1 = require("j-design-util");
var BaseConverter = /** @class */ (function () {
    function BaseConverter() {
    }
    BaseConverter.prototype.convert = function (node, dom, parentNode, page, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, padding, v;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
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
                            // 优先相对于页面坐标, isElement是相于它的父级的
                            if (page && !dom.isElement) {
                                dom.data.left = dom.bounds.x = node.absoluteBoundingBox.x - page.absoluteBoundingBox.x;
                                dom.data.top = dom.bounds.y = node.absoluteBoundingBox.y - page.absoluteBoundingBox.y;
                            }
                            // 相对于父位置
                            else if (parentNode && parentNode.absoluteBoundingBox) {
                                dom.data.left = dom.bounds.x = node.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x;
                                dom.data.top = dom.bounds.y = node.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y;
                            }
                            // 没有父元素，就认为约对定位为0
                            else {
                                dom.data.left = dom.bounds.x = 0;
                                dom.data.top = dom.bounds.y = 0;
                            }
                            dom.style.left = j_design_util_1.util.toPX(dom.bounds.x).toString();
                            dom.style.top = j_design_util_1.util.toPX(dom.bounds.y).toString();
                            dom.absoluteBoundingBox = node.absoluteBoundingBox;
                        }
                        // 背景色
                        if (node.backgroundColor)
                            dom.style.backgroundColor = j_design_util_1.util.colorToString(node.backgroundColor, 255);
                        if (node.cornerRadius) {
                            dom.style.borderRadius = j_design_util_1.util.toPX(node.cornerRadius);
                        }
                        else if (node.rectangleCornerRadii) {
                            dom.style.borderRadius = node.rectangleCornerRadii.map(function (p) { return j_design_util_1.util.toPX(p); }).join(' ');
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
                        // 旋转
                        if (node.rotation) {
                            dom.data.rotation = node.rotation;
                            dom.transform.rotateZ = node.rotation;
                            dom.style.transform = "rotate(".concat(j_design_util_1.util.toRad(node.rotation), ")");
                        }
                        // 裁剪超出区域
                        if (node.clipsContent === true || (parentNode && parentNode.clipsContent === true))
                            dom.style.overflow = 'hidden';
                        // 是否保持宽高比
                        dom.preserveRatio = node.preserveRatio;
                        // padding
                        if (dom.type !== 'svg') {
                            try {
                                for (_a = __values(['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    padding = _b.value;
                                    v = node[padding];
                                    if (v) {
                                        dom.style[padding] = j_design_util_1.util.toPX(v);
                                        //if(['paddingLeft', 'paddingRight'].includes(padding)) dom.bounds.width -= v;
                                        //else dom.bounds.height -= v;
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        return [4 /*yield*/, this.convertStyle(node, dom, option, container)];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, this.convertFills(node, dom, option, container)];
                    case 2:
                        _d.sent(); // 解析fills
                        return [4 /*yield*/, this.convertStrokes(node, dom, option, container)];
                    case 3:
                        _d.sent(); // 边框
                        return [4 /*yield*/, this.convertEffects(node, dom, option, container)];
                    case 4:
                        _d.sent(); // 滤镜
                        dom.data.width = dom.bounds.width;
                        dom.data.height = dom.bounds.height;
                        dom.style.width = j_design_util_1.util.toPX(dom.bounds.width).toString();
                        dom.style.height = j_design_util_1.util.toPX(dom.bounds.height).toString();
                        // 不支持的模式，直接透明
                        switch (node.blendMode) {
                            case types_1.BlendMode.SCREEN: {
                                dom.style.opacity = '0';
                                break;
                            }
                        }
                        return [2 /*return*/, dom];
                }
            });
        });
    };
    // 生成节点对象
    BaseConverter.prototype.createDomNode = function (type, option) {
        var dom = __assign(__assign({ data: {}, attributes: {}, children: [] }, option), { style: __assign({ boxSizing: 'border-box' }, option === null || option === void 0 ? void 0 : option.style), filters: new Array, transform: {}, type: type });
        return dom;
    };
    // 转换style
    BaseConverter.prototype.convertStyle = function (node, dom, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var style;
            return __generator(this, function (_a) {
                // @ts-ignore
                if (node.type === 'BOOLEAN_OPERATION')
                    return [2 /*return*/, dom];
                style = node.style || node;
                if (!style)
                    return [2 /*return*/, dom];
                if (style.fontFamily)
                    dom.style.fontFamily = style.fontFamily;
                if (style.fontSize)
                    dom.style.fontSize = j_design_util_1.util.toPX(style.fontSize);
                if (style.fontWeight)
                    dom.style.fontWeight = style.fontWeight.toString();
                if (style.italic)
                    dom.style.fontStyle = 'italic';
                if (typeof style.letterSpacing !== 'undefined') {
                    dom.style.letterSpacing = j_design_util_1.util.toPX(style.letterSpacing);
                }
                if (style.lineHeightPx)
                    dom.style.lineHeight = j_design_util_1.util.toPX(style.lineHeightPx);
                if (style.textAlignHorizontal)
                    dom.style.textAlign = style.textAlignHorizontal;
                if (style.textAlignVertical)
                    dom.style.verticalAlign = style.textAlignVertical;
                return [2 /*return*/, dom];
            });
        });
    };
    // 转换滤镜
    BaseConverter.prototype.convertEffects = function (node, dom, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, effect;
            var e_2, _c;
            return __generator(this, function (_d) {
                if (!node.isMaskOutline && node.effects) {
                    try {
                        //dom.style.filter = dom.style.filter || '';
                        for (_a = __values(node.effects), _b = _a.next(); !_b.done; _b = _a.next()) {
                            effect = _b.value;
                            if (effect.visible === false)
                                continue;
                            switch (effect.type) {
                                case types_1.EffectType.INNER_SHADOW:
                                case types_1.EffectType.DROP_SHADOW: {
                                    //dom.style.filter += ` drop-shadow(${util.toPX(effect.offset.x)} ${util.toPX(effect.offset.y)} ${util.toPX(effect.radius)} ${util.colorToString(effect.color, 255)})`;
                                    // 如果 有spread，则加到盒子上
                                    if (effect.spread || effect.type === types_1.EffectType.INNER_SHADOW) {
                                        dom.style.boxShadow = "".concat(j_design_util_1.util.toPX(effect.offset.x), " ").concat(j_design_util_1.util.toPX(effect.offset.y), " ").concat(j_design_util_1.util.toPX(effect.radius), "  ").concat(j_design_util_1.util.toPX(effect.spread || 0), " ").concat(j_design_util_1.util.colorToString(effect.color, 255), " ").concat(effect.type === types_1.EffectType.INNER_SHADOW ? 'inset' : '');
                                    }
                                    else {
                                        dom.filters.push(new j_css_filters_1.DropShadowFilter({
                                            value: {
                                                x: j_design_util_1.util.toPX(effect.offset.x),
                                                y: j_design_util_1.util.toPX(effect.offset.y),
                                                blur: j_design_util_1.util.toPX(effect.radius),
                                                color: j_design_util_1.util.colorToString(effect.color, 255)
                                            }
                                        }));
                                    }
                                    break;
                                }
                                case types_1.EffectType.LAYER_BLUR: {
                                    //dom.style.filter += ` blur(${util.toPX(effect.radius)})`;
                                    dom.filters.push(new j_css_filters_1.BlurFilter({
                                        value: j_design_util_1.util.toPX(effect.radius)
                                    }));
                                    break;
                                }
                                case types_1.EffectType.BACKGROUND_BLUR: {
                                    break;
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                return [2 /*return*/, dom];
            });
        });
    };
    // 处理填充
    BaseConverter.prototype.convertFills = function (node, dom, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, fill, _c, img, _d, _e, a, c, e, _f, b, d, f, v, v, v, v, v, v, v, color, e_3_1;
            var e_3, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (node.type === 'BOOLEAN_OPERATION')
                            return [2 /*return*/, dom];
                        if (!(!node.isMaskOutline && node.fills)) return [3 /*break*/, 14];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 12, 13, 14]);
                        _a = __values(node.fills), _b = _a.next();
                        _h.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 11];
                        fill = _b.value;
                        if (fill.visible === false)
                            return [3 /*break*/, 10];
                        _c = fill.type;
                        switch (_c) {
                            case types_1.PaintType.SOLID: return [3 /*break*/, 3];
                            case types_1.PaintType.GRADIENT_LINEAR: return [3 /*break*/, 4];
                            case types_1.PaintType.GRADIENT_DIAMOND: return [3 /*break*/, 5];
                            case types_1.PaintType.GRADIENT_ANGULAR: return [3 /*break*/, 5];
                            case types_1.PaintType.GRADIENT_RADIAL: return [3 /*break*/, 5];
                            case types_1.PaintType.IMAGE: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 9];
                    case 3:
                        {
                            if (typeof fill.opacity !== 'undefined')
                                fill.color.a = fill.opacity;
                            dom.style.backgroundColor = j_design_util_1.util.colorToString(fill.color, 255);
                            return [3 /*break*/, 9];
                        }
                        _h.label = 4;
                    case 4:
                        {
                            dom.style.background = this.convertLinearGradient(fill, dom, container);
                            return [3 /*break*/, 9];
                        }
                        _h.label = 5;
                    case 5:
                        {
                            dom.style.background = this.convertRadialGradient(fill, dom, container);
                            return [3 /*break*/, 9];
                        }
                        _h.label = 6;
                    case 6:
                        if (!(option && option.getImage)) return [3 /*break*/, 8];
                        return [4 /*yield*/, option.getImage(fill.imageRef)];
                    case 7:
                        img = _h.sent();
                        if (img) {
                            if (dom.type === 'img') {
                                dom.url = img;
                            }
                            else {
                                dom.style.backgroundImage = "url(".concat(img, ")");
                            }
                        }
                        dom.backgroundImageUrl = img || fill.imageRef;
                        _h.label = 8;
                    case 8: return [3 /*break*/, 9];
                    case 9:
                        switch (fill.scaleMode) {
                            case types_1.PaintSolidScaleMode.FILL: {
                                dom.style.backgroundSize = 'cover';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.FIT: {
                                dom.style.backgroundSize = 'contain';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.STRETCH: {
                                dom.style.backgroundSize = '100% 100%';
                                break;
                            }
                            // 平铺
                            case types_1.PaintSolidScaleMode.TILE: {
                                dom.style.backgroundRepeat = 'repeat';
                                break;
                            }
                        }
                        // 不支持的模式，直接透明
                        switch (fill.blendMode) {
                            case types_1.BlendMode.SCREEN: {
                                dom.style.opacity = '0';
                                break;
                            }
                        }
                        if (dom && fill.imageTransform && fill.scaleMode === types_1.PaintSolidScaleMode.STRETCH) {
                            if (!dom.transform)
                                dom.transform = {};
                            _d = __read(fill.imageTransform, 2), _e = __read(_d[0], 3), a = _e[0], c = _e[1], e = _e[2], _f = __read(_d[1], 3), b = _f[0], d = _f[1], f = _f[2];
                            // 计算旋转角度和正弦值
                            dom.transform.translateX = (-e * 100) + '%'; // * node.absoluteBoundingBox.width;                    
                            dom.transform.translateY = (-f * 100) + '%'; //* node.absoluteBoundingBox.width;
                            //dom.transform.scaleX = a;
                            //dom.transform.scaleY = d;
                            dom.transform.skewX = b;
                            dom.transform.skewY = c;
                            dom.preserveRatio = true;
                        }
                        // 如果有滤镜，则给指定
                        if (fill.filters) {
                            /* exposure?: number; // 曝光度 (exposure): 控制图像的明亮程度或暗度。
                            contrast?: number; // 对比
                            saturation?: number; // 饱和度
                            temperature?: number; // 色温
                            tint?: number; // 色调
                            highlights?: number; // 调整图像中高光部分的亮度和对比度。
                            shadows?: number; // 阴影
                            */
                            if (fill.filters.contrast) {
                                v = j_design_util_1.util.toNumberRange(fill.filters.contrast, -1, 1, 0.5, 1);
                                dom.filters.push(new j_css_filters_1.ContrastFilter({
                                    value: v
                                }));
                            }
                            if (fill.filters.exposure) {
                                v = j_design_util_1.util.toNumberRange(fill.filters.exposure, -1, 1, 0.3, 2);
                                dom.filters.push(new j_css_filters_1.BrightnessFilter({
                                    value: v
                                }));
                            }
                            if (fill.filters.saturation) {
                                v = j_design_util_1.util.toNumberRange(fill.filters.saturation, -1, 1, 0, 2);
                                dom.filters.push(new j_css_filters_1.SaturateFilter({
                                    value: v
                                }));
                            }
                            if (fill.filters.temperature) {
                                v = fill.filters.temperature;
                                dom.filters.push(new j_css_filters_1.HueRotateFilter({
                                    value: j_design_util_1.util.toRad(v)
                                }));
                            }
                            if (fill.filters.tint) {
                                v = j_design_util_1.util.toNumberRange(fill.filters.tint, -1, 1, 5, 7);
                                dom.filters.push(new j_css_filters_1.HueRotateFilter({
                                    value: j_design_util_1.util.toDeg(j_design_util_1.util.radToDeg(v))
                                }));
                            }
                            if (fill.filters.highlights) {
                                v = j_design_util_1.util.toNumberRange(fill.filters.highlights, -1, 1, 0.6, 1.1);
                                dom.filters.push(new j_css_filters_1.BrightnessFilter({
                                    value: v
                                }));
                            }
                            if (fill.filters.shadows) {
                                v = Math.abs(fill.filters.shadows);
                                color = "rgba(255,255,255,".concat(v, ")");
                                if (fill.filters.shadows < 0) {
                                    color = "rgba(0,0,0,".concat(v, ")");
                                }
                                dom.filters.push(new j_css_filters_1.DropShadowFilter({
                                    value: {
                                        x: '0',
                                        y: '0',
                                        blur: '2px',
                                        color: color
                                    }
                                }));
                            }
                        }
                        _h.label = 10;
                    case 10:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_3_1 = _h.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, dom];
                }
            });
        });
    };
    // 处理边框
    BaseConverter.prototype.convertStrokes = function (node, dom, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, stroke, _c, img, e_4_1;
            var e_4, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (node.type === 'BOOLEAN_OPERATION')
                            return [2 /*return*/, dom];
                        if (!(node.strokes && node.strokes.length)) return [3 /*break*/, 14];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 11, 12, 13]);
                        _a = __values(node.strokes), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 10];
                        stroke = _b.value;
                        if (stroke.visible === false)
                            return [3 /*break*/, 9];
                        if (stroke.color) {
                            if (typeof stroke.opacity !== 'undefined')
                                stroke.color.a = stroke.opacity;
                            dom.style.outlineColor = j_design_util_1.util.colorToString(stroke.color, 255);
                        }
                        _c = stroke.type;
                        switch (_c) {
                            case types_1.PaintType.SOLID: return [3 /*break*/, 3];
                            case types_1.PaintType.GRADIENT_LINEAR: return [3 /*break*/, 4];
                            case types_1.PaintType.GRADIENT_DIAMOND: return [3 /*break*/, 5];
                            case types_1.PaintType.GRADIENT_ANGULAR: return [3 /*break*/, 5];
                            case types_1.PaintType.GRADIENT_RADIAL: return [3 /*break*/, 5];
                            case types_1.PaintType.IMAGE: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 9];
                    case 3:
                        {
                            dom.style.outlineStyle = 'solid';
                            return [3 /*break*/, 9];
                        }
                        _e.label = 4;
                    case 4:
                        {
                            dom.style.borderImageSource = this.convertLinearGradient(stroke, dom, container);
                            return [3 /*break*/, 9];
                        }
                        _e.label = 5;
                    case 5:
                        {
                            dom.style.borderImageSource = this.convertRadialGradient(stroke, dom, container);
                            return [3 /*break*/, 9];
                        }
                        _e.label = 6;
                    case 6:
                        if (!(option && option.getImage)) return [3 /*break*/, 8];
                        return [4 /*yield*/, option.getImage(stroke.imageRef)];
                    case 7:
                        img = _e.sent();
                        if (img)
                            dom.style.borderImageSource = "url(".concat(img, ")");
                        _e.label = 8;
                    case 8:
                        switch (stroke.scaleMode) {
                            case types_1.PaintSolidScaleMode.FILL: {
                                dom.style.borderImageSlice = 'fill';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.FIT: {
                                dom.style.borderImageRepeat = 'space';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.STRETCH: {
                                dom.style.borderImageRepeat = 'stretch';
                                break;
                            }
                            // 平铺
                            case types_1.PaintSolidScaleMode.TILE: {
                                dom.style.borderImageRepeat = 'repeat';
                                break;
                            }
                        }
                        return [3 /*break*/, 9];
                    case 9:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_4_1 = _e.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 13:
                        if (node.strokeWeight) {
                            if (dom.style.outlineColor)
                                dom.style.outlineWidth = j_design_util_1.util.toPX(node.strokeWeight);
                            if (dom.style.borderImageSource)
                                dom.style.borderImageWidth = j_design_util_1.util.toPX(node.strokeWeight);
                        }
                        if (node.strokeDashes && node.strokeDashes.length) {
                            dom.style.outlineStyle = 'dashed';
                        }
                        _e.label = 14;
                    case 14: return [2 /*return*/, dom];
                }
            });
        });
    };
    // 是否是空的dom节点
    BaseConverter.prototype.isEmptyDom = function (dom) {
        if (dom.children && dom.children.length)
            return false;
        if (dom.text)
            return false;
        if (dom.type !== 'div')
            return false;
        if (dom.style.filter)
            return false;
        if (dom.style.borderImageSource || dom.style.backgroundImage || dom.style.background)
            return false;
        if (dom.style.backgroundColor && !this.isTransparentColor(dom.style.backgroundColor))
            return false;
        return true;
    };
    // 是否是透明色
    BaseConverter.prototype.isTransparentColor = function (color) {
        if (color == 'transparent')
            return true;
        if (color === 'rgba(0,0,0,0)' || /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\)/.test(color))
            return true;
        if (typeof color === 'object' && 'a' in color && color.a === 0)
            return true;
        return false;
    };
    // 转换线性渐变
    BaseConverter.prototype.convertLinearGradient = function (gradient, dom, container) {
        var e_5, _a;
        var handlePositions = gradient.gradientHandlePositions;
        var gradientStops = gradient.gradientStops;
        /**
         * 需要计算figma线性渐变位置百分比，因为把图形X和Y都标准化成0-1.所以我们可以认为它就是一个正方形，在figma上编缉的渐变2个点表示stops变化区域，需要计算这2点区域映射到图形的stop比
         */
        var size = this.getGradientSize(handlePositions);
        if (size) {
            try {
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
                for (var gradientStops_1 = __values(gradientStops), gradientStops_1_1 = gradientStops_1.next(); !gradientStops_1_1.done; gradientStops_1_1 = gradientStops_1.next()) {
                    var stop_1 = gradientStops_1_1.value;
                    var r = size.r * stop_1.position;
                    var p = {
                        x: r * size.cos + size.start.x,
                        y: r * size.sin + size.start.y,
                    };
                    var projection = size.getProjectionOnLine(p); // 得到平移后线上的投影点
                    /*const stopDom = this.createDomNode('div');
                    stopDom.style.top = projection.y*100 + '%';
                    stopDom.style.left = projection.x*100 + '%';
                    stopDom.style.backgroundColor = 'yellow';
                    stopDom.style.position = 'absolute';
                    stopDom.style.width = stopDom.style.height = '3px';
                    dom.children.push(stopDom);*/
                    var dx = projection.x - size.startInShape.x;
                    var dy = projection.y - size.startInShape.y;
                    stop_1.position = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                    // 如果交点在当前右边，则偏移量为负数
                    if (size.startInShape.x === 0 && size.startInShape.y === 0) {
                        if (p.x < 0 || p.y < 0)
                            stop_1.position = -stop_1.position;
                    }
                    else if (size.startInShape.x === 1 && size.startInShape.y === 0) {
                        if (p.x > 1 || p.y < 0)
                            stop_1.position = -stop_1.position;
                    }
                    else if (size.startInShape.x === 1 && size.startInShape.y === 1) {
                        if (p.y > 1 || p.x > 1)
                            stop_1.position = -stop_1.position;
                    }
                    else if (size.startInShape.x === 0 && size.startInShape.y === 1) {
                        if (p.x < 0 || p.y > 1)
                            stop_1.position = -stop_1.position;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (gradientStops_1_1 && !gradientStops_1_1.done && (_a = gradientStops_1.return)) _a.call(gradientStops_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        var linearGradient = "linear-gradient(".concat(this.getGradientDirection(handlePositions), ", ").concat(this.getGradientStops(gradientStops), ")");
        return linearGradient;
    };
    // 转换径向性渐变
    BaseConverter.prototype.convertRadialGradient = function (gradient, dom, container) {
        var handlePositions = gradient.gradientHandlePositions;
        var gradientStops = gradient.gradientStops;
        var radialGradient = "radial-gradient(".concat(this.getRadialGradientPosition(handlePositions), ", ").concat(this.getGradientStops(gradientStops), ")");
        return radialGradient;
    };
    // 生成渐变尺寸
    BaseConverter.prototype.getGradientSize = function (gradientHandlePositions) {
        if (!gradientHandlePositions || gradientHandlePositions.length < 2)
            return null;
        // 由于figma的渐变起始和终点是第一个和第二个坐标，但css是用的角度，这里要计算起始偏移和终点偏移，再计算stop的偏移比例，才是真实的css渐变比例
        var start = __assign({}, gradientHandlePositions[0]);
        var end = __assign({}, gradientHandlePositions[1]);
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var r = Math.sqrt(dx * dx + dy * dy);
        var cos = dx / r;
        var sin = dy / r;
        var m = dy / dx;
        // 计算渐变二点延长级起始点边与图形边的交点
        var startInShape = {
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
            else {
            }
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
            start: start,
            end: end,
            r: r,
            m: m,
            startInShape: startInShape,
            cos: cos,
            sin: sin,
            getProjectionOnLine: function (point) {
                if (this.start.x === this.end.x)
                    return { x: this.start.x, y: point.y };
                if (this.start.y === this.end.y)
                    return { x: point.x, y: this.start.y };
                // 新直线b，斜率不变m
                var b = this.startInShape.y - this.m * this.startInShape.x;
                var xPrime = (point.y - b + (point.x / this.m)) / (this.m + (1 / this.m));
                var yPrime = m * xPrime + b;
                return { x: xPrime, y: yPrime };
            }
        };
    };
    // 径向性位置
    BaseConverter.prototype.getRadialGradientPosition = function (gradientHandlePositions) {
        if (!gradientHandlePositions || !gradientHandlePositions.length)
            return 'center';
        // 大小位置跟起点的距离为渐变宽
        var dx = gradientHandlePositions[1].x - gradientHandlePositions[0].x;
        var dy = gradientHandlePositions[1].y - gradientHandlePositions[0].y;
        var rx = Math.sqrt(dx * dx + dy * dy) * 100;
        dx = gradientHandlePositions[2].x - gradientHandlePositions[0].x;
        dy = gradientHandlePositions[2].y - gradientHandlePositions[0].y;
        var ry = Math.sqrt(dx * dx + dy * dy) * 100;
        return "ellipse ".concat(rx, "% ").concat(ry, "% at ").concat(gradientHandlePositions[0].x * 100, "% ").concat(gradientHandlePositions[0].y * 100, "%");
    };
    // Helper function to get the gradient direction
    BaseConverter.prototype.getGradientDirection = function (gradientHandlePositions) {
        if (gradientHandlePositions.length >= 2) {
            var start = gradientHandlePositions[0];
            var end = gradientHandlePositions[1]; // Use the second handle, ignoring the last one
            // Calculate the angle in radians
            var angleRadians = Math.PI / 2 - j_design_util_1.util.getPointCoordRotation(start, end);
            //const angleRadians = Math.PI/2 - Math.atan2(end.y - start.y, end.x - start.x);
            return j_design_util_1.util.toDeg(j_design_util_1.util.radToDeg(angleRadians));
        }
        else {
            console.error("Insufficient handle positions for gradient calculation.");
            return ""; // or any default value
        }
    };
    // Helper function to get the gradient stops
    BaseConverter.prototype.getGradientStops = function (gradientStops) {
        // Constructing the gradient stops string based on received data
        var stopsString = gradientStops
            .map(function (stop) { return j_design_util_1.util.colorToString(stop.color, 255) + " ".concat(stop.position * 100, "%"); })
            .join(", ");
        return stopsString;
    };
    return BaseConverter;
}());
exports.BaseConverter = BaseConverter;
exports.default = BaseConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentConverter = void 0;
var baseNode_1 = __importDefault(require("./baseNode"));
var DocumentConverter = /** @class */ (function (_super) {
    __extends(DocumentConverter, _super);
    function DocumentConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentConverter.prototype.convert = function (node, dom, parentNode, page, option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                dom.type = 'div';
                dom.style.position = 'relative';
                return [2 /*return*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option)];
            });
        });
    };
    return DocumentConverter;
}(baseNode_1.default));
exports.DocumentConverter = DocumentConverter;
exports.default = DocumentConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELLIPSEConverter = void 0;
var polygon_1 = __importDefault(require("./polygon"));
var ELLIPSEConverter = /** @class */ (function (_super) {
    __extends(ELLIPSEConverter, _super);
    function ELLIPSEConverter() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        // 多边形标签名
        _this.polygonName = 'ellipse';
        return _this;
    }
    ELLIPSEConverter.prototype.convert = function (node, dom, parentNode, page, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 如果有角度信息，则用多边形来计算
                if (node.arcData && (node.arcData.endingAngle - node.arcData.startingAngle < Math.PI * 2)) {
                    this.polygonName = 'polygon';
                }
                else {
                    this.polygonName = 'ellipse';
                }
                return [2 /*return*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option, container)];
            });
        });
    };
    // 生成多边形路径
    ELLIPSEConverter.prototype.createPolygonPath = function (dom, node, container) {
        var pos = this.getPosition(dom, container);
        var center = {
            x: dom.bounds.width / 2 + pos.x,
            y: dom.bounds.height / 2 + pos.y
        };
        if (this.polygonName === 'polygon') {
            // 圆的半径
            var radius = Math.min(dom.bounds.width, dom.bounds.height) / 2;
            // 减去边框大小
            if (node.strokeWeight) {
                radius -= node.strokeWeight;
            }
            var points = this.createArcPoints(center, radius, node.arcData.startingAngle, node.arcData.endingAngle);
            // 有内圆
            if (node.arcData.innerRadius > 0) {
                var innerPoints = this.createArcPoints(center, radius * node.arcData.innerRadius, node.arcData.startingAngle, node.arcData.endingAngle);
                // 为了首尾相接，把内圆坐标反转
                points.push.apply(points, __spreadArray([], __read(innerPoints.reverse()), false));
            }
            dom.attributes['points'] = points.map(function (p) { return p.join(','); }).join(' ');
        }
        else {
            dom.attributes['cx'] = center.x + '';
            dom.attributes['cy'] = center.y + '';
            dom.attributes['rx'] = dom.bounds.width / 2 + '';
            dom.attributes['ry'] = dom.bounds.height / 2 + '';
        }
    };
    ELLIPSEConverter.prototype.createArcPoints = function (center, radius, startAngle, endAngle) {
        if (startAngle === void 0) { startAngle = 0; }
        if (endAngle === void 0) { endAngle = Math.PI * 2; }
        var step = 1 / radius;
        var points = [];
        //椭圆方程x=a*cos(r) ,y=b*sin(r)	
        for (var r = startAngle; r <= endAngle; r += step) {
            var x = Math.cos(r) * radius + center.x;
            var y = Math.sin(r) * radius + center.y;
            points.push([
                x, y
            ]);
        }
        return points;
    };
    return ELLIPSEConverter;
}(polygon_1.default));
exports.ELLIPSEConverter = ELLIPSEConverter;
exports.default = ELLIPSEConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAMEConverter = void 0;
var baseNode_1 = __importDefault(require("./baseNode"));
var FRAMEConverter = /** @class */ (function (_super) {
    __extends(FRAMEConverter, _super);
    function FRAMEConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FRAMEConverter.prototype.convert = function (node, dom, parentNode, page, option) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, child;
            var e_1, _c;
            return __generator(this, function (_d) {
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
                            try {
                                for (_a = __values(parentNode.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    child = _b.value;
                                    if (child.absoluteBoundingBox) {
                                        parentNode.absoluteBoundingBox.x = Math.min(parentNode.absoluteBoundingBox.x, child.absoluteBoundingBox.x);
                                        parentNode.absoluteBoundingBox.y = Math.min(parentNode.absoluteBoundingBox.y, child.absoluteBoundingBox.y);
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                    }
                }
                return [2 /*return*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option)];
            });
        });
    };
    return FRAMEConverter;
}(baseNode_1.default));
exports.FRAMEConverter = FRAMEConverter;
exports.default = FRAMEConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupConverter = void 0;
var frame_1 = __importDefault(require("./frame"));
var GroupConverter = /** @class */ (function (_super) {
    __extends(GroupConverter, _super);
    function GroupConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupConverter.prototype.convert = function (node, dom, parentNode, page, option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option)];
            });
        });
    };
    return GroupConverter;
}(frame_1.default));
exports.GroupConverter = GroupConverter;
exports.default = GroupConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINEConverter = void 0;
var polygon_1 = __importDefault(require("./polygon"));
var LINEConverter = /** @class */ (function (_super) {
    __extends(LINEConverter, _super);
    function LINEConverter() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.polygonName = 'line';
        return _this;
    }
    LINEConverter.prototype.convert = function (node, dom, parentNode, page, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option, container)];
                    case 1:
                        res = _a.sent();
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
                        return [2 /*return*/, res];
                }
            });
        });
    };
    // 生成多边形路径
    LINEConverter.prototype.createPolygonPath = function (dom, node, container) {
        var pos = this.getPosition(dom, container);
        dom.attributes['x1'] = pos.x + '';
        dom.attributes['y1'] = pos.y + '';
        dom.attributes['x2'] = (pos.x + dom.bounds.width) + '';
        dom.attributes['y2'] = (pos.y + dom.bounds.height) + '';
    };
    return LINEConverter;
}(polygon_1.default));
exports.LINEConverter = LINEConverter;
exports.default = LINEConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageConverter = void 0;
var baseNode_1 = __importDefault(require("./baseNode"));
var PageConverter = /** @class */ (function (_super) {
    __extends(PageConverter, _super);
    function PageConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageConverter.prototype.convert = function (node, dom, parentNode, page, option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                dom.type = 'page';
                dom.style.position = 'relative';
                return [2 /*return*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option)];
            });
        });
    };
    return PageConverter;
}(baseNode_1.default));
exports.PageConverter = PageConverter;
exports.default = PageConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonConverter = void 0;
var types_1 = require("../common/types");
var j_design_util_1 = require("j-design-util");
var baseNode_1 = __importDefault(require("./baseNode"));
var PolygonConverter = /** @class */ (function (_super) {
    __extends(PolygonConverter, _super);
    function PolygonConverter() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        // 多边形标签名
        _this.polygonName = 'polygon';
        return _this;
    }
    PolygonConverter.prototype.convert = function (node, dom, parentNode, page, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var polygon, defs, mask_1, mask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        polygon = dom;
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
                            if (!defs) {
                                defs = this.createDomNode('defs');
                                container.children.push(defs);
                            }
                            polygon.type = this.polygonName;
                        }
                        // 如果是蒙板
                        if (node.isMask) {
                            mask_1 = this.createDomNode('mask');
                            mask_1.id = 'mask_' + j_design_util_1.util.uuid();
                            defs.children.push(mask_1);
                            mask_1.children.push(polygon);
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
                        return [4 /*yield*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option, container)];
                    case 1:
                        // svg外转用定位和大小，其它样式都给子元素
                        dom = _a.sent();
                        polygon.bounds = dom.bounds;
                        mask = this.getMask(container);
                        if (node.isMask) {
                            if (mask) {
                                mask.attributes['x'] = polygon.bounds.x + '';
                                mask.attributes['y'] = polygon.bounds.y + '';
                                mask.attributes['width'] = polygon.bounds.width + '';
                                mask.attributes['height'] = polygon.bounds.height + '';
                            }
                        }
                        else if (mask) {
                            polygon.style.mask = "url(#".concat(mask.id, ")");
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
                        return [2 /*return*/, dom];
                }
            });
        });
    };
    // 获取定位
    PolygonConverter.prototype.getPosition = function (dom, container) {
        var isAbsolute = !dom.isMask && container && container.id !== dom.id;
        var left = isAbsolute ? dom.bounds.x : 0;
        var top = isAbsolute ? dom.bounds.y : 0;
        return {
            x: left,
            y: top
        };
    };
    // 生成多边形路径
    PolygonConverter.prototype.createPolygonPath = function (dom, node, container) {
        var pos = this.getPosition(dom, container);
        var points = [
            [pos.x, pos.y].join(','),
            [pos.x + dom.bounds.width, pos.y].join(','),
            [pos.x + dom.bounds.width, pos.y + dom.bounds.height].join(','),
            [pos.x, pos.y + dom.bounds.height].join(','),
        ];
        dom.attributes['points'] = points.join(' ');
    };
    // 获取蒙板
    PolygonConverter.prototype.getMask = function (container) {
        var e_1, _a;
        var _b;
        var defs = container.children[0];
        if ((_b = defs.children) === null || _b === void 0 ? void 0 : _b.length) {
            try {
                for (var _c = __values(defs.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var child = _d.value;
                    if (child.type === 'mask')
                        return child;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return null;
    };
    // 用id获取当前图形
    PolygonConverter.prototype.getPolygon = function (node, dom) {
        var e_2, _a;
        var _b;
        if (dom.children && dom.children.length) {
            try {
                for (var _c = __values(dom.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var child = _d.value;
                    if (child.id === node.id || ((_b = child.figmaData) === null || _b === void 0 ? void 0 : _b.id) === node.id)
                        return child;
                    if (child.children && child.children.length) {
                        var d = this.getPolygon(node, child);
                        if (d && d !== child)
                            return d;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        //if(dom.figmaData?.id === node.id) return dom;
        return dom;
    };
    // 处理填充
    PolygonConverter.prototype.convertFills = function (node, dom, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var polygon, _a, _b, fill, _c, e_3_1;
            var e_3, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!node.fills) return [3 /*break*/, 14];
                        polygon = this.getPolygon(node, container || dom);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 11, 12, 13]);
                        _a = __values(node.fills), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 10];
                        fill = _b.value;
                        if (fill.visible === false)
                            return [3 /*break*/, 9];
                        _c = fill.type;
                        switch (_c) {
                            case types_1.PaintType.SOLID: return [3 /*break*/, 3];
                            case types_1.PaintType.GRADIENT_LINEAR: return [3 /*break*/, 4];
                            case types_1.PaintType.GRADIENT_DIAMOND: return [3 /*break*/, 5];
                            case types_1.PaintType.GRADIENT_ANGULAR: return [3 /*break*/, 5];
                            case types_1.PaintType.GRADIENT_RADIAL: return [3 /*break*/, 5];
                            case types_1.PaintType.IMAGE: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 3:
                        {
                            if (typeof fill.opacity !== 'undefined')
                                fill.color.a = fill.opacity;
                            polygon.style.fill = j_design_util_1.util.colorToString(fill.color, 255);
                            return [3 /*break*/, 8];
                        }
                        _e.label = 4;
                    case 4:
                        {
                            polygon.style.fill = this.convertLinearGradient(fill, dom, container);
                            return [3 /*break*/, 8];
                        }
                        _e.label = 5;
                    case 5:
                        {
                            polygon.style.fill = this.convertRadialGradient(fill, dom, container);
                            return [3 /*break*/, 8];
                        }
                        _e.label = 6;
                    case 6: return [4 /*yield*/, _super.prototype.convertFills.call(this, node, polygon, option, container)];
                    case 7:
                        _e.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        // 不支持的模式，直接透明
                        switch (fill.blendMode) {
                            case types_1.BlendMode.SCREEN: {
                                dom.style.opacity = '0';
                                break;
                            }
                        }
                        _e.label = 9;
                    case 9:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 13:
                        // 默认透明
                        if (!polygon.style.fill)
                            polygon.style.fill = 'transparent';
                        _e.label = 14;
                    case 14: return [2 /*return*/, dom];
                }
            });
        });
    };
    // 处理边框
    PolygonConverter.prototype.convertStrokes = function (node, dom, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            var polygon, _a, _b, stroke;
            var e_4, _c;
            return __generator(this, function (_d) {
                polygon = this.getPolygon(node, container || dom);
                if (node.strokes && node.strokes.length) {
                    try {
                        for (_a = __values(node.strokes), _b = _a.next(); !_b.done; _b = _a.next()) {
                            stroke = _b.value;
                            if (stroke.visible === false)
                                continue;
                            if (stroke.color) {
                                if (typeof stroke.opacity !== 'undefined')
                                    stroke.color.a = stroke.opacity;
                                polygon.attributes['stroke'] = j_design_util_1.util.colorToString(stroke.color, 255);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    if (node.strokeWeight) {
                        if (dom.style.outlineColor)
                            dom.style.outlineWidth = j_design_util_1.util.toPX(node.strokeWeight);
                        if (dom.style.borderImageSource)
                            dom.style.borderImageWidth = j_design_util_1.util.toPX(node.strokeWeight);
                    }
                    if (node.strokeDashes && node.strokeDashes.length) {
                        polygon.attributes['stroke-dasharray'] = node.strokeDashes.join(',');
                    }
                }
                if (node.strokeWeight) {
                    polygon.attributes['stroke-width'] = node.strokeWeight.toString();
                }
                if (node.strokeAlign) {
                    //polygon.attributes['stroke-align'] = node.strokeAlign;
                }
                if (node.strokeCap) {
                    polygon.style.strokeLinecap = node.strokeCap;
                }
                if (node.strokeJoin) {
                    polygon.style.strokeLinejoin = node.strokeJoin;
                }
                return [2 /*return*/, dom];
            });
        });
    };
    // 转换线性渐变
    PolygonConverter.prototype.convertLinearGradient = function (gradient, dom, container) {
        var _a;
        container = container || dom;
        if (container.type !== 'svg')
            return _super.prototype.convertLinearGradient.call(this, gradient, dom, container);
        var defs = container.children[0];
        var gradientDom = this.createDomNode('linearGradient');
        gradientDom.id = 'gradient_' + j_design_util_1.util.uuid();
        var handlePositions = gradient.gradientHandlePositions;
        if (handlePositions && handlePositions.length > 1) {
            gradientDom.attributes['x1'] = gradientDom.x1 = (handlePositions[0].x) * 100 + '%';
            gradientDom.attributes['y1'] = gradientDom.y1 = (handlePositions[0].y) * 100 + '%';
            gradientDom.attributes['x2'] = gradientDom.x2 = (handlePositions[1].x) * 100 + '%';
            gradientDom.attributes['y2'] = gradientDom.y2 = (handlePositions[1].y) * 100 + '%';
        }
        var gradientStops = gradient.gradientStops;
        var stops = this.getGradientStopDoms(gradientStops);
        (_a = gradientDom.children).push.apply(_a, __spreadArray([], __read(stops), false));
        defs.children.push(gradientDom);
        return "url(#".concat(gradientDom.id, ")");
    };
    // 转换径向性渐变
    PolygonConverter.prototype.convertRadialGradient = function (gradient, dom, container) {
        var _a;
        container = container || dom;
        if (container.type !== 'svg')
            return _super.prototype.convertRadialGradient.call(this, gradient, dom, container);
        var defs = container.children[0];
        if (!defs)
            return '';
        var gradientDom = this.createDomNode('radialGradient');
        gradientDom.id = 'gradient_' + j_design_util_1.util.uuid();
        var handlePositions = gradient.gradientHandlePositions;
        // 该字段包含三个矢量，每个矢量都是归一化对象空间中的一个位置（归一化对象空间是如果对象的边界框的左上角是（0，0），右下角是（1,1））。第一个位置对应于渐变的开始（为了计算渐变停止，值为0），第二个位置是渐变的结束（值为1），第三个手柄位置决定渐变的宽度。
        if (handlePositions && handlePositions.length > 2) {
            gradientDom.attributes['fx'] = gradientDom.fx = Math.round(handlePositions[0].x * 100) + '%';
            gradientDom.attributes['fy'] = gradientDom.fy = Math.round(handlePositions[0].y * 100) + '%';
            gradientDom.attributes['cx'] = gradientDom.cx = gradientDom.fx;
            gradientDom.attributes['cy'] = gradientDom.cy = gradientDom.fy;
            // 大小位置跟起点的距离为渐变宽
            var dx = handlePositions[1].x - handlePositions[0].x;
            var dy = handlePositions[1].y - handlePositions[0].y;
            var r = Math.sqrt(dx * dx + dy * dy);
            gradientDom.attributes['r'] = gradientDom.r = Math.round(r * 100) + '%';
        }
        var gradientStops = gradient.gradientStops;
        var stops = this.getGradientStopDoms(gradientStops);
        (_a = gradientDom.children).push.apply(_a, __spreadArray([], __read(stops), false));
        defs.children.push(gradientDom);
        return "url(#".concat(gradientDom.id, ")");
    };
    // Helper function to get the gradient stops
    PolygonConverter.prototype.getGradientStopDoms = function (gradientStops) {
        var e_5, _a;
        var stops = [];
        try {
            for (var gradientStops_1 = __values(gradientStops), gradientStops_1_1 = gradientStops_1.next(); !gradientStops_1_1.done; gradientStops_1_1 = gradientStops_1.next()) {
                var s = gradientStops_1_1.value;
                var stop_1 = this.createDomNode('stop');
                stop_1.attributes['offset'] = stop_1.offset = "".concat(Math.round(s.position * 100), "%");
                stop_1.style.stopColor = j_design_util_1.util.colorToString(s.color, 255);
                stops.push(stop_1);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (gradientStops_1_1 && !gradientStops_1_1.done && (_a = gradientStops_1.return)) _a.call(gradientStops_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return stops;
    };
    return PolygonConverter;
}(baseNode_1.default));
exports.PolygonConverter = PolygonConverter;
exports.default = PolygonConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECTANGLEConverter = void 0;
var polygon_1 = __importDefault(require("./polygon"));
var RECTANGLEConverter = /** @class */ (function (_super) {
    __extends(RECTANGLEConverter, _super);
    function RECTANGLEConverter() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.polygonName = 'path';
        return _this;
    }
    RECTANGLEConverter.prototype.convert = function (node, dom, parentNode, page, option, container) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option, container)];
            });
        });
    };
    // 生成多边形路径
    RECTANGLEConverter.prototype.createPolygonPath = function (dom, node, container) {
        var pos = this.getPosition(dom, container);
        //dom.attributes['x'] = pos.x + '';
        //dom.attributes['y'] = pos.y + '';
        //dom.attributes['width'] = dom.bounds.width + '';
        //dom.attributes['height'] = dom.bounds.height + '';
        var path = [];
        var defaultRadius = node.cornerRadius || 0;
        var _a = __read(node.rectangleCornerRadii || [defaultRadius, defaultRadius, defaultRadius, defaultRadius], 4), r1 = _a[0], r2 = _a[1], r3 = _a[2], r4 = _a[3];
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
    };
    return RECTANGLEConverter;
}(polygon_1.default));
exports.RECTANGLEConverter = RECTANGLEConverter;
exports.default = RECTANGLEConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarConverter = void 0;
var polygon_1 = __importDefault(require("./polygon"));
// 五角星
var StarConverter = /** @class */ (function (_super) {
    __extends(StarConverter, _super);
    function StarConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 生成多边形路径
    StarConverter.prototype.createPolygonPath = function (dom, node, container) {
        var pos = this.getPosition(dom, container);
        var radius = Math.min(dom.bounds.width, dom.bounds.height) / 2; // 画五角星的半径
        var center = {
            x: dom.bounds.width / 2 + pos.x,
            y: dom.bounds.height / 2 + pos.y
        };
        var point1 = [center.x, 0]; // 顶点
        var stepAngle = Math.PI * 2 / 5; // 圆分成五份
        var angle2 = Math.PI / 2 - stepAngle; // 右上角的点的角度
        var point2 = [
            center.x + Math.cos(angle2) * radius,
            center.y - Math.sin(angle2) * radius,
        ];
        var angle3 = stepAngle - angle2;
        var point3 = [
            center.x + Math.cos(angle3) * radius,
            center.y + Math.sin(angle3) * radius,
        ];
        var point4 = [
            center.x - Math.cos(angle3) * radius,
            center.y + Math.sin(angle3) * radius,
        ];
        var point5 = [
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
    };
    return StarConverter;
}(polygon_1.default));
exports.StarConverter = StarConverter;
exports.default = StarConverter;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXTConverter = void 0;
var types_1 = require("../common/types");
var j_design_util_1 = require("j-design-util");
var baseNode_1 = __importDefault(require("./baseNode"));
var TEXTConverter = /** @class */ (function (_super) {
    __extends(TEXTConverter, _super);
    function TEXTConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TEXTConverter.prototype.convert = function (node, dom, parentNode, page, option) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var res, isSingleLine, w;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dom.type = 'span';
                        if (node.characters)
                            dom.text = dom.data.text = node.characters;
                        return [4 /*yield*/, _super.prototype.convert.call(this, node, dom, parentNode, page, option)];
                    case 1:
                        res = _c.sent();
                        isSingleLine = false;
                        // 如果行高好高度一致,则表示单行文本，可以不指定宽度
                        if (((_a = dom.bounds) === null || _a === void 0 ? void 0 : _a.height) < ((_b = node.style) === null || _b === void 0 ? void 0 : _b.fontSize) * 2) {
                            isSingleLine = true;
                            w = this.testTextWidth(dom);
                            dom.data.width = Math.max(w, j_design_util_1.util.toNumber(dom.data.width));
                        }
                        else {
                            //dom.style.minWidth = util.toPX(dom.data.width);
                            dom.data.width = dom.bounds.width;
                        }
                        return [4 /*yield*/, this.convertCharacterStyleOverrides(node, res, option, isSingleLine)];
                    case 2:
                        _c.sent(); // 处理分字样式
                        dom.style.width = j_design_util_1.util.toPX(++dom.data.width);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    // 解析字体多样式
    TEXTConverter.prototype.convertCharacterStyleOverrides = function (node, dom, option, isSingleLine) {
        if (isSingleLine === void 0) { isSingleLine = false; }
        return __awaiter(this, void 0, void 0, function () {
            var width, text, index, lastStyleOverrides, lastDom, s, f, style, fDom, _a, _b, c, w;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        width = 0;
                        if (!(node.characterStyleOverrides && node.characterStyleOverrides.length && node.styleOverrideTable)) return [3 /*break*/, 8];
                        text = dom.text || '';
                        index = 0;
                        lastStyleOverrides = -1;
                        lastDom = null;
                        _d.label = 1;
                    case 1:
                        if (!(index < node.characterStyleOverrides.length)) return [3 /*break*/, 7];
                        s = node.characterStyleOverrides[index];
                        f = text[index];
                        if (!f)
                            return [3 /*break*/, 6];
                        if (!(!lastDom || lastStyleOverrides !== s)) return [3 /*break*/, 5];
                        lastDom = this.createDomNode('span');
                        lastDom.text = '';
                        lastDom.style.position = 'relative'; // 连续字符不能用绝对定位
                        style = node.styleOverrideTable[s];
                        if (!style) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.convertFills(style, lastDom, option)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.convertStyle(style, lastDom, option)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        dom.children.push(lastDom);
                        _d.label = 5;
                    case 5:
                        lastDom.text += f;
                        lastStyleOverrides = s;
                        _d.label = 6;
                    case 6:
                        index++;
                        return [3 /*break*/, 1];
                    case 7:
                        // 还有未处理完的，则加到后面
                        if (text.length > index) {
                            fDom = this.createDomNode('span');
                            fDom.text = text.substring(index);
                            dom.children.push(fDom);
                        }
                        try {
                            for (_a = __values(dom.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                                c = _b.value;
                                // 单行需要计算宽度
                                if (isSingleLine) {
                                    w = this.testTextWidth(c, dom);
                                    width += w;
                                }
                                // 处理完样式后，需要删除可以继承父的样式
                                this.checkParentAndChildStyle(dom, c);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        dom.data.text = dom.text = '';
                        dom.type = 'div';
                        _d.label = 8;
                    case 8:
                        // 这种方式文本宽度需要重新计算
                        dom.data.width = Math.max(width, j_design_util_1.util.toNumber(dom.data.width));
                        return [2 /*return*/];
                }
            });
        });
    };
    // 处理填充, 文本的fill就是字体的颜色
    TEXTConverter.prototype.convertFills = function (node, dom, option) {
        return __awaiter(this, void 0, void 0, function () {
            var fill, _a, img;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!node.isMaskOutline && node.fills && node.fills.length)) return [3 /*break*/, 8];
                        fill = node.fills[0];
                        _a = fill.type;
                        switch (_a) {
                            case types_1.PaintType.SOLID: return [3 /*break*/, 1];
                            case types_1.PaintType.GRADIENT_LINEAR: return [3 /*break*/, 2];
                            case types_1.PaintType.GRADIENT_RADIAL: return [3 /*break*/, 3];
                            case types_1.PaintType.IMAGE: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        {
                            dom.style.color = j_design_util_1.util.colorToString(fill.color, 255);
                            return [3 /*break*/, 7];
                        }
                        _b.label = 2;
                    case 2:
                        {
                            dom.style.background = this.convertLinearGradient(fill, dom);
                            dom.style.backgroundClip = 'text';
                            if (!dom.style.color)
                                dom.style.color = 'transparent';
                            return [3 /*break*/, 7];
                        }
                        _b.label = 3;
                    case 3:
                        {
                            dom.style.background = this.convertRadialGradient(fill, dom);
                            dom.style.backgroundClip = 'text';
                            if (!dom.style.color)
                                dom.style.color = 'transparent';
                            return [3 /*break*/, 7];
                        }
                        _b.label = 4;
                    case 4:
                        if (!(option && option.getImage)) return [3 /*break*/, 6];
                        return [4 /*yield*/, option.getImage(fill.imageRef)];
                    case 5:
                        img = _b.sent();
                        if (img)
                            dom.style.background = "url(".concat(img, ")");
                        dom.style.backgroundClip = 'text';
                        if (!dom.style.color)
                            dom.style.color = 'transparent';
                        _b.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        switch (fill.scaleMode) {
                            case types_1.PaintSolidScaleMode.FILL: {
                                dom.style.backgroundSize = 'cover';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.FIT: {
                                dom.style.backgroundSize = 'contain';
                                break;
                            }
                            case types_1.PaintSolidScaleMode.STRETCH: {
                                dom.style.backgroundSize = '100% 100%';
                                break;
                            }
                            // 平铺
                            case types_1.PaintSolidScaleMode.TILE: {
                                dom.style.backgroundRepeat = 'repeat';
                                break;
                            }
                        }
                        _b.label = 8;
                    case 8: return [2 /*return*/, dom];
                }
            });
        });
    };
    // 检查父子相同的字体样式，如果子元素没有的样式，继承自父的
    TEXTConverter.prototype.checkParentAndChildStyle = function (parent, child) {
        var e_2, _a;
        if (!parent.style || !child.style)
            return;
        var checkStyles = ['color', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'font', 'letterSpacing', 'lineHeight', 'textAlign', 'verticalAlign'];
        try {
            for (var checkStyles_1 = __values(checkStyles), checkStyles_1_1 = checkStyles_1.next(); !checkStyles_1_1.done; checkStyles_1_1 = checkStyles_1.next()) {
                var n = checkStyles_1_1.value;
                if (parent.style[n] && !child.style[n])
                    child.style[n] = parent.style[n];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (checkStyles_1_1 && !checkStyles_1_1.done && (_a = checkStyles_1.return)) _a.call(checkStyles_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    // 测试字宽度
    TEXTConverter.prototype.testTextWidth = function (dom, parent) {
        var span = document.createElement('span');
        Object.assign(span.style, (parent === null || parent === void 0 ? void 0 : parent.style) || {}, dom.style);
        span.style.width = 'auto';
        span.style.position = 'absolute';
        span.innerText = dom.text;
        span.style.visibility = 'hidden';
        document.body.appendChild(span);
        var w = span.offsetWidth || span.clientWidth;
        if (dom.style.letterSpacing) {
            var v = j_design_util_1.util.toNumber(dom.style.letterSpacing);
            w += v;
        }
        document.body.removeChild(span);
        return w;
    };
    return TEXTConverter;
}(baseNode_1.default));
exports.TEXTConverter = TEXTConverter;
exports.default = TEXTConverter;
