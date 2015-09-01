(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Image = (function () {
	function Image() {
		_classCallCheck(this, Image);

		this.url = '';
	}

	_createClass(Image, [{
		key: 'getUrl',
		value: function getUrl() {
			return this.url;
		}
	}, {
		key: 'setUrl',
		value: function setUrl(url) {
			this.url = url;
		}
	}, {
		key: 'getThumbnailImg',
		value: function getThumbnailImg() {
			return '<img class="img-thu" src="' + this.getUrl() + '" />';
		}
	}, {
		key: 'getLargeImg',
		value: function getLargeImg() {
			return '<img class="img-lrg" src="' + this.getUrl() + '" />';
		}
	}]);

	return Image;
})();

exports['default'] = new Image();
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Large = (function () {
	function Large(url) {
		_classCallCheck(this, Large);

		this.url = url;
		this.init();
	}

	_createClass(Large, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.item = document.createElement('img');
			this.item.className = 'img-lrg';
			this.setData('src', this.url);

			addEventListener('THUMB_CLICKED', function (e) {
				var detail = e.detail;
				var item = detail.item;
				_this.setData('src', item.getAttribute('data-url'));
			});
		}
	}, {
		key: 'setData',
		value: function setData(key, value) {
			this.item.setAttribute(key, value);
		}
	}, {
		key: 'getData',
		value: function getData(key) {
			return this.item.getAttribute(key);
		}
	}, {
		key: 'getItem',
		value: function getItem() {
			return this.item;
		}
	}]);

	return Large;
})();

exports['default'] = new Large();
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _thumbnail = require('./thumbnail');

var _thumbnail2 = _interopRequireDefault(_thumbnail);

var _moveContainer = require('./move-container');

var _moveContainer2 = _interopRequireDefault(_moveContainer);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var ListContainer = (function () {
	function ListContainer() {
		_classCallCheck(this, ListContainer);

		this.init();
	}

	_createClass(ListContainer, [{
		key: 'init',
		value: function init() {
			this.frag = document.createDocumentFragment();

			this.type = 'div';
			this.container = document.createElement(this.type);
			this.container.className = 'list-thu';
			this.container.id = 'list-con';
			this.hide();

			this.createList();
			this.createMovableContainer();
		}
	}, {
		key: 'createMovableContainer',
		value: function createMovableContainer() {
			this.refMove = _moveContainer2['default'].getContainer();
			this.container.appendChild(this.refMove);
		}
	}, {
		key: 'createList',
		value: function createList() {
			var imgArr = ['images/india1.jpg', 'images/india2.jpg'];
			var th,
			    url,
			    len = imgArr.length;
			for (var i = 1, j = 0; i < 30; i++) {
				url = imgArr[j++];
				j = j === len ? 0 : j;

				th = new _thumbnail2['default'](i, url);
				this.frag.appendChild(th.getItem());
			}
			this.container.appendChild(this.frag);
			this.addClick();
		}
	}, {
		key: 'addClick',
		value: function addClick() {
			var _this = this;

			this.container.addEventListener('click', function (e) {
				var clickedItem = e.target.parentNode;

				if (!_utils2['default'].validThumbnail(clickedItem)) return;

				var thumbClickEvent = new CustomEvent("THUMB_CLICKED", {
					detail: {
						item: clickedItem,
						type: clickedItem.tagName
					},
					bubbles: true,
					cancelable: false
				});
				_this.refMove.dispatchEvent(thumbClickEvent);
				thumbClickEvent = null;
				clickedItem = null;
			});
		}
	}, {
		key: 'getContainer',
		value: function getContainer() {
			return this.container;
		}
	}, {
		key: 'show',
		value: function show() {
			this.container.style.cssText = '';
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.container.style.cssText = 'display:none';
		}
	}]);

	return ListContainer;
})();

exports['default'] = new ListContainer();
module.exports = exports['default'];

},{"./move-container":5,"./thumbnail":7,"./utils":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _listContainer = require('./list-container');

var _listContainer2 = _interopRequireDefault(_listContainer);

var twrap = document.getElementById('twrap');
if (twrap) {
	twrap.appendChild(_listContainer2['default'].getContainer());
	_listContainer2['default'].show();
}

exports['default'] = {};
module.exports = exports['default'];

},{"./list-container":3,"./utils":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _slideshow = require('./slideshow');

var _slideshow2 = _interopRequireDefault(_slideshow);

var MoveContainer = (function () {
	function MoveContainer() {
		_classCallCheck(this, MoveContainer);

		this.type = 'div';
		this.activeNode = null;
		this.init();
	}

	_createClass(MoveContainer, [{
		key: 'createSlideshow',
		value: function createSlideshow() {
			this.item.appendChild(_slideshow2['default'].getItem());
		}
	}, {
		key: 'createNextPrevButton',
		value: function createNextPrevButton() {
			var next = document.createElement('div');
			next.className = 'next-arrow';
			this.item.appendChild(next);

			var prev = document.createElement('div');
			prev.className = 'prev-arrow';
			this.item.appendChild(prev);
		}
	}, {
		key: 'prevNextHandler',
		value: function prevNextHandler(i) {
			var el;
			el = i === 1 ? this.getNextEl() : this.getPrevEl();
			if (el) {
				var thumbClickEvent = new CustomEvent("THUMB_CLICKED", {
					detail: {
						item: el,
						type: el.tagName
					},
					bubbles: true,
					cancelable: false
				});
				this.item.dispatchEvent(thumbClickEvent);
			}
		}
	}, {
		key: 'init',
		value: function init() {
			var _this = this;

			this.item = document.createElement(this.type);
			this.item.className = 'mcon-b';
			this.item.id = 'mov-con';

			this.item.addEventListener('THUMB_CLICKED', function (e) {
				var detail = e.detail;
				// Toggle
				if (_this.activeNode === detail.item) {
					_this.toggle();
					return;
				}
				_this.activeNode = detail.item;

				var rowItem = _this.getRowLastEl(detail.item, detail.type);
				_this.moveItem(rowItem);
			});

			this.createSlideshow();
			this.createNextPrevButton();

			this.item.addEventListener('click', function (e) {
				var clname = e.target.className;
				if (clname === 'prev-arrow' || clname === 'next-arrow') {
					var i = clname === 'next-arrow' ? 1 : 0;
					_this.prevNextHandler(i);
				}
			});

			//Default: Hide the movable container
			this.hide();
		}
	}, {
		key: 'moveItem',
		value: function moveItem(el) {
			_utils2['default'].insertAfter(this.item, el);
			this.show();
			var h = document.documentElement.clientHeight || window.innerHeight;
			h = this.item.offsetTop - (h - 300) / 2;
			document.body.scrollTop = h;
		}
	}, {
		key: 'getNextEl',
		value: function getNextEl() {
			var el = this.activeNode.nextSibling;
			if (el && el.id === 'mov-con') {
				el = el.nextSibling;
			}
			return el;
		}
	}, {
		key: 'getPrevEl',
		value: function getPrevEl(node) {
			return this.activeNode.previousSibling;
		}
	}, {
		key: 'getRowLastEl',
		value: function getRowLastEl(node, tagName) {
			if (!this.isValidNode(node, tagName)) {
				return false;
			}
			var preNode = node;
			var curr, rect;
			while (this.isValidNode(node, tagName)) {
				rect = node.getBoundingClientRect().bottom;
				curr = preNode.getBoundingClientRect().bottom;
				if (rect - curr > 30) {
					break;
				}
				if (!this.hasNextValidNode(node)) {
					return node;
				}
				preNode = node;
				node = node.nextSibling;
			}
			return preNode;
		}
	}, {
		key: 'isValidNode',
		value: function isValidNode(node, tagName) {
			var tagName = tagName.toUpperCase();
			var bool = false;
			if (node && node.nodeType === 1 && node.nodeName === tagName && node.className === 'itm-thu') {
				bool = true;
			}
			return bool;
		}
	}, {
		key: 'hasNextValidNode',
		value: function hasNextValidNode(node) {
			var bool = false;
			if (node && node.nodeType === 1 && node.nextSibling) {
				var nxt = node.nextSibling;
				bool = nxt.className === 'itm-thu' ? true : false;
			}
			return bool;
		}
	}, {
		key: 'getContainer',
		value: function getContainer() {
			return this.item;
		}
	}, {
		key: 'toggle',
		value: function toggle() {
			if (this.item.style.cssText === '') {
				this.hide();
			} else {
				this.show();
			}
		}
	}, {
		key: 'show',
		value: function show() {
			this.item.style.cssText = '';
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.item.style.cssText = 'display:none';
		}
	}]);

	return MoveContainer;
})();

exports['default'] = new MoveContainer();
module.exports = exports['default'];

},{"./slideshow":6,"./utils":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _large = require('./large');

var _large2 = _interopRequireDefault(_large);

var Slideshow = (function () {
	function Slideshow() {
		_classCallCheck(this, Slideshow);

		this.type = 'div';
		this.init();
	}

	_createClass(Slideshow, [{
		key: 'init',
		value: function init() {
			this.item = document.createElement(this.type);
			this.item.className = 'slides';
			this.item.appendChild(_large2['default'].getItem());
		}
	}, {
		key: 'getItem',
		value: function getItem() {
			return this.item;
		}
	}]);

	return Slideshow;
})();

exports['default'] = new Slideshow();
module.exports = exports['default'];

},{"./large":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var Thumbnail = (function () {
	function Thumbnail(id, url) {
		_classCallCheck(this, Thumbnail);

		this.id = id;
		this.url = url;
		this.init();
	}

	_createClass(Thumbnail, [{
		key: 'init',
		value: function init() {
			this.type = 'div';
			this.item = document.createElement(this.type);
			this.item.className = 'itm-thu';
			_image2['default'].setUrl(this.url);
			this.item.innerHTML = _image2['default'].getThumbnailImg();

			this.setData('data-id', this.id);
			this.setData('data-url', this.url);
		}
	}, {
		key: 'setData',
		value: function setData(key, value) {
			this.item.setAttribute(key, value);
		}
	}, {
		key: 'getData',
		value: function getData(key) {
			return this.item.getAttribute(key);
		}
	}, {
		key: 'getId',
		value: function getId() {
			return this.id;
		}
	}, {
		key: 'getItem',
		value: function getItem() {
			return this.item;
		}
	}]);

	return Thumbnail;
})();

exports['default'] = Thumbnail;
module.exports = exports['default'];

},{"./image":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
function Utils() {}
Utils.prototype.validThumbnail = function (node) {
	var bool = false;
	if (node && node.className === 'itm-thu') {
		bool = true;
	}
	return bool;
};
Utils.prototype.insertAfter = function (newEl, tarEl) {
	tarEl.parentNode.insertBefore(newEl, tarEl.nextSibling);
};

exports['default'] = Utils.prototype;
module.exports = exports['default'];

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvaW1hZ2UuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvbGFyZ2UuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvbGlzdC1jb250YWluZXIuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvbWFpbi5qcyIsIi9Vc2Vycy9zYW1hci9Qcm9qZWN0cy91bC10ZXN0L2FwcC9qcy9tb3ZlLWNvbnRhaW5lci5qcyIsIi9Vc2Vycy9zYW1hci9Qcm9qZWN0cy91bC10ZXN0L2FwcC9qcy9zbGlkZXNob3cuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvdGh1bWJuYWlsLmpzIiwiL1VzZXJzL3NhbWFyL1Byb2plY3RzL3VsLXRlc3QvYXBwL2pzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLEtBQUs7QUFDQyxVQUROLEtBQUssR0FDRzt3QkFEUixLQUFLOztBQUVULE1BQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0VBQ2Q7O2NBSEksS0FBSzs7U0FLSixrQkFBRTtBQUNQLFVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztHQUNoQjs7O1NBQ0ssZ0JBQUMsR0FBRyxFQUFDO0FBQ1YsT0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7R0FDZjs7O1NBQ2MsMkJBQUU7QUFDaEIseUNBQW9DLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTztHQUN4RDs7O1NBQ1UsdUJBQUU7QUFDWix5Q0FBb0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFPO0dBQ3hEOzs7UUFoQkksS0FBSzs7O3FCQW9CSSxJQUFJLEtBQUssRUFBRTs7Ozs7Ozs7Ozs7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QUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ25DOzs7U0FFSSxpQkFBRTtBQUNOLFVBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztHQUNmOzs7U0FFTSxtQkFBRTtBQUNSLFVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztHQUNqQjs7O1FBaENJLFNBQVM7OztxQkFtQ0EsU0FBUzs7Ozs7Ozs7O0FDcEN4QixTQUFTLEtBQUssR0FBRSxFQUFFO0FBQ2xCLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLFVBQVMsSUFBSSxFQUFDO0FBQzlDLEtBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNqQixLQUFHLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQztBQUN2QyxNQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ1o7QUFDRCxRQUFPLElBQUksQ0FBQztDQUNaLENBQUM7QUFDRixLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFTLEtBQUssRUFBRSxLQUFLLEVBQUM7QUFDbkQsTUFBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN4RCxDQUFBOztxQkFFYyxLQUFLLENBQUMsU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBJbWFnZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLnVybCA9ICcnO1xuXHR9XG5cblx0Z2V0VXJsKCl7XG5cdFx0cmV0dXJuIHRoaXMudXJsO1xuXHR9XG5cdHNldFVybCh1cmwpe1xuXHRcdHRoaXMudXJsID0gdXJsO1xuXHR9XG5cdGdldFRodW1ibmFpbEltZygpe1xuXHRcdHJldHVybiBgPGltZyBjbGFzcz1cImltZy10aHVcIiBzcmM9XCIke3RoaXMuZ2V0VXJsKCl9XCIgLz5gO1xuXHR9XG5cdGdldExhcmdlSW1nKCl7XG5cdFx0cmV0dXJuIGA8aW1nIGNsYXNzPVwiaW1nLWxyZ1wiIHNyYz1cIiR7dGhpcy5nZXRVcmwoKX1cIiAvPmA7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgSW1hZ2UoKTtcbiIsImNsYXNzIExhcmdle1xuXHRjb25zdHJ1Y3Rvcih1cmwpe1xuXHRcdHRoaXMudXJsID0gdXJsO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpe1xuXHRcdHRoaXMuaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdHRoaXMuaXRlbS5jbGFzc05hbWUgPSAnaW1nLWxyZyc7XG5cdFx0dGhpcy5zZXREYXRhKCdzcmMnLCB0aGlzLnVybCk7XG5cblx0XHRhZGRFdmVudExpc3RlbmVyKCdUSFVNQl9DTElDS0VEJywgKGUpPT57XG5cdFx0XHRsZXQgZGV0YWlsID0gZS5kZXRhaWw7XG5cdFx0XHRsZXQgaXRlbSA9IGRldGFpbC5pdGVtO1xuXHRcdFx0dGhpcy5zZXREYXRhKCdzcmMnLCBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRzZXREYXRhKGtleSwgdmFsdWUpe1xuXHRcdHRoaXMuaXRlbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRnZXREYXRhKGtleSl7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbS5nZXRBdHRyaWJ1dGUoa2V5KTtcblx0fVxuXG5cdGdldEl0ZW0oKXtcblx0XHRyZXR1cm4gdGhpcy5pdGVtO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBMYXJnZSgpO1xuIiwiaW1wb3J0IFRodW1ibmFpbCBmcm9tICcuL3RodW1ibmFpbCc7XG5pbXBvcnQgbW92ZUNvbnRhaW5lciBmcm9tICcuL21vdmUtY29udGFpbmVyJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuY2xhc3MgTGlzdENvbnRhaW5lcntcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKXtcblx0XHR0aGlzLmZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cblx0XHR0aGlzLnR5cGUgPSAnZGl2Jztcblx0XHR0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50eXBlKTtcblx0XHR0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgPSAnbGlzdC10aHUnO1xuXHRcdHRoaXMuY29udGFpbmVyLmlkID0gJ2xpc3QtY29uJztcblx0XHR0aGlzLmhpZGUoKTtcblxuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHRcdHRoaXMuY3JlYXRlTW92YWJsZUNvbnRhaW5lcigpO1xuXHR9XG5cblx0Y3JlYXRlTW92YWJsZUNvbnRhaW5lcigpe1xuXHRcdHRoaXMucmVmTW92ZSA9IG1vdmVDb250YWluZXIuZ2V0Q29udGFpbmVyKCk7XG5cdFx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZWZNb3ZlKTtcblx0fVxuXG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR2YXIgaW1nQXJyID0gWydpbWFnZXMvaW5kaWExLmpwZycsICdpbWFnZXMvaW5kaWEyLmpwZyddO1xuXHRcdHZhciB0aCxcblx0XHRcdHVybCwgbGVuID0gaW1nQXJyLmxlbmd0aDtcblx0XHRmb3IodmFyIGk9MSwgaj0wOyBpPDMwOyBpKyspe1xuXHRcdFx0dXJsID0gaW1nQXJyW2orK107XG5cdFx0XHRqID0gKGogPT09IChsZW4pID8gMCA6IGopO1xuXG5cdFx0XHR0aCA9IG5ldyBUaHVtYm5haWwoaSwgdXJsKTtcblx0XHRcdHRoaXMuZnJhZy5hcHBlbmRDaGlsZCh0aC5nZXRJdGVtKCkpO1xuXHRcdH1cblx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmZyYWcpO1xuXHRcdHRoaXMuYWRkQ2xpY2soKTtcblx0fVxuXG5cdGFkZENsaWNrKCl7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0dmFyIGNsaWNrZWRJdGVtID0gZS50YXJnZXQucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYoIXV0aWxzLnZhbGlkVGh1bWJuYWlsKGNsaWNrZWRJdGVtKSlcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHR2YXIgdGh1bWJDbGlja0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiVEhVTUJfQ0xJQ0tFRFwiLCB7XG5cdFx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRcdGl0ZW06IGNsaWNrZWRJdGVtLFxuXHRcdFx0XHRcdHR5cGU6IGNsaWNrZWRJdGVtLnRhZ05hbWVcblx0XHRcdFx0fSxcblx0XHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdFx0Y2FuY2VsYWJsZTogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5yZWZNb3ZlLmRpc3BhdGNoRXZlbnQodGh1bWJDbGlja0V2ZW50KTtcblx0XHRcdHRodW1iQ2xpY2tFdmVudCA9IG51bGw7XG5cdFx0XHRjbGlja2VkSXRlbSA9IG51bGw7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRDb250YWluZXIoKXtcblx0XHRyZXR1cm4gdGhpcy5jb250YWluZXI7XG5cdH1cblxuXHRzaG93KCl7XG5cdFx0dGhpcy5jb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICcnO1xuXHR9XG5cblx0aGlkZSgpe1xuXHRcdHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTpub25lJztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTGlzdENvbnRhaW5lcigpO1xuIiwiaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlscydcbmltcG9ydCBsaXN0Q29udGFpbmVyIGZyb20gJy4vbGlzdC1jb250YWluZXInO1xuXG52YXIgdHdyYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHdyYXAnKTtcbmlmKHR3cmFwKXtcblx0dHdyYXAuYXBwZW5kQ2hpbGQobGlzdENvbnRhaW5lci5nZXRDb250YWluZXIoKSk7XG5cdGxpc3RDb250YWluZXIuc2hvdygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBzbGlkZXNob3cgZnJvbSAnLi9zbGlkZXNob3cnO1xuY2xhc3MgTW92ZUNvbnRhaW5lcntcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLnR5cGUgPSAnZGl2Jztcblx0XHR0aGlzLmFjdGl2ZU5vZGUgPSBudWxsO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0Y3JlYXRlU2xpZGVzaG93KCl7XG5cdFx0dGhpcy5pdGVtLmFwcGVuZENoaWxkKHNsaWRlc2hvdy5nZXRJdGVtKCkpO1xuXHR9XG5cblx0Y3JlYXRlTmV4dFByZXZCdXR0b24oKXtcblx0XHR2YXIgbmV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG5leHQuY2xhc3NOYW1lID0gJ25leHQtYXJyb3cnO1xuXHRcdHRoaXMuaXRlbS5hcHBlbmRDaGlsZChuZXh0KTtcblxuXHRcdHZhciBwcmV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0cHJldi5jbGFzc05hbWUgPSAncHJldi1hcnJvdyc7XG5cdFx0dGhpcy5pdGVtLmFwcGVuZENoaWxkKHByZXYpO1xuXHR9XG5cblx0cHJldk5leHRIYW5kbGVyKGkpe1xuXHRcdHZhciBlbDtcblx0XHRlbCA9IGkgPT09IDEgPyB0aGlzLmdldE5leHRFbCgpIDogdGhpcy5nZXRQcmV2RWwoKTtcblx0XHRpZihlbCl7XG5cdFx0XHR2YXIgdGh1bWJDbGlja0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiVEhVTUJfQ0xJQ0tFRFwiLCB7XG5cdFx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRcdGl0ZW06IGVsLFxuXHRcdFx0XHRcdHR5cGU6IGVsLnRhZ05hbWVcblx0XHRcdFx0fSxcblx0XHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdFx0Y2FuY2VsYWJsZTogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5pdGVtLmRpc3BhdGNoRXZlbnQodGh1bWJDbGlja0V2ZW50KTtcblx0XHR9XG5cdH1cblxuXHRpbml0KCl7XG5cdFx0dGhpcy5pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnR5cGUpO1xuXHRcdHRoaXMuaXRlbS5jbGFzc05hbWUgPSAnbWNvbi1iJztcblx0XHR0aGlzLml0ZW0uaWQgPSAnbW92LWNvbic7XG5cblx0XHR0aGlzLml0ZW0uYWRkRXZlbnRMaXN0ZW5lcignVEhVTUJfQ0xJQ0tFRCcsIChlKSA9PiB7XG5cdFx0XHRsZXQgZGV0YWlsID0gZS5kZXRhaWw7XG5cdFx0XHQvLyBUb2dnbGVcblx0XHRcdGlmKHRoaXMuYWN0aXZlTm9kZSA9PT0gZGV0YWlsLml0ZW0pe1xuXHRcdFx0XHR0aGlzLnRvZ2dsZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmFjdGl2ZU5vZGUgPSBkZXRhaWwuaXRlbTtcblxuXHRcdFx0bGV0IHJvd0l0ZW0gPSB0aGlzLmdldFJvd0xhc3RFbChkZXRhaWwuaXRlbSwgZGV0YWlsLnR5cGUpO1xuXHRcdFx0dGhpcy5tb3ZlSXRlbShyb3dJdGVtKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuY3JlYXRlU2xpZGVzaG93KCk7XG5cdFx0dGhpcy5jcmVhdGVOZXh0UHJldkJ1dHRvbigpO1xuXG5cdFx0dGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG5cdFx0XHR2YXIgY2xuYW1lID0gZS50YXJnZXQuY2xhc3NOYW1lO1xuXHRcdFx0aWYoIGNsbmFtZSA9PT0gJ3ByZXYtYXJyb3cnXG5cdFx0XHRcdHx8IGNsbmFtZSA9PT0gJ25leHQtYXJyb3cnXG5cdFx0XHQpe1xuXHRcdFx0XHRsZXQgaSA9IGNsbmFtZSA9PT0gJ25leHQtYXJyb3cnID8gMSA6IDA7XG5cdFx0XHRcdHRoaXMucHJldk5leHRIYW5kbGVyKGkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly9EZWZhdWx0OiBIaWRlIHRoZSBtb3ZhYmxlIGNvbnRhaW5lclxuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0bW92ZUl0ZW0oZWwpe1xuXHRcdHV0aWxzLmluc2VydEFmdGVyKHRoaXMuaXRlbSwgZWwpO1xuXHRcdHRoaXMuc2hvdygpO1xuXHRcdHZhciBoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0aCA9IHRoaXMuaXRlbS5vZmZzZXRUb3AgLSAoaCAtIDMwMCkvMjtcblx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGg7XG5cdH1cblxuXHRnZXROZXh0RWwoKXtcblx0XHR2YXIgZWwgPSB0aGlzLmFjdGl2ZU5vZGUubmV4dFNpYmxpbmc7XG5cdFx0aWYoZWwgJiYgZWwuaWQgPT09ICdtb3YtY29uJyl7XG5cdFx0XHRlbCA9IGVsLm5leHRTaWJsaW5nO1xuXHRcdH1cblx0XHRyZXR1cm4gZWw7XG5cdH1cblxuXHRnZXRQcmV2RWwobm9kZSl7XG5cdFx0cmV0dXJuIHRoaXMuYWN0aXZlTm9kZS5wcmV2aW91c1NpYmxpbmc7XG5cdH1cblxuXHRnZXRSb3dMYXN0RWwobm9kZSwgdGFnTmFtZSl7XG5cdFx0aWYoIXRoaXMuaXNWYWxpZE5vZGUobm9kZSwgdGFnTmFtZSkpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR2YXIgcHJlTm9kZSA9IG5vZGU7XG5cdFx0dmFyIGN1cnIsIHJlY3Q7XG5cdFx0d2hpbGUodGhpcy5pc1ZhbGlkTm9kZShub2RlLCB0YWdOYW1lKSl7XG5cdFx0XHRyZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b207XG5cdFx0XHRjdXJyID0gcHJlTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b207XG5cdFx0XHRpZihyZWN0IC0gY3VyciA+IDMwKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZighdGhpcy5oYXNOZXh0VmFsaWROb2RlKG5vZGUpKXtcblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRwcmVOb2RlID0gbm9kZTtcblx0XHRcdG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJlTm9kZTtcblx0fVxuXG5cdGlzVmFsaWROb2RlKG5vZGUsIHRhZ05hbWUpe1xuXHRcdHZhciB0YWdOYW1lID0gdGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xuXHRcdHZhciBib29sID0gZmFsc2U7XG5cdFx0aWYobm9kZVxuXHRcdFx0JiYgbm9kZS5ub2RlVHlwZSA9PT0gMVxuXHRcdFx0JiYgbm9kZS5ub2RlTmFtZSA9PT0gdGFnTmFtZVxuXHRcdFx0JiYgbm9kZS5jbGFzc05hbWUgPT09ICdpdG0tdGh1J1xuXHRcdCl7XG5cdFx0XHRib29sID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGJvb2w7XG5cdH1cblxuXHRoYXNOZXh0VmFsaWROb2RlKG5vZGUpe1xuXHRcdHZhciBib29sID0gZmFsc2U7XG5cdFx0aWYobm9kZVxuXHRcdFx0JiYgbm9kZS5ub2RlVHlwZSA9PT0gMVxuXHRcdFx0JiYgbm9kZS5uZXh0U2libGluZ1xuXHRcdCl7XG5cdFx0XHR2YXIgbnh0ID0gbm9kZS5uZXh0U2libGluZztcblx0XHRcdGJvb2wgPSBueHQuY2xhc3NOYW1lID09PSAnaXRtLXRodScgPyB0cnVlIDogZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBib29sO1xuXHR9XG5cblx0Z2V0Q29udGFpbmVyKCl7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbTtcblx0fVxuXG5cdHRvZ2dsZSgpe1xuXHRcdGlmKHRoaXMuaXRlbS5zdHlsZS5jc3NUZXh0ID09PSAnJyl7XG5cdFx0XHR0aGlzLmhpZGUoKTtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2hvdygpO1xuXHRcdH1cblx0fVxuXG5cdHNob3coKXtcblx0XHR0aGlzLml0ZW0uc3R5bGUuY3NzVGV4dCA9ICcnO1xuXHR9XG5cblx0aGlkZSgpe1xuXHRcdHRoaXMuaXRlbS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6bm9uZSc7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE1vdmVDb250YWluZXIoKTtcbiIsImltcG9ydCBsYXJnZSBmcm9tICcuL2xhcmdlJztcbmNsYXNzIFNsaWRlc2hvd3tcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLnR5cGUgPSAnZGl2Jztcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKXtcblx0XHR0aGlzLml0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudHlwZSk7XG5cdFx0dGhpcy5pdGVtLmNsYXNzTmFtZSA9ICdzbGlkZXMnO1xuXHRcdHRoaXMuaXRlbS5hcHBlbmRDaGlsZChsYXJnZS5nZXRJdGVtKCkpO1xuXHR9XG5cblx0Z2V0SXRlbSgpe1xuXHRcdHJldHVybiB0aGlzLml0ZW07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFNsaWRlc2hvdygpO1xuIiwiaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xuY2xhc3MgVGh1bWJuYWlse1xuXHRjb25zdHJ1Y3RvcihpZCwgdXJsKXtcblx0XHR0aGlzLmlkID0gaWQ7XG5cdFx0dGhpcy51cmwgPSB1cmw7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCl7XG5cdFx0dGhpcy50eXBlID0gJ2Rpdic7XG5cdFx0dGhpcy5pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnR5cGUpO1xuXHRcdHRoaXMuaXRlbS5jbGFzc05hbWUgPSAnaXRtLXRodSc7XG5cdFx0aW1hZ2Uuc2V0VXJsKHRoaXMudXJsKTtcblx0XHR0aGlzLml0ZW0uaW5uZXJIVE1MID0gaW1hZ2UuZ2V0VGh1bWJuYWlsSW1nKCk7XG5cblx0XHR0aGlzLnNldERhdGEoJ2RhdGEtaWQnLCB0aGlzLmlkKTtcblx0XHR0aGlzLnNldERhdGEoJ2RhdGEtdXJsJywgdGhpcy51cmwpO1xuXHR9XG5cblx0c2V0RGF0YShrZXksIHZhbHVlKXtcblx0XHR0aGlzLml0ZW0uc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuXHR9XG5cblx0Z2V0RGF0YShrZXkpe1xuXHRcdHJldHVybiB0aGlzLml0ZW0uZ2V0QXR0cmlidXRlKGtleSk7XG5cdH1cblxuXHRnZXRJZCgpe1xuXHRcdHJldHVybiB0aGlzLmlkO1xuXHR9XG5cblx0Z2V0SXRlbSgpe1xuXHRcdHJldHVybiB0aGlzLml0ZW07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGh1bWJuYWlsO1xuIiwiZnVuY3Rpb24gVXRpbHMoKXt9XG5VdGlscy5wcm90b3R5cGUudmFsaWRUaHVtYm5haWwgPSBmdW5jdGlvbihub2RlKXtcblx0dmFyIGJvb2wgPSBmYWxzZTtcblx0aWYobm9kZSAmJiBub2RlLmNsYXNzTmFtZSA9PT0gJ2l0bS10aHUnKXtcblx0XHRib29sID0gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gYm9vbDtcbn07XG5VdGlscy5wcm90b3R5cGUuaW5zZXJ0QWZ0ZXIgPSBmdW5jdGlvbihuZXdFbCwgdGFyRWwpe1xuXHR0YXJFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdFbCwgdGFyRWwubmV4dFNpYmxpbmcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlscy5wcm90b3R5cGU7XG4iXX0=
