"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "convert", {
  enumerable: true,
  get: function get() {
    return _node.convert;
  }
});
exports["default"] = void 0;
exports.getFigmaFileImages = getFigmaFileImages;
exports.getFigmaImage = getFigmaImage;
exports.loadFigmaFile = loadFigmaFile;
Object.defineProperty(exports, "nodeToDom", {
  enumerable: true,
  get: function get() {
    return _node.nodeToDom;
  }
});
Object.defineProperty(exports, "util", {
  enumerable: true,
  get: function get() {
    return _jDesignUtil.util;
  }
});
var _jDesignUtil = require("j-design-util");
var _node = require("./figmaTypes/node");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * 获取figma文件
 * @param fileId
 * @param token
 */
function loadFigmaFile(_x, _x2) {
  return _loadFigmaFile.apply(this, arguments);
} // 获取文件所有图片
function _loadFigmaFile() {
  _loadFigmaFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(fileId, token) {
    var url, option, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = "https://api.figma.com/v1/files/".concat(fileId);
          option = {
            headers: {
              "X-Figma-Token": token
            }
          };
          _context.next = 4;
          return _jDesignUtil.util.request(url, option);
        case 4:
          data = _context.sent;
          return _context.abrupt("return", JSON.parse(data));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _loadFigmaFile.apply(this, arguments);
}
function getFigmaFileImages(_x3, _x4) {
  return _getFigmaFileImages.apply(this, arguments);
} // 获取图片
function _getFigmaFileImages() {
  _getFigmaFileImages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(fileId, token) {
    var url, option, data, images;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = "https://api.figma.com/v1/files/".concat(fileId, "/images");
          option = {
            headers: {
              "X-Figma-Token": token
            }
          };
          _context2.next = 4;
          return _jDesignUtil.util.request(url, option);
        case 4:
          data = _context2.sent;
          images = JSON.parse(data);
          if (!(images.meta && images.meta.images)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", images.meta.images);
        case 8:
          return _context2.abrupt("return", {});
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getFigmaFileImages.apply(this, arguments);
}
function getFigmaImage(_x5, _x6, _x7) {
  return _getFigmaImage.apply(this, arguments);
}
function _getFigmaImage() {
  _getFigmaImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(key, token, ids) {
    var url, option, data, images;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          url = "https://api.figma.com/v1/images/".concat(key, "?ids=").concat(encodeURIComponent(ids));
          option = {
            headers: {
              "X-Figma-Token": token
            }
          };
          _context3.next = 4;
          return _jDesignUtil.util.request(url, option);
        case 4:
          data = _context3.sent;
          images = JSON.parse(data);
          if (!(images.meta && images.meta.images)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", images.meta.images);
        case 8:
          return _context3.abrupt("return", images);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getFigmaImage.apply(this, arguments);
}
var _default = exports["default"] = _node.convert;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BaseConverter = void 0;
var _types = require("../common/types");
var _jDesignUtil = require("j-design-util");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseConverter = exports.BaseConverter = /*#__PURE__*/function () {
  function BaseConverter() {
    _classCallCheck(this, BaseConverter);
  }
  _createClass(BaseConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        var _i, _arr, padding, v;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dom.style = dom.style || {};
              // 位置
              dom.bounds = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
              };
              if (node.absoluteBoundingBox) {
                dom.bounds.width = node.absoluteBoundingBox.width;
                dom.bounds.height = node.absoluteBoundingBox.height;
                // 相对于父位置
                if (parentNode && parentNode.absoluteBoundingBox) {
                  dom.data.left = dom.bounds.x = node.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x;
                  dom.data.top = dom.bounds.y = node.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y;
                }
                // 没有父元素，就认为约对定位为0
                else {
                  dom.data.left = dom.bounds.x = 0;
                  dom.data.top = dom.bounds.y = 0;
                }
                dom.style.left = _jDesignUtil.util.toPX(dom.bounds.x).toString();
                dom.style.top = _jDesignUtil.util.toPX(dom.bounds.y).toString();
                dom.absoluteBoundingBox = node.absoluteBoundingBox;
              }
              // 背景色
              if (node.backgroundColor) dom.style.backgroundColor = _jDesignUtil.util.colorToString(node.backgroundColor, 255);
              if (node.cornerRadius) {
                dom.style.borderRadius = _jDesignUtil.util.toPX(node.cornerRadius);
              } else if (node.rectangleCornerRadii) {
                dom.style.borderRadius = node.rectangleCornerRadii.map(function (p) {
                  return _jDesignUtil.util.toPX(p);
                }).join(' ');
              }
              if (node.opacity) dom.style.opacity = node.opacity.toString();
              if (node.constraints) {
                if (node.constraints.vertical) {
                  dom.style.verticalAlign = {
                    'CENTER': 'middle',
                    'TOP_BOTTOM': 'super',
                    'SCALE': 'center'
                  }[node.constraints.vertical];
                }
                if (node.constraints.horizontal) {
                  dom.style.textAlign = {
                    'SCALE': 'center',
                    'LEFT_RIGHT': 'justify-all'
                  }[node.constraints.vertical];
                }
              }
              // 旋转
              if (node.rotation) {
                dom.data.rotation = node.rotation;
                dom.style.transform = "rotate(".concat(_jDesignUtil.util.toRad(node.rotation), ")");
              }
              // 裁剪超出区域
              if (node.clipsContent === true || parentNode && parentNode.clipsContent === true) dom.style.overflow = 'hidden';
              dom.preserveRatio = node.preserveRatio;
              // padding
              for (_i = 0, _arr = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']; _i < _arr.length; _i++) {
                padding = _arr[_i];
                v = node[padding];
                if (v) {
                  dom.style[padding] = _jDesignUtil.util.toPX(v);
                  if (['paddingLeft', 'paddingRight'].includes(padding)) dom.bounds.width -= v;else dom.bounds.height -= v;
                }
              }
              _context.next = 13;
              return this.convertStyle(node, dom, option);
            case 13:
              _context.next = 15;
              return this.convertFills(node, dom, option);
            case 15:
              _context.next = 17;
              return this.convertStrokes(node, dom, option);
            case 17:
              _context.next = 19;
              return this.convertEffects(node, dom, option);
            case 19:
              // 滤镜
              dom.data.width = dom.bounds.width;
              dom.data.height = dom.bounds.height;
              dom.style.width = _jDesignUtil.util.toPX(dom.bounds.width).toString();
              dom.style.height = _jDesignUtil.util.toPX(dom.bounds.height).toString();
              return _context.abrupt("return", dom);
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }() // 生成节点对象
  }, {
    key: "createDomNode",
    value: function createDomNode(type, option) {
      var dom = _objectSpread(_objectSpread({
        data: {},
        style: {},
        children: []
      }, option), {}, {
        type: type
      });
      return dom;
    }
    // 转换style
  }, {
    key: "convertStyle",
    value: function () {
      var _convertStyle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(node, dom, option) {
        var style;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // @ts-ignore
              style = node.style || node;
              if (style) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return", dom);
            case 3:
              if (style.fontFamily) dom.style.fontFamily = style.fontFamily;
              if (style.fontSize) dom.style.fontSize = _jDesignUtil.util.toPX(style.fontSize);
              if (style.fontWeight) dom.style.fontWeight = style.fontWeight.toString();
              if (style.italic) dom.style.fontStyle = 'italic';
              if (style.letterSpacing) {
                dom.style.letterSpacing = _jDesignUtil.util.toPX(style.letterSpacing);
              }
              if (style.lineHeightPx) dom.style.lineHeight = _jDesignUtil.util.toPX(style.lineHeightPx);
              if (style.textAlignHorizontal) dom.style.textAlign = style.textAlignHorizontal;
              if (style.textAlignVertical) dom.style.verticalAlign = style.textAlignVertical;
              return _context2.abrupt("return", dom);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function convertStyle(_x5, _x6, _x7) {
        return _convertStyle.apply(this, arguments);
      }
      return convertStyle;
    }() // 转换滤镜
  }, {
    key: "convertEffects",
    value: function () {
      var _convertEffects = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(node, dom, option) {
        var _iterator, _step, effect;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!node.isMaskOutline && node.effects)) {
                _context3.next = 26;
                break;
              }
              dom.style.filter = dom.style.filter || '';
              _iterator = _createForOfIteratorHelper(node.effects);
              _context3.prev = 3;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context3.next = 18;
                break;
              }
              effect = _step.value;
              if (!(effect.visible === false)) {
                _context3.next = 9;
                break;
              }
              return _context3.abrupt("continue", 16);
            case 9:
              _context3.t0 = effect.type;
              _context3.next = _context3.t0 === _types.EffectType.DROP_SHADOW ? 12 : _context3.t0 === _types.EffectType.INNER_SHADOW ? 12 : _context3.t0 === _types.EffectType.LAYER_BLUR ? 14 : _context3.t0 === _types.EffectType.BACKGROUND_BLUR ? 14 : 16;
              break;
            case 12:
              dom.style.filter += " drop-shadow(".concat(_jDesignUtil.util.toPX(effect.offset.x), " ").concat(_jDesignUtil.util.toPX(effect.offset.y), " ").concat(_jDesignUtil.util.toPX(effect.radius), " ").concat(_jDesignUtil.util.colorToString(effect.color, 255), ")");
              return _context3.abrupt("break", 16);
            case 14:
              dom.style.filter += " blur(".concat(_jDesignUtil.util.toPX(effect.radius), ")");
              return _context3.abrupt("break", 16);
            case 16:
              _context3.next = 5;
              break;
            case 18:
              _context3.next = 23;
              break;
            case 20:
              _context3.prev = 20;
              _context3.t1 = _context3["catch"](3);
              _iterator.e(_context3.t1);
            case 23:
              _context3.prev = 23;
              _iterator.f();
              return _context3.finish(23);
            case 26:
              return _context3.abrupt("return", dom);
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 20, 23, 26]]);
      }));
      function convertEffects(_x8, _x9, _x10) {
        return _convertEffects.apply(this, arguments);
      }
      return convertEffects;
    }() // 处理填充
  }, {
    key: "convertFills",
    value: function () {
      var _convertFills = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(node, dom, option) {
        var _iterator2, _step2, fill, img;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!node.isMaskOutline && node.fills)) {
                _context4.next = 45;
                break;
              }
              _iterator2 = _createForOfIteratorHelper(node.fills);
              _context4.prev = 2;
              _iterator2.s();
            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context4.next = 37;
                break;
              }
              fill = _step2.value;
              if (!(fill.visible === false)) {
                _context4.next = 8;
                break;
              }
              return _context4.abrupt("continue", 35);
            case 8:
              _context4.t0 = fill.type;
              _context4.next = _context4.t0 === _types.PaintType.SOLID ? 11 : _context4.t0 === _types.PaintType.GRADIENT_LINEAR ? 13 : _context4.t0 === _types.PaintType.GRADIENT_RADIAL ? 15 : _context4.t0 === _types.PaintType.IMAGE ? 17 : 24;
              break;
            case 11:
              dom.style.backgroundColor = _jDesignUtil.util.colorToString(fill.color, 255);
              return _context4.abrupt("break", 24);
            case 13:
              dom.style.background = this.convertLinearGradient(fill, dom);
              return _context4.abrupt("break", 24);
            case 15:
              dom.style.background = this.convertRadialGradient(fill, dom);
              return _context4.abrupt("break", 24);
            case 17:
              if (!(option && option.getImage)) {
                _context4.next = 23;
                break;
              }
              _context4.next = 20;
              return option.getImage(fill.imageRef);
            case 20:
              img = _context4.sent;
              if (img) {
                if (dom.type === 'img') {
                  dom.url = img;
                } else {
                  dom.style.backgroundImage = "url(".concat(img, ")");
                }
              }
              dom.backgroundImageUrl = img || fill.imageRef;
            case 23:
              return _context4.abrupt("break", 24);
            case 24:
              _context4.t1 = fill.scaleMode;
              _context4.next = _context4.t1 === _types.PaintSolidScaleMode.FILL ? 27 : _context4.t1 === _types.PaintSolidScaleMode.FIT ? 29 : _context4.t1 === _types.PaintSolidScaleMode.STRETCH ? 31 : _context4.t1 === _types.PaintSolidScaleMode.TILE ? 33 : 35;
              break;
            case 27:
              dom.style.backgroundSize = 'cover';
              return _context4.abrupt("break", 35);
            case 29:
              dom.style.backgroundSize = 'contain';
              return _context4.abrupt("break", 35);
            case 31:
              dom.style.backgroundSize = '100% 100%';
              return _context4.abrupt("break", 35);
            case 33:
              dom.style.backgroundRepeat = 'repeat';
              return _context4.abrupt("break", 35);
            case 35:
              _context4.next = 4;
              break;
            case 37:
              _context4.next = 42;
              break;
            case 39:
              _context4.prev = 39;
              _context4.t2 = _context4["catch"](2);
              _iterator2.e(_context4.t2);
            case 42:
              _context4.prev = 42;
              _iterator2.f();
              return _context4.finish(42);
            case 45:
              return _context4.abrupt("return", dom);
            case 46:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[2, 39, 42, 45]]);
      }));
      function convertFills(_x11, _x12, _x13) {
        return _convertFills.apply(this, arguments);
      }
      return convertFills;
    }() // 处理边框
  }, {
    key: "convertStrokes",
    value: function () {
      var _convertStrokes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(node, dom, option) {
        var _iterator3, _step3, stroke, img;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(node.strokes && node.strokes.length)) {
                _context5.next = 47;
                break;
              }
              _iterator3 = _createForOfIteratorHelper(node.strokes);
              _context5.prev = 2;
              _iterator3.s();
            case 4:
              if ((_step3 = _iterator3.n()).done) {
                _context5.next = 37;
                break;
              }
              stroke = _step3.value;
              if (!(stroke.visible === false)) {
                _context5.next = 8;
                break;
              }
              return _context5.abrupt("continue", 35);
            case 8:
              if (stroke.color) {
                dom.style.outlineColor = _jDesignUtil.util.colorToString(stroke.color, 255);
              }
              _context5.t0 = stroke.type;
              _context5.next = _context5.t0 === _types.PaintType.SOLID ? 12 : _context5.t0 === _types.PaintType.GRADIENT_LINEAR ? 14 : _context5.t0 === _types.PaintType.GRADIENT_RADIAL ? 16 : _context5.t0 === _types.PaintType.IMAGE ? 18 : 35;
              break;
            case 12:
              dom.style.outlineStyle = 'solid';
              return _context5.abrupt("break", 35);
            case 14:
              dom.style.borderImageSource = this.convertLinearGradient(stroke, dom);
              return _context5.abrupt("break", 35);
            case 16:
              dom.style.borderImageSource = this.convertRadialGradient(stroke, dom);
              return _context5.abrupt("break", 35);
            case 18:
              if (!(option && option.getImage)) {
                _context5.next = 23;
                break;
              }
              _context5.next = 21;
              return option.getImage(stroke.imageRef);
            case 21:
              img = _context5.sent;
              if (img) dom.style.borderImageSource = "url(".concat(img, ")");
            case 23:
              _context5.t1 = stroke.scaleMode;
              _context5.next = _context5.t1 === _types.PaintSolidScaleMode.FILL ? 26 : _context5.t1 === _types.PaintSolidScaleMode.FIT ? 28 : _context5.t1 === _types.PaintSolidScaleMode.STRETCH ? 30 : _context5.t1 === _types.PaintSolidScaleMode.TILE ? 32 : 34;
              break;
            case 26:
              dom.style.borderImageSlice = 'fill';
              return _context5.abrupt("break", 34);
            case 28:
              dom.style.borderImageRepeat = 'space';
              return _context5.abrupt("break", 34);
            case 30:
              dom.style.borderImageRepeat = 'stretch';
              return _context5.abrupt("break", 34);
            case 32:
              dom.style.borderImageRepeat = 'repeat';
              return _context5.abrupt("break", 34);
            case 34:
              return _context5.abrupt("break", 35);
            case 35:
              _context5.next = 4;
              break;
            case 37:
              _context5.next = 42;
              break;
            case 39:
              _context5.prev = 39;
              _context5.t2 = _context5["catch"](2);
              _iterator3.e(_context5.t2);
            case 42:
              _context5.prev = 42;
              _iterator3.f();
              return _context5.finish(42);
            case 45:
              if (node.strokeWeight) {
                if (dom.style.outlineColor) dom.style.outlineWidth = _jDesignUtil.util.toPX(node.strokeWeight);
                if (dom.style.borderImageSource) dom.style.borderImageWidth = _jDesignUtil.util.toPX(node.strokeWeight);
              }
              if (node.strokeDashes && node.strokeDashes.length) {
                dom.style.outlineStyle = 'dashed';
              }
            case 47:
              return _context5.abrupt("return", dom);
            case 48:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[2, 39, 42, 45]]);
      }));
      function convertStrokes(_x14, _x15, _x16) {
        return _convertStrokes.apply(this, arguments);
      }
      return convertStrokes;
    }() // 转换线性渐变
  }, {
    key: "convertLinearGradient",
    value: function convertLinearGradient(gradient, dom) {
      var handlePositions = gradient.gradientHandlePositions;
      var gradientStops = gradient.gradientStops;
      /**
       * 需要计算figma线性渐变位置百分比，因为把图形X和Y都标准化成0-1.所以我们可以认为它就是一个正方形，在figma上编缉的渐变2个点表示stops变化区域，需要计算这2点区域映射到图形的stop比
       */
      var size = this.getGradientSize(handlePositions);
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
        var _iterator4 = _createForOfIteratorHelper(gradientStops),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var stop = _step4.value;
            var r = size.r * stop.position;
            var p = {
              x: r * size.cos + size.start.x,
              y: r * size.sin + size.start.y
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
            stop.position = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            // 如果交点在当前右边，则偏移量为负数
            if (size.startInShape.x === 0 && size.startInShape.y === 0) {
              if (p.x < 0 || p.y < 0) stop.position = -stop.position;
            } else if (size.startInShape.x === 1 && size.startInShape.y === 0) {
              if (p.x > 1 || p.y < 0) stop.position = -stop.position;
            } else if (size.startInShape.x === 1 && size.startInShape.y === 1) {
              if (p.y > 1 || p.x > 1) stop.position = -stop.position;
            } else if (size.startInShape.x === 0 && size.startInShape.y === 1) {
              if (p.x < 0 || p.y > 1) stop.position = -stop.position;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
      var linearGradient = "linear-gradient(".concat(this.getGradientDirection(handlePositions), ", ").concat(this.getGradientStops(gradientStops), ")");
      return linearGradient;
    }
    // 转换径向性渐变
  }, {
    key: "convertRadialGradient",
    value: function convertRadialGradient(gradient, dom) {
      var handlePositions = gradient.gradientHandlePositions;
      var gradientStops = gradient.gradientStops;
      var radialGradient = "radial-gradient(".concat(this.getRadialGradientPosition(handlePositions), ", ").concat(this.getGradientStops(gradientStops), ")");
      return radialGradient;
    }
    // 生成渐变尺寸
  }, {
    key: "getGradientSize",
    value: function getGradientSize(gradientHandlePositions) {
      if (!gradientHandlePositions || gradientHandlePositions.length < 2) return null;
      // 由于figma的渐变起始和终点是第一个和第二个坐标，但css是用的角度，这里要计算起始偏移和终点偏移，再计算stop的偏移比例，才是真实的css渐变比例
      var start = _objectSpread({}, gradientHandlePositions[0]);
      var end = _objectSpread({}, gradientHandlePositions[1]);
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
        else {}
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
      } else {
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
        getProjectionOnLine: function getProjectionOnLine(point) {
          if (this.start.x === this.end.x) return {
            x: this.start.x,
            y: point.y
          };
          if (this.start.y === this.end.y) return {
            x: point.x,
            y: this.start.y
          };
          // 新直线b，斜率不变m
          var b = this.startInShape.y - this.m * this.startInShape.x;
          var xPrime = (point.y - b + point.x / this.m) / (this.m + 1 / this.m);
          var yPrime = m * xPrime + b;
          return {
            x: xPrime,
            y: yPrime
          };
        }
      };
    }
    // 径向性位置
  }, {
    key: "getRadialGradientPosition",
    value: function getRadialGradientPosition(gradientHandlePositions) {
      if (!gradientHandlePositions || !gradientHandlePositions.length) return 'center';
      // 大小位置跟起点的距离为渐变宽
      var dx = gradientHandlePositions[1].x - gradientHandlePositions[0].x;
      var dy = gradientHandlePositions[1].y - gradientHandlePositions[0].y;
      var rx = Math.sqrt(dx * dx + dy * dy) * 100;
      dx = gradientHandlePositions[2].x - gradientHandlePositions[0].x;
      dy = gradientHandlePositions[2].y - gradientHandlePositions[0].y;
      var ry = Math.sqrt(dx * dx + dy * dy) * 100;
      return "ellipse ".concat(rx, "% ").concat(ry, "% at ").concat(gradientHandlePositions[0].x * 100, "% ").concat(gradientHandlePositions[0].y * 100, "%");
    }
    // Helper function to get the gradient direction
  }, {
    key: "getGradientDirection",
    value: function getGradientDirection(gradientHandlePositions) {
      if (gradientHandlePositions.length >= 2) {
        var start = gradientHandlePositions[0];
        var end = gradientHandlePositions[1]; // Use the second handle, ignoring the last one
        // Calculate the angle in radians
        var angleRadians = Math.PI / 2 - _jDesignUtil.util.getPointCoordRotation(start, end);
        //const angleRadians = Math.PI/2 - Math.atan2(end.y - start.y, end.x - start.x);
        return _jDesignUtil.util.toDeg(_jDesignUtil.util.radToDeg(angleRadians));
      } else {
        console.error("Insufficient handle positions for gradient calculation.");
        return ""; // or any default value
      }
    }
    // Helper function to get the gradient stops
  }, {
    key: "getGradientStops",
    value: function getGradientStops(gradientStops) {
      // Constructing the gradient stops string based on received data
      var stopsString = gradientStops.map(function (stop) {
        return _jDesignUtil.util.colorToString(stop.color, 255) + " ".concat(stop.position * 100, "%");
      }).join(", ");
      return stopsString;
    }
  }]);
  return BaseConverter;
}();
var _default = exports["default"] = BaseConverter;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DocumentConverter = void 0;
var _baseNode = _interopRequireDefault(require("./baseNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DocumentConverter = exports.DocumentConverter = /*#__PURE__*/function (_BaseConverter) {
  _inherits(DocumentConverter, _BaseConverter);
  function DocumentConverter() {
    _classCallCheck(this, DocumentConverter);
    return _callSuper(this, DocumentConverter, arguments);
  }
  _createClass(DocumentConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dom.type = 'div';
              dom.style.position = 'relative';
              return _context.abrupt("return", _get(_getPrototypeOf(DocumentConverter.prototype), "convert", this).call(this, node, dom, parentNode, option));
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }()
  }]);
  return DocumentConverter;
}(_baseNode["default"]);
var _default = exports["default"] = DocumentConverter;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ELLIPSEConverter = void 0;
var _types = require("../common/types");
var _jDesignUtil = require("j-design-util");
var _baseNode = _interopRequireDefault(require("./baseNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ELLIPSEConverter = exports.ELLIPSEConverter = /*#__PURE__*/function (_BaseConverter) {
  _inherits(ELLIPSEConverter, _BaseConverter);
  function ELLIPSEConverter() {
    _classCallCheck(this, ELLIPSEConverter);
    return _callSuper(this, ELLIPSEConverter, arguments);
  }
  _createClass(ELLIPSEConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        var ellipse, defs;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dom.type = 'svg';
              ellipse = this.createDomNode('ellipse');
              defs = this.createDomNode('defs');
              dom.children.push(defs);
              dom.children.push(ellipse);
              // svg外转用定位和大小，其它样式都给子元素
              _context.next = 7;
              return _get(_getPrototypeOf(ELLIPSEConverter.prototype), "convert", this).call(this, node, dom, parentNode, option);
            case 7:
              dom = _context.sent;
              ellipse.bounds = dom.bounds;
              return _context.abrupt("return", dom);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }() // 处理填充
  }, {
    key: "convertFills",
    value: function () {
      var _convertFills = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(node, dom, option) {
        var ellipse, _iterator, _step, fill;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!node.fills) {
                _context2.next = 31;
                break;
              }
              ellipse = dom.children[1];
              _iterator = _createForOfIteratorHelper(node.fills);
              _context2.prev = 3;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context2.next = 23;
                break;
              }
              fill = _step.value;
              if (!(fill.visible === false)) {
                _context2.next = 9;
                break;
              }
              return _context2.abrupt("continue", 21);
            case 9:
              _context2.t0 = fill.type;
              _context2.next = _context2.t0 === _types.PaintType.SOLID ? 12 : _context2.t0 === _types.PaintType.GRADIENT_LINEAR ? 14 : _context2.t0 === _types.PaintType.GRADIENT_RADIAL ? 16 : _context2.t0 === _types.PaintType.IMAGE ? 18 : 21;
              break;
            case 12:
              ellipse.fill = _jDesignUtil.util.colorToString(fill.color, 255);
              return _context2.abrupt("break", 21);
            case 14:
              ellipse.fill = this.convertLinearGradient(fill, dom);
              return _context2.abrupt("break", 21);
            case 16:
              ellipse.fill = this.convertRadialGradient(fill, dom);
              return _context2.abrupt("break", 21);
            case 18:
              _context2.next = 20;
              return _get(_getPrototypeOf(ELLIPSEConverter.prototype), "convertFills", this).call(this, node, ellipse, option);
            case 20:
              return _context2.abrupt("break", 21);
            case 21:
              _context2.next = 5;
              break;
            case 23:
              _context2.next = 28;
              break;
            case 25:
              _context2.prev = 25;
              _context2.t1 = _context2["catch"](3);
              _iterator.e(_context2.t1);
            case 28:
              _context2.prev = 28;
              _iterator.f();
              return _context2.finish(28);
            case 31:
              return _context2.abrupt("return", dom);
            case 32:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[3, 25, 28, 31]]);
      }));
      function convertFills(_x5, _x6, _x7) {
        return _convertFills.apply(this, arguments);
      }
      return convertFills;
    }() // 处理边框
  }, {
    key: "convertStrokes",
    value: function () {
      var _convertStrokes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(node, dom, option) {
        var ellipse;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(node.strokes && node.strokes.length)) {
                _context3.next = 4;
                break;
              }
              ellipse = dom.children[1];
              _context3.next = 4;
              return _get(_getPrototypeOf(ELLIPSEConverter.prototype), "convertStrokes", this).call(this, node, ellipse, option);
            case 4:
              return _context3.abrupt("return", dom);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function convertStrokes(_x8, _x9, _x10) {
        return _convertStrokes.apply(this, arguments);
      }
      return convertStrokes;
    }() // 转换线性渐变
  }, {
    key: "convertLinearGradient",
    value: function convertLinearGradient(gradient, dom) {
      var _gradientDom$children;
      if (dom.type !== 'svg') return _get(_getPrototypeOf(ELLIPSEConverter.prototype), "convertLinearGradient", this).call(this, gradient, dom);
      var defs = dom.children[0];
      var gradientDom = this.createDomNode('linearGradient');
      gradientDom.id = 'gradient_' + _jDesignUtil.util.uuid();
      var handlePositions = gradient.gradientHandlePositions;
      if (handlePositions && handlePositions.length > 1) {
        gradientDom.x1 = handlePositions[0].x * 100 + '%';
        gradientDom.y1 = handlePositions[0].y * 100 + '%';
        gradientDom.x2 = handlePositions[1].x * 100 + '%';
        gradientDom.y2 = handlePositions[1].y * 100 + '%';
      }
      var gradientStops = gradient.gradientStops;
      var stops = this.getGradientStopDoms(gradientStops);
      (_gradientDom$children = gradientDom.children).push.apply(_gradientDom$children, _toConsumableArray(stops));
      defs.children.push(gradientDom);
      return "url(#".concat(gradientDom.id, ")");
    }
    // 转换径向性渐变
  }, {
    key: "convertRadialGradient",
    value: function convertRadialGradient(gradient, dom) {
      var _gradientDom$children2;
      if (dom.type !== 'svg') return _get(_getPrototypeOf(ELLIPSEConverter.prototype), "convertRadialGradient", this).call(this, gradient, dom);
      var defs = dom.children[0];
      var gradientDom = this.createDomNode('radialGradient');
      gradientDom.id = 'gradient_' + _jDesignUtil.util.uuid();
      var handlePositions = gradient.gradientHandlePositions;
      // 该字段包含三个矢量，每个矢量都是归一化对象空间中的一个位置（归一化对象空间是如果对象的边界框的左上角是（0，0），右下角是（1,1））。第一个位置对应于渐变的开始（为了计算渐变停止，值为0），第二个位置是渐变的结束（值为1），第三个手柄位置决定渐变的宽度。
      if (handlePositions && handlePositions.length > 2) {
        gradientDom.fx = Math.round(handlePositions[0].x * 100) + '%';
        gradientDom.fy = Math.round(handlePositions[0].y * 100) + '%';
        gradientDom.cx = gradientDom.fx;
        gradientDom.cy = gradientDom.fy;
        // 大小位置跟起点的距离为渐变宽
        var dx = handlePositions[1].x - handlePositions[0].x;
        var dy = handlePositions[1].y - handlePositions[0].y;
        var r = Math.sqrt(dx * dx + dy * dy);
        gradientDom.r = Math.round(r * 100) + '%';
      }
      var gradientStops = gradient.gradientStops;
      var stops = this.getGradientStopDoms(gradientStops);
      (_gradientDom$children2 = gradientDom.children).push.apply(_gradientDom$children2, _toConsumableArray(stops));
      defs.children.push(gradientDom);
      return "url(#".concat(gradientDom.id, ")");
    }
    // Helper function to get the gradient stops
  }, {
    key: "getGradientStopDoms",
    value: function getGradientStopDoms(gradientStops) {
      var stops = [];
      var _iterator2 = _createForOfIteratorHelper(gradientStops),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var s = _step2.value;
          var stop = this.createDomNode('stop');
          stop.offset = "".concat(Math.round(s.position * 100), "%");
          stop.style.stopColor = _jDesignUtil.util.colorToString(s.color, 255);
          stops.push(stop);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return stops;
    }
  }]);
  return ELLIPSEConverter;
}(_baseNode["default"]);
var _default = exports["default"] = ELLIPSEConverter;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FRAMEConverter = void 0;
var _baseNode = _interopRequireDefault(require("./baseNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var FRAMEConverter = exports.FRAMEConverter = /*#__PURE__*/function (_BaseConverter) {
  _inherits(FRAMEConverter, _BaseConverter);
  function FRAMEConverter() {
    _classCallCheck(this, FRAMEConverter);
    return _callSuper(this, FRAMEConverter, arguments);
  }
  _createClass(FRAMEConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        var _iterator, _step, child;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
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
                    _iterator = _createForOfIteratorHelper(parentNode.children);
                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        child = _step.value;
                        if (child.absoluteBoundingBox) {
                          parentNode.absoluteBoundingBox.x = Math.min(parentNode.absoluteBoundingBox.x, child.absoluteBoundingBox.x);
                          parentNode.absoluteBoundingBox.y = Math.min(parentNode.absoluteBoundingBox.y, child.absoluteBoundingBox.y);
                        }
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  }
                }
              }
              return _context.abrupt("return", _get(_getPrototypeOf(FRAMEConverter.prototype), "convert", this).call(this, node, dom, parentNode, option));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }()
  }]);
  return FRAMEConverter;
}(_baseNode["default"]);
var _default = exports["default"] = FRAMEConverter;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GroupConverter = void 0;
var _frame = _interopRequireDefault(require("./frame"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var GroupConverter = exports.GroupConverter = /*#__PURE__*/function (_FRAMEConverter) {
  _inherits(GroupConverter, _FRAMEConverter);
  function GroupConverter() {
    _classCallCheck(this, GroupConverter);
    return _callSuper(this, GroupConverter, arguments);
  }
  _createClass(GroupConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _get(_getPrototypeOf(GroupConverter.prototype), "convert", this).call(this, node, dom, parentNode, option));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }()
  }]);
  return GroupConverter;
}(_frame["default"]);
var _default = exports["default"] = GroupConverter;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = convert;
exports.nodeToDom = nodeToDom;
var _baseNode = _interopRequireDefault(require("./baseNode"));
var _document = _interopRequireDefault(require("./document"));
var _page = _interopRequireDefault(require("./page"));
var _frame = _interopRequireDefault(require("./frame"));
var _group = _interopRequireDefault(require("./group"));
var _text = _interopRequireDefault(require("./text"));
var _ellipse = _interopRequireDefault(require("./ellipse"));
var _rectangle = _interopRequireDefault(require("./rectangle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var frameConverter = new _frame["default"]();
var ConverterMaps = {
  'BASE': new _baseNode["default"](),
  'FRAME': frameConverter,
  'GROUP': new _group["default"](),
  'TEXT': new _text["default"](),
  'DOCUMENT': new _document["default"](),
  'CANVAS': new _page["default"](),
  'ELLIPSE': new _ellipse["default"](),
  'RECTANGLE': new _rectangle["default"]()
};
// 转node为html结构对象
function convert(_x, _x2, _x3) {
  return _convert.apply(this, arguments);
} // 把figma数据转为dom对象
function _convert() {
  _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, parentNode, option) {
    var docDom, dom, converter, _iterator, _step, child, c;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!node.document) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return convert(node.document, node, option);
        case 3:
          docDom = _context.sent;
          return _context.abrupt("return", docDom);
        case 5:
          dom = ConverterMaps.BASE.createDomNode('div', {
            id: node.id,
            name: node.name,
            type: 'div',
            visible: node.visible === false ? false : true,
            data: {},
            style: {
              // 默认采用绝对定位
              position: 'absolute'
            },
            children: [],
            figmaData: node
          });
          converter = ConverterMaps[node.type] || ConverterMaps.BASE;
          if (!converter) {
            _context.next = 10;
            break;
          }
          _context.next = 10;
          return converter.convert(node, dom, parentNode, option);
        case 10:
          if (!(node.children && node.children.length)) {
            _context.next = 30;
            break;
          }
          _iterator = _createForOfIteratorHelper(node.children);
          _context.prev = 12;
          _iterator.s();
        case 14:
          if ((_step = _iterator.n()).done) {
            _context.next = 22;
            break;
          }
          child = _step.value;
          _context.next = 18;
          return convert(child, node, option);
        case 18:
          c = _context.sent;
          dom.children.push(c);
        case 20:
          _context.next = 14;
          break;
        case 22:
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](12);
          _iterator.e(_context.t0);
        case 27:
          _context.prev = 27;
          _iterator.f();
          return _context.finish(27);
        case 30:
          return _context.abrupt("return", dom);
        case 31:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[12, 24, 27, 30]]);
  }));
  return _convert.apply(this, arguments);
}
function nodeToDom(_x4, _x5) {
  return _nodeToDom.apply(this, arguments);
}
function _nodeToDom() {
  _nodeToDom = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(node, option) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = node.type;
          _context2.next = _context2.t0 === 'document' ? 3 : _context2.t0 === 'page' ? 6 : _context2.t0 === 'svg' ? 9 : _context2.t0 === 'ellipse' ? 12 : _context2.t0 === 'stop' ? 15 : _context2.t0 === 'defs' ? 15 : _context2.t0 === 'linearGradient' ? 15 : _context2.t0 === 'radialGradient' ? 15 : 18;
          break;
        case 3:
          _context2.next = 5;
          return renderDocument(node, option);
        case 5:
          return _context2.abrupt("return", _context2.sent);
        case 6:
          _context2.next = 8;
          return renderPage(node, option);
        case 8:
          return _context2.abrupt("return", _context2.sent);
        case 9:
          _context2.next = 11;
          return renderSvg(node, option);
        case 11:
          return _context2.abrupt("return", _context2.sent);
        case 12:
          _context2.next = 14;
          return renderEllipse(node, option);
        case 14:
          return _context2.abrupt("return", _context2.sent);
        case 15:
          _context2.next = 17;
          return renderSvgElement(node, option);
        case 17:
          return _context2.abrupt("return", _context2.sent);
        case 18:
          _context2.next = 20;
          return renderElement(node, option);
        case 20:
          return _context2.abrupt("return", _context2.sent);
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _nodeToDom.apply(this, arguments);
}
function renderDocument(_x6, _x7) {
  return _renderDocument.apply(this, arguments);
}
function _renderDocument() {
  _renderDocument = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(node, option) {
    var doc;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return renderElement(node, option);
        case 2:
          doc = _context3.sent;
          return _context3.abrupt("return", doc);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _renderDocument.apply(this, arguments);
}
function renderPage(_x8, _x9) {
  return _renderPage.apply(this, arguments);
}
function _renderPage() {
  _renderPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(node, option) {
    var page;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return renderElement(node, option);
        case 2:
          page = _context4.sent;
          return _context4.abrupt("return", page);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _renderPage.apply(this, arguments);
}
function renderSvg(_x10, _x11) {
  return _renderSvg.apply(this, arguments);
}
function _renderSvg() {
  _renderSvg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(node, option) {
    var svg;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return renderSvgElement(node, option);
        case 2:
          svg = _context5.sent;
          svg.setAttribute('width', node.bounds.width + '');
          svg.setAttribute('height', node.bounds.height + '');
          return _context5.abrupt("return", svg);
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _renderSvg.apply(this, arguments);
}
function renderEllipse(_x12, _x13) {
  return _renderEllipse.apply(this, arguments);
}
function _renderEllipse() {
  _renderEllipse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(node, option) {
    var ellipse;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return renderSvgElement(node, option);
        case 2:
          ellipse = _context6.sent;
          ellipse.setAttribute('cx', '50%');
          ellipse.setAttribute('cy', '50%');
          ellipse.setAttribute('rx', '50%');
          ellipse.setAttribute('ry', '50%');
          ellipse.setAttribute('fill', node.fill || node.style.background || node.style.backgroundColor);
          return _context6.abrupt("return", ellipse);
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _renderEllipse.apply(this, arguments);
}
function renderSvgElement(_x14, _x15) {
  return _renderSvgElement.apply(this, arguments);
}
function _renderSvgElement() {
  _renderSvgElement = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(node, option) {
    var el;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          el = document.createElementNS("http://www.w3.org/2000/svg", node.type); // 创建SVG元素
          _context7.next = 3;
          return renderElement(node, option, el);
        case 3:
          return _context7.abrupt("return", el);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _renderSvgElement.apply(this, arguments);
}
function renderElement(_x16, _x17, _x18) {
  return _renderElement.apply(this, arguments);
}
function _renderElement() {
  _renderElement = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(node, option, dom) {
    var _iterator2, _step2, child, c;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          dom = dom || document.createElement(node.type);
          if (node.style) {
            Object.assign(dom.style, node.style);
            if (node.preserveRatio && node.type === 'img') dom.style.height = 'auto';
          }
          if (node.text) {
            dom.textContent = node.text;
          }
          // @ts-ignore
          if (node.type === 'img' && node.url) dom.src = node.url;
          if (node.visible === false) dom.style.display = 'none';
          if (node.name) dom.setAttribute('data-name', node.name);
          if (node.id) dom.setAttribute('id', node.id);
          if (node.cx) dom.setAttribute('cx', node.cx);
          if (node.cy) dom.setAttribute('cy', node.cy);
          if (node.r) dom.setAttribute('r', node.r);
          if (node.fx) dom.setAttribute('fx', node.fx);
          if (node.fy) dom.setAttribute('fy', node.fy);
          if (node.x1) dom.setAttribute('x1', node.x1);
          if (node.y1) dom.setAttribute('y1', node.y1);
          if (node.x2) dom.setAttribute('x2', node.x2);
          if (node.y2) dom.setAttribute('y2', node.y2);
          if (node.offset) dom.setAttribute('offset', node.offset);
          if (!node.children) {
            _context8.next = 39;
            break;
          }
          _iterator2 = _createForOfIteratorHelper(node.children);
          _context8.prev = 19;
          _iterator2.s();
        case 21:
          if ((_step2 = _iterator2.n()).done) {
            _context8.next = 31;
            break;
          }
          child = _step2.value;
          if (!(child.visible === false)) {
            _context8.next = 25;
            break;
          }
          return _context8.abrupt("continue", 29);
        case 25:
          _context8.next = 27;
          return nodeToDom(child, option);
        case 27:
          c = _context8.sent;
          c && dom.appendChild(c);
        case 29:
          _context8.next = 21;
          break;
        case 31:
          _context8.next = 36;
          break;
        case 33:
          _context8.prev = 33;
          _context8.t0 = _context8["catch"](19);
          _iterator2.e(_context8.t0);
        case 36:
          _context8.prev = 36;
          _iterator2.f();
          return _context8.finish(36);
        case 39:
          return _context8.abrupt("return", dom);
        case 40:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[19, 33, 36, 39]]);
  }));
  return _renderElement.apply(this, arguments);
}
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PageConverter = void 0;
var _baseNode = _interopRequireDefault(require("./baseNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var PageConverter = exports.PageConverter = /*#__PURE__*/function (_BaseConverter) {
  _inherits(PageConverter, _BaseConverter);
  function PageConverter() {
    _classCallCheck(this, PageConverter);
    return _callSuper(this, PageConverter, arguments);
  }
  _createClass(PageConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dom.type = 'page';
              dom.style.position = 'relative';
              return _context.abrupt("return", _get(_getPrototypeOf(PageConverter.prototype), "convert", this).call(this, node, dom, parentNode, option));
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }()
  }]);
  return PageConverter;
}(_baseNode["default"]);
var _default = exports["default"] = PageConverter;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FRAMEConverter = void 0;
var _baseNode = _interopRequireDefault(require("./baseNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var FRAMEConverter = exports.FRAMEConverter = /*#__PURE__*/function (_BaseConverter) {
  _inherits(FRAMEConverter, _BaseConverter);
  function FRAMEConverter() {
    _classCallCheck(this, FRAMEConverter);
    return _callSuper(this, FRAMEConverter, arguments);
  }
  _createClass(FRAMEConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // 如果是填充的图5片，则直接用img
              if (node.fills && node.fills.length && node.fills[0].type === 'IMAGE') {
                dom.type = 'img';
              }
              return _context.abrupt("return", _get(_getPrototypeOf(FRAMEConverter.prototype), "convert", this).call(this, node, dom, parentNode, option));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }()
  }]);
  return FRAMEConverter;
}(_baseNode["default"]);
var _default = exports["default"] = FRAMEConverter;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TEXTConverter = void 0;
var _types = require("../common/types");
var _jDesignUtil = require("j-design-util");
var _baseNode = _interopRequireDefault(require("./baseNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var TEXTConverter = exports.TEXTConverter = /*#__PURE__*/function (_BaseConverter) {
  _inherits(TEXTConverter, _BaseConverter);
  function TEXTConverter() {
    _classCallCheck(this, TEXTConverter);
    return _callSuper(this, TEXTConverter, arguments);
  }
  _createClass(TEXTConverter, [{
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node, dom, parentNode, option) {
        var _dom$bounds, _node$style;
        var res, span, w, v;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dom.type = 'span';
              if (node.characters) dom.text = dom.data.text = node.characters;
              _context.next = 4;
              return _get(_getPrototypeOf(TEXTConverter.prototype), "convert", this).call(this, node, dom, parentNode, option);
            case 4:
              res = _context.sent;
              //dom.style.letterSpacing = dom.style.letterSpacing || '1px';
              /*if(dom.style.letterSpacing) {
                  const v = util.toNumber(dom.style.letterSpacing);
                  dom.bounds.width += v * (dom.bounds.width/node.style.fontSize);
              }*/
              // 如果行高好高度一致,则表示单行文本，可以不指定宽度
              if (((_dom$bounds = dom.bounds) === null || _dom$bounds === void 0 ? void 0 : _dom$bounds.height) < ((_node$style = node.style) === null || _node$style === void 0 ? void 0 : _node$style.fontSize) * 2) {
                span = document.createElement('span');
                Object.assign(span.style, dom.style);
                span.style.width = 'auto';
                span.style.position = 'absolute';
                span.innerText = dom.text;
                span.style.visibility = 'hidden';
                document.body.appendChild(span);
                w = span.offsetWidth || span.clientWidth;
                if (dom.style.letterSpacing) {
                  v = _jDesignUtil.util.toNumber(dom.style.letterSpacing);
                  w += v;
                }
                document.body.removeChild(span);
                dom.data.width = Math.max(w, _jDesignUtil.util.toNumber(dom.data.width));
              } else {
                //dom.style.minWidth = util.toPX(dom.data.width);
                dom.data.width = dom.bounds.width;
              }
              dom.style.width = _jDesignUtil.util.toPX(dom.data.width);
              _context.next = 9;
              return this.convertCharacterStyleOverrides(node, res, option);
            case 9:
              return _context.abrupt("return", res);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function convert(_x, _x2, _x3, _x4) {
        return _convert.apply(this, arguments);
      }
      return convert;
    }() // 解析字体多样式
  }, {
    key: "convertCharacterStyleOverrides",
    value: function () {
      var _convertCharacterStyleOverrides = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(node, dom, option) {
        var text, index, s, f, fDom, style, _fDom;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(node.characterStyleOverrides && node.characterStyleOverrides.length && node.styleOverrideTable)) {
                _context2.next = 24;
                break;
              }
              text = dom.text || '';
              index = 0;
            case 3:
              if (!(index < node.characterStyleOverrides.length)) {
                _context2.next = 21;
                break;
              }
              s = node.characterStyleOverrides[index];
              f = text[index];
              if (!(!s || !f)) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("continue", 18);
            case 8:
              fDom = this.createDomNode('span');
              fDom.text = f;
              fDom.style.position = 'relative'; // 连续字符不能用绝对定位
              style = node.styleOverrideTable[s];
              if (!style) {
                _context2.next = 17;
                break;
              }
              _context2.next = 15;
              return this.convertFills(style, fDom, option);
            case 15:
              _context2.next = 17;
              return this.convertStyle(style, fDom, option);
            case 17:
              dom.children.push(fDom);
            case 18:
              index++;
              _context2.next = 3;
              break;
            case 21:
              // 还有未处理完的，则加到后面
              if (text.length > index) {
                _fDom = this.createDomNode('span');
                _fDom.text = text.substring(index);
                dom.children.push(_fDom);
              }
              dom.text = '';
              dom.type = 'div';
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function convertCharacterStyleOverrides(_x5, _x6, _x7) {
        return _convertCharacterStyleOverrides.apply(this, arguments);
      }
      return convertCharacterStyleOverrides;
    }() // 处理填充, 文本的fill就是字体的颜色
  }, {
    key: "convertFills",
    value: function () {
      var _convertFills = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(node, dom, option) {
        var fill, img;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!node.isMaskOutline && node.fills && node.fills.length)) {
                _context3.next = 34;
                break;
              }
              fill = node.fills[0];
              _context3.t0 = fill.type;
              _context3.next = _context3.t0 === _types.PaintType.SOLID ? 5 : _context3.t0 === _types.PaintType.GRADIENT_LINEAR ? 7 : _context3.t0 === _types.PaintType.GRADIENT_RADIAL ? 11 : _context3.t0 === _types.PaintType.IMAGE ? 15 : 23;
              break;
            case 5:
              dom.style.color = _jDesignUtil.util.colorToString(fill.color, 255);
              return _context3.abrupt("break", 23);
            case 7:
              dom.style.background = this.convertLinearGradient(fill, dom);
              dom.style.backgroundClip = 'text';
              if (!dom.style.color) dom.style.color = 'transparent';
              return _context3.abrupt("break", 23);
            case 11:
              dom.style.background = this.convertRadialGradient(fill, dom);
              dom.style.backgroundClip = 'text';
              if (!dom.style.color) dom.style.color = 'transparent';
              return _context3.abrupt("break", 23);
            case 15:
              if (!(option && option.getImage)) {
                _context3.next = 22;
                break;
              }
              _context3.next = 18;
              return option.getImage(fill.imageRef);
            case 18:
              img = _context3.sent;
              if (img) dom.style.background = "url(".concat(img, ")");
              dom.style.backgroundClip = 'text';
              if (!dom.style.color) dom.style.color = 'transparent';
            case 22:
              return _context3.abrupt("break", 23);
            case 23:
              _context3.t1 = fill.scaleMode;
              _context3.next = _context3.t1 === _types.PaintSolidScaleMode.FILL ? 26 : _context3.t1 === _types.PaintSolidScaleMode.FIT ? 28 : _context3.t1 === _types.PaintSolidScaleMode.STRETCH ? 30 : _context3.t1 === _types.PaintSolidScaleMode.TILE ? 32 : 34;
              break;
            case 26:
              dom.style.backgroundSize = 'cover';
              return _context3.abrupt("break", 34);
            case 28:
              dom.style.backgroundSize = 'contain';
              return _context3.abrupt("break", 34);
            case 30:
              dom.style.backgroundSize = '100% 100%';
              return _context3.abrupt("break", 34);
            case 32:
              dom.style.backgroundRepeat = 'repeat';
              return _context3.abrupt("break", 34);
            case 34:
              return _context3.abrupt("return", dom);
            case 35:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function convertFills(_x8, _x9, _x10) {
        return _convertFills.apply(this, arguments);
      }
      return convertFills;
    }()
  }]);
  return TEXTConverter;
}(_baseNode["default"]);
var _default = exports["default"] = TEXTConverter;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextDecoration = exports.TextCase = exports.TextAutoResize = exports.StrokeJoin = exports.StrokeCap = exports.StrokeAlign = exports.PathWindingRule = exports.PaintType = exports.PaintSolidScaleMode = exports.MaskType = exports.LineTypes = exports.LineHeightUnit = exports.LayoutGridPattern = exports.LayoutGridAlignment = exports.LayoutConstraintVertical = exports.LayoutConstraintHorizontal = exports.LayoutAlign = exports.ImageType = exports.EffectType = exports.EasingType = exports.ConstrainType = exports.BooleanOperationType = exports.BlendMode = exports.AxisSizingMode = void 0;
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