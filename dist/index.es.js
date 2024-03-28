(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FRAMEConverter = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FRAMEConverter = exports.FRAMEConverter = /*#__PURE__*/function () {
  function FRAMEConverter() {
    _classCallCheck(this, FRAMEConverter);
  }
  _createClass(FRAMEConverter, [{
    key: "convert",
    value: function convert(node) {
      var res = {};
      return res;
    }
  }]);
  return FRAMEConverter;
}();
var _default = exports["default"] = FRAMEConverter;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = convert;
var _frame = _interopRequireDefault(require("./frame"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ConverterMaps = {
  'FRAME': new _frame["default"]()
};
// 转node为html结构对象
function convert(node) {
  var res = {
    id: node.id,
    name: node.name,
    visible: !!node.visible,
    type: node.type,
    children: []
  };
  if (node.children && node.children.length) {
    var _iterator = _createForOfIteratorHelper(node.children),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        var c = convert(child);
        res.children.push(c);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var converter = ConverterMaps[res.type];
  if (converter) converter.convert(node);
  return res;
}

},{"./frame":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  convert: true
};
Object.defineProperty(exports, "convert", {
  enumerable: true,
  get: function get() {
    return _node.convert;
  }
});
var _types = require("./figmaTypes/types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
var _node = require("./figmaTypes/node");

},{"./figmaTypes/node":2,"./figmaTypes/types":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2ZpZ21hVHlwZXMvZnJhbWUuanMiLCJkaXN0L2ZpZ21hVHlwZXMvbm9kZS5qcyIsImRpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7SUNBYSxjQUFjLEdBQUEsT0FBQSxDQUFBLGNBQUE7RUFBQSxTQUFBLGVBQUE7SUFBQSxlQUFBLE9BQUEsY0FBQTtFQUFBO0VBQUEsWUFBQSxDQUFBLGNBQUE7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUN2QixTQUFBLFFBQVEsSUFBSSxFQUFFO01BQ1YsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO01BQ2QsT0FBTyxHQUFHO0lBQ2Q7RUFBQztFQUFBLE9BQUEsY0FBQTtBQUFBO0FBQUEsSUFBQSxRQUFBLEdBQUEsT0FBQSxjQUVVLGNBQWM7Ozs7Ozs7OztBQ043QixJQUFBLE1BQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUE7QUFBcUMsU0FBQSx1QkFBQSxHQUFBLFdBQUEsR0FBQSxJQUFBLEdBQUEsQ0FBQSxVQUFBLEdBQUEsR0FBQSxnQkFBQSxHQUFBO0FBQUEsU0FBQSwyQkFBQSxDQUFBLEVBQUEsY0FBQSxRQUFBLEVBQUEsVUFBQSxNQUFBLG9CQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsUUFBQSxLQUFBLENBQUEscUJBQUEsRUFBQSxRQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxNQUFBLEVBQUEsR0FBQSwyQkFBQSxDQUFBLENBQUEsTUFBQSxjQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxNQUFBLHFCQUFBLEVBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxNQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsRUFBQSxlQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxXQUFBLEVBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLE1BQUEsV0FBQSxJQUFBLG1CQUFBLElBQUEsU0FBQSxLQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLFdBQUEsRUFBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLFNBQUEsaUpBQUEsZ0JBQUEsU0FBQSxNQUFBLFVBQUEsR0FBQSxXQUFBLENBQUEsV0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsV0FBQSxFQUFBLFFBQUEsSUFBQSxHQUFBLEVBQUEsQ0FBQSxJQUFBLElBQUEsZ0JBQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxTQUFBLElBQUEsS0FBQSxDQUFBLFdBQUEsRUFBQSxHQUFBLElBQUEsTUFBQSxTQUFBLEdBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxXQUFBLEVBQUEsZUFBQSxnQkFBQSxJQUFBLEVBQUEsb0JBQUEsRUFBQSw4QkFBQSxNQUFBLFFBQUEsR0FBQTtBQUFBLFNBQUEsNEJBQUEsQ0FBQSxFQUFBLE1BQUEsU0FBQSxDQUFBLHFCQUFBLENBQUEsc0JBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsTUFBQSxPQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLEtBQUEsYUFBQSxDQUFBLGlCQUFBLENBQUEsQ0FBQSxXQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLG1CQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsK0RBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxpQkFBQSxDQUFBLENBQUEsRUFBQSxNQUFBO0FBQUEsU0FBQSxrQkFBQSxHQUFBLEVBQUEsR0FBQSxRQUFBLEdBQUEsWUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsRUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsV0FBQSxDQUFBLE1BQUEsSUFBQSxPQUFBLEtBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLElBQUE7QUFDckMsSUFBTSxhQUFhLEdBQUc7RUFDbEIsT0FBTyxFQUFFLElBQUksaUJBQWMsQ0FBQztBQUNoQyxDQUFDO0FBQ0Q7QUFDTyxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUU7RUFDMUIsSUFBTSxHQUFHLEdBQUc7SUFDUixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7SUFDZixPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPO0lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtJQUNmLFFBQVEsRUFBRTtFQUNkLENBQUM7RUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFBQSxJQUFBLFNBQUEsR0FBQSwwQkFBQSxDQUNuQixJQUFJLENBQUMsUUFBUTtNQUFBLEtBQUE7SUFBQTtNQUFqQyxLQUFBLFNBQUEsQ0FBQSxDQUFBLE1BQUEsS0FBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLElBQUEsSUFBQSxHQUFtQztRQUFBLElBQXhCLEtBQUssR0FBQSxLQUFBLENBQUEsS0FBQTtRQUNaLElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO01BQ3hCO0lBQUMsU0FBQSxHQUFBO01BQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBO0lBQUE7TUFBQSxTQUFBLENBQUEsQ0FBQTtJQUFBO0VBQ0w7RUFDQSxJQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztFQUN6QyxJQUFJLFNBQVMsRUFDVCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztFQUMzQixPQUFPLEdBQUc7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBLElBQUEsTUFBQSxHQUFBLE9BQUE7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxPQUFBLFdBQUEsR0FBQTtFQUFBLElBQUEsR0FBQSxrQkFBQSxHQUFBO0VBQUEsSUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUE7RUFBQSxJQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsTUFBQSxNQUFBLENBQUEsR0FBQTtFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUE7SUFBQSxVQUFBO0lBQUEsR0FBQSxXQUFBLElBQUE7TUFBQSxPQUFBLE1BQUEsQ0FBQSxHQUFBO0lBQUE7RUFBQTtBQUFBO0FBQ0EsSUFBQSxLQUFBLEdBQUEsT0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBjbGFzcyBGUkFNRUNvbnZlcnRlciB7XG4gICAgY29udmVydChub2RlKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHt9O1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZSQU1FQ29udmVydGVyO1xuIiwiaW1wb3J0IEZyYW1lQ29udmVydGVyIGZyb20gJy4vZnJhbWUnO1xuY29uc3QgQ29udmVydGVyTWFwcyA9IHtcbiAgICAnRlJBTUUnOiBuZXcgRnJhbWVDb252ZXJ0ZXIoKVxufTtcbi8vIOi9rG5vZGXkuLpodG1s57uT5p6E5a+56LGhXG5leHBvcnQgZnVuY3Rpb24gY29udmVydChub2RlKSB7XG4gICAgY29uc3QgcmVzID0ge1xuICAgICAgICBpZDogbm9kZS5pZCxcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICB2aXNpYmxlOiAhIW5vZGUudmlzaWJsZSxcbiAgICAgICAgdHlwZTogbm9kZS50eXBlLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgfTtcbiAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBjb252ZXJ0KGNoaWxkKTtcbiAgICAgICAgICAgIHJlcy5jaGlsZHJlbi5wdXNoKGMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNvbnZlcnRlciA9IENvbnZlcnRlck1hcHNbcmVzLnR5cGVdO1xuICAgIGlmIChjb252ZXJ0ZXIpXG4gICAgICAgIGNvbnZlcnRlci5jb252ZXJ0KG5vZGUpO1xuICAgIHJldHVybiByZXM7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2ZpZ21hVHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgY29udmVydCB9IGZyb20gJy4vZmlnbWFUeXBlcy9ub2RlJztcbmV4cG9ydCB7IGNvbnZlcnQgfTtcbiJdfQ==
