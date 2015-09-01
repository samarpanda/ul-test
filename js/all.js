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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvaW1hZ2UuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvbGFyZ2UuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvbGlzdC1jb250YWluZXIuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvbWFpbi5qcyIsIi9Vc2Vycy9zYW1hci9Qcm9qZWN0cy91bC10ZXN0L2FwcC9qcy9tb3ZlLWNvbnRhaW5lci5qcyIsIi9Vc2Vycy9zYW1hci9Qcm9qZWN0cy91bC10ZXN0L2FwcC9qcy9zbGlkZXNob3cuanMiLCIvVXNlcnMvc2FtYXIvUHJvamVjdHMvdWwtdGVzdC9hcHAvanMvdGh1bWJuYWlsLmpzIiwiL1VzZXJzL3NhbWFyL1Byb2plY3RzL3VsLXRlc3QvYXBwL2pzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLEtBQUs7QUFDQyxVQUROLEtBQUssR0FDRzt3QkFEUixLQUFLOztBQUVULE1BQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0VBQ2Q7O2NBSEksS0FBSzs7U0FLSixrQkFBRTtBQUNQLFVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztHQUNoQjs7O1NBQ0ssZ0JBQUMsR0FBRyxFQUFDO0FBQ1YsT0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7R0FDZjs7O1NBQ2MsMkJBQUU7QUFDaEIseUNBQW9DLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTztHQUN4RDs7O1NBQ1UsdUJBQUU7QUFDWix5Q0FBb0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFPO0dBQ3hEOzs7UUFoQkksS0FBSzs7O3FCQW9CSSxJQUFJLEtBQUssRUFBRTs7Ozs7Ozs7Ozs7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UyxDQUFDLGNBQWMsR0FBRyxVQUFTLElBQUksRUFBQztBQUM5QyxLQUFJLElBQUksR0FBRyxLQUFLLENBQUM7QUFDakIsS0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUM7QUFDdkMsTUFBSSxHQUFHLElBQUksQ0FBQztFQUNaO0FBQ0QsUUFBTyxJQUFJLENBQUM7Q0FDWixDQUFDO0FBQ0YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFBUyxLQUFLLEVBQUUsS0FBSyxFQUFDO0FBQ25ELE1BQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDeEQsQ0FBQTs7cUJBRWMsS0FBSyxDQUFDLFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgSW1hZ2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy51cmwgPSAnJztcblx0fVxuXG5cdGdldFVybCgpe1xuXHRcdHJldHVybiB0aGlzLnVybDtcblx0fVxuXHRzZXRVcmwodXJsKXtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0fVxuXHRnZXRUaHVtYm5haWxJbWcoKXtcblx0XHRyZXR1cm4gYDxpbWcgY2xhc3M9XCJpbWctdGh1XCIgc3JjPVwiJHt0aGlzLmdldFVybCgpfVwiIC8+YDtcblx0fVxuXHRnZXRMYXJnZUltZygpe1xuXHRcdHJldHVybiBgPGltZyBjbGFzcz1cImltZy1scmdcIiBzcmM9XCIke3RoaXMuZ2V0VXJsKCl9XCIgLz5gO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEltYWdlKCk7XG4iLCJjbGFzcyBMYXJnZXtcblx0Y29uc3RydWN0b3IodXJsKXtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKXtcblx0XHR0aGlzLml0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHR0aGlzLml0ZW0uY2xhc3NOYW1lID0gJ2ltZy1scmcnO1xuXHRcdHRoaXMuc2V0RGF0YSgnc3JjJywgdGhpcy51cmwpO1xuXG5cdFx0YWRkRXZlbnRMaXN0ZW5lcignVEhVTUJfQ0xJQ0tFRCcsIChlKT0+e1xuXHRcdFx0bGV0IGRldGFpbCA9IGUuZGV0YWlsO1xuXHRcdFx0bGV0IGl0ZW0gPSBkZXRhaWwuaXRlbTtcblx0XHRcdHRoaXMuc2V0RGF0YSgnc3JjJywgaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXJsJykpO1xuXHRcdH0pO1xuXHR9XG5cblx0c2V0RGF0YShrZXksIHZhbHVlKXtcblx0XHR0aGlzLml0ZW0uc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuXHR9XG5cblx0Z2V0RGF0YShrZXkpe1xuXHRcdHJldHVybiB0aGlzLml0ZW0uZ2V0QXR0cmlidXRlKGtleSk7XG5cdH1cblxuXHRnZXRJdGVtKCl7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTGFyZ2UoKTtcbiIsImltcG9ydCBUaHVtYm5haWwgZnJvbSAnLi90aHVtYm5haWwnO1xuaW1wb3J0IG1vdmVDb250YWluZXIgZnJvbSAnLi9tb3ZlLWNvbnRhaW5lcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cbmNsYXNzIExpc3RDb250YWluZXJ7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCl7XG5cdFx0dGhpcy5mcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG5cdFx0dGhpcy50eXBlID0gJ2Rpdic7XG5cdFx0dGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudHlwZSk7XG5cdFx0dGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gJ2xpc3QtdGh1Jztcblx0XHR0aGlzLmNvbnRhaW5lci5pZCA9ICdsaXN0LWNvbic7XG5cdFx0dGhpcy5oaWRlKCk7XG5cblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0XHR0aGlzLmNyZWF0ZU1vdmFibGVDb250YWluZXIoKTtcblx0fVxuXG5cdGNyZWF0ZU1vdmFibGVDb250YWluZXIoKXtcblx0XHR0aGlzLnJlZk1vdmUgPSBtb3ZlQ29udGFpbmVyLmdldENvbnRhaW5lcigpO1xuXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVmTW92ZSk7XG5cdH1cblxuXHRjcmVhdGVMaXN0KCl7XG5cdFx0dmFyIGltZ0FyciA9IFsnaW1hZ2VzL2luZGlhMS5qcGcnLCAnaW1hZ2VzL2luZGlhMi5qcGcnXTtcblx0XHR2YXIgdGgsXG5cdFx0XHR1cmwsIGxlbiA9IGltZ0Fyci5sZW5ndGg7XG5cdFx0Zm9yKHZhciBpPTEsIGo9MDsgaTwzMDsgaSsrKXtcblx0XHRcdHVybCA9IGltZ0FycltqKytdO1xuXHRcdFx0aiA9IChqID09PSAobGVuKSA/IDAgOiBqKTtcblxuXHRcdFx0dGggPSBuZXcgVGh1bWJuYWlsKGksIHVybCk7XG5cdFx0XHR0aGlzLmZyYWcuYXBwZW5kQ2hpbGQodGguZ2V0SXRlbSgpKTtcblx0XHR9XG5cdFx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFnKTtcblx0XHR0aGlzLmFkZENsaWNrKCk7XG5cdH1cblxuXHRhZGRDbGljaygpe1xuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdHZhciBjbGlja2VkSXRlbSA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG5cblx0XHRcdGlmKCF1dGlscy52YWxpZFRodW1ibmFpbChjbGlja2VkSXRlbSkpXG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0dmFyIHRodW1iQ2xpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudChcIlRIVU1CX0NMSUNLRURcIiwge1xuXHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRpdGVtOiBjbGlja2VkSXRlbSxcblx0XHRcdFx0XHR0eXBlOiBjbGlja2VkSXRlbS50YWdOYW1lXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRcdGNhbmNlbGFibGU6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMucmVmTW92ZS5kaXNwYXRjaEV2ZW50KHRodW1iQ2xpY2tFdmVudCk7XG5cdFx0XHR0aHVtYkNsaWNrRXZlbnQgPSBudWxsO1xuXHRcdFx0Y2xpY2tlZEl0ZW0gPSBudWxsO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0Q29udGFpbmVyKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyO1xuXHR9XG5cblx0c2hvdygpe1xuXHRcdHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSAnJztcblx0fVxuXG5cdGhpZGUoKXtcblx0XHR0aGlzLmNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6bm9uZSc7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExpc3RDb250YWluZXIoKTtcbiIsImltcG9ydCB1dGlsIGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgbGlzdENvbnRhaW5lciBmcm9tICcuL2xpc3QtY29udGFpbmVyJztcblxudmFyIHR3cmFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R3cmFwJyk7XG5pZih0d3JhcCl7XG5cdHR3cmFwLmFwcGVuZENoaWxkKGxpc3RDb250YWluZXIuZ2V0Q29udGFpbmVyKCkpO1xuXHRsaXN0Q29udGFpbmVyLnNob3coKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgc2xpZGVzaG93IGZyb20gJy4vc2xpZGVzaG93JztcbmNsYXNzIE1vdmVDb250YWluZXJ7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy50eXBlID0gJ2Rpdic7XG5cdFx0dGhpcy5hY3RpdmVOb2RlID0gbnVsbDtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGNyZWF0ZVNsaWRlc2hvdygpe1xuXHRcdHRoaXMuaXRlbS5hcHBlbmRDaGlsZChzbGlkZXNob3cuZ2V0SXRlbSgpKTtcblx0fVxuXG5cdGNyZWF0ZU5leHRQcmV2QnV0dG9uKCl7XG5cdFx0dmFyIG5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRuZXh0LmNsYXNzTmFtZSA9ICduZXh0LWFycm93Jztcblx0XHR0aGlzLml0ZW0uYXBwZW5kQ2hpbGQobmV4dCk7XG5cblx0XHR2YXIgcHJldiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHByZXYuY2xhc3NOYW1lID0gJ3ByZXYtYXJyb3cnO1xuXHRcdHRoaXMuaXRlbS5hcHBlbmRDaGlsZChwcmV2KTtcblx0fVxuXG5cdHByZXZOZXh0SGFuZGxlcihpKXtcblx0XHR2YXIgZWw7XG5cdFx0ZWwgPSBpID09PSAxID8gdGhpcy5nZXROZXh0RWwoKSA6IHRoaXMuZ2V0UHJldkVsKCk7XG5cdFx0aWYoZWwpe1xuXHRcdFx0dmFyIHRodW1iQ2xpY2tFdmVudCA9IG5ldyBDdXN0b21FdmVudChcIlRIVU1CX0NMSUNLRURcIiwge1xuXHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRpdGVtOiBlbCxcblx0XHRcdFx0XHR0eXBlOiBlbC50YWdOYW1lXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRcdGNhbmNlbGFibGU6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuaXRlbS5kaXNwYXRjaEV2ZW50KHRodW1iQ2xpY2tFdmVudCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdCgpe1xuXHRcdHRoaXMuaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50eXBlKTtcblx0XHR0aGlzLml0ZW0uY2xhc3NOYW1lID0gJ21jb24tYic7XG5cdFx0dGhpcy5pdGVtLmlkID0gJ21vdi1jb24nO1xuXG5cdFx0dGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ1RIVU1CX0NMSUNLRUQnLCAoZSkgPT4ge1xuXHRcdFx0bGV0IGRldGFpbCA9IGUuZGV0YWlsO1xuXHRcdFx0Ly8gVG9nZ2xlXG5cdFx0XHRpZih0aGlzLmFjdGl2ZU5vZGUgPT09IGRldGFpbC5pdGVtKXtcblx0XHRcdFx0dGhpcy50b2dnbGUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5hY3RpdmVOb2RlID0gZGV0YWlsLml0ZW07XG5cblx0XHRcdGxldCByb3dJdGVtID0gdGhpcy5nZXRSb3dMYXN0RWwoZGV0YWlsLml0ZW0sIGRldGFpbC50eXBlKTtcblx0XHRcdHRoaXMubW92ZUl0ZW0ocm93SXRlbSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmNyZWF0ZVNsaWRlc2hvdygpO1xuXHRcdHRoaXMuY3JlYXRlTmV4dFByZXZCdXR0b24oKTtcblxuXHRcdHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0dmFyIGNsbmFtZSA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcblx0XHRcdGlmKCBjbG5hbWUgPT09ICdwcmV2LWFycm93J1xuXHRcdFx0XHR8fCBjbG5hbWUgPT09ICduZXh0LWFycm93J1xuXHRcdFx0KXtcblx0XHRcdFx0bGV0IGkgPSBjbG5hbWUgPT09ICduZXh0LWFycm93JyA/IDEgOiAwO1xuXHRcdFx0XHR0aGlzLnByZXZOZXh0SGFuZGxlcihpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vRGVmYXVsdDogSGlkZSB0aGUgbW92YWJsZSBjb250YWluZXJcblx0XHR0aGlzLmhpZGUoKTtcblx0fVxuXG5cdG1vdmVJdGVtKGVsKXtcblx0XHR1dGlscy5pbnNlcnRBZnRlcih0aGlzLml0ZW0sIGVsKTtcblx0XHR0aGlzLnNob3coKTtcblx0fVxuXG5cdGdldE5leHRFbCgpe1xuXHRcdHZhciBlbCA9IHRoaXMuYWN0aXZlTm9kZS5uZXh0U2libGluZztcblx0XHRpZihlbCAmJiBlbC5pZCA9PT0gJ21vdi1jb24nKXtcblx0XHRcdGVsID0gZWwubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHRcdHJldHVybiBlbDtcblx0fVxuXG5cdGdldFByZXZFbChub2RlKXtcblx0XHRyZXR1cm4gdGhpcy5hY3RpdmVOb2RlLnByZXZpb3VzU2libGluZztcblx0fVxuXG5cdGdldFJvd0xhc3RFbChub2RlLCB0YWdOYW1lKXtcblx0XHRpZighdGhpcy5pc1ZhbGlkTm9kZShub2RlLCB0YWdOYW1lKSl7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHZhciBwcmVOb2RlID0gbm9kZTtcblx0XHR2YXIgY3VyciwgcmVjdDtcblx0XHR3aGlsZSh0aGlzLmlzVmFsaWROb2RlKG5vZGUsIHRhZ05hbWUpKXtcblx0XHRcdHJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcblx0XHRcdGN1cnIgPSBwcmVOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcblx0XHRcdGlmKHJlY3QgLSBjdXJyID4gMzApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmKCF0aGlzLmhhc05leHRWYWxpZE5vZGUobm9kZSkpe1xuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdHByZU5vZGUgPSBub2RlO1xuXHRcdFx0bm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHRcdHJldHVybiBwcmVOb2RlO1xuXHR9XG5cblx0aXNWYWxpZE5vZGUobm9kZSwgdGFnTmFtZSl7XG5cdFx0dmFyIHRhZ05hbWUgPSB0YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG5cdFx0dmFyIGJvb2wgPSBmYWxzZTtcblx0XHRpZihub2RlXG5cdFx0XHQmJiBub2RlLm5vZGVUeXBlID09PSAxXG5cdFx0XHQmJiBub2RlLm5vZGVOYW1lID09PSB0YWdOYW1lXG5cdFx0XHQmJiBub2RlLmNsYXNzTmFtZSA9PT0gJ2l0bS10aHUnXG5cdFx0KXtcblx0XHRcdGJvb2wgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gYm9vbDtcblx0fVxuXG5cdGhhc05leHRWYWxpZE5vZGUobm9kZSl7XG5cdFx0dmFyIGJvb2wgPSBmYWxzZTtcblx0XHRpZihub2RlXG5cdFx0XHQmJiBub2RlLm5vZGVUeXBlID09PSAxXG5cdFx0XHQmJiBub2RlLm5leHRTaWJsaW5nXG5cdFx0KXtcblx0XHRcdHZhciBueHQgPSBub2RlLm5leHRTaWJsaW5nO1xuXHRcdFx0Ym9vbCA9IG54dC5jbGFzc05hbWUgPT09ICdpdG0tdGh1JyA/IHRydWUgOiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGJvb2w7XG5cdH1cblxuXHRnZXRDb250YWluZXIoKXtcblx0XHRyZXR1cm4gdGhpcy5pdGVtO1xuXHR9XG5cblx0dG9nZ2xlKCl7XG5cdFx0aWYodGhpcy5pdGVtLnN0eWxlLmNzc1RleHQgPT09ICcnKXtcblx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zaG93KCk7XG5cdFx0fVxuXHR9XG5cblx0c2hvdygpe1xuXHRcdHRoaXMuaXRlbS5zdHlsZS5jc3NUZXh0ID0gJyc7XG5cdH1cblxuXHRoaWRlKCl7XG5cdFx0dGhpcy5pdGVtLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTpub25lJztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTW92ZUNvbnRhaW5lcigpO1xuIiwiaW1wb3J0IGxhcmdlIGZyb20gJy4vbGFyZ2UnO1xuY2xhc3MgU2xpZGVzaG93e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMudHlwZSA9ICdkaXYnO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpe1xuXHRcdHRoaXMuaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50eXBlKTtcblx0XHR0aGlzLml0ZW0uY2xhc3NOYW1lID0gJ3NsaWRlcyc7XG5cdFx0dGhpcy5pdGVtLmFwcGVuZENoaWxkKGxhcmdlLmdldEl0ZW0oKSk7XG5cdH1cblxuXHRnZXRJdGVtKCl7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgU2xpZGVzaG93KCk7XG4iLCJpbXBvcnQgaW1hZ2UgZnJvbSAnLi9pbWFnZSc7XG5jbGFzcyBUaHVtYm5haWx7XG5cdGNvbnN0cnVjdG9yKGlkLCB1cmwpe1xuXHRcdHRoaXMuaWQgPSBpZDtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKXtcblx0XHR0aGlzLnR5cGUgPSAnZGl2Jztcblx0XHR0aGlzLml0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudHlwZSk7XG5cdFx0dGhpcy5pdGVtLmNsYXNzTmFtZSA9ICdpdG0tdGh1Jztcblx0XHRpbWFnZS5zZXRVcmwodGhpcy51cmwpO1xuXHRcdHRoaXMuaXRlbS5pbm5lckhUTUwgPSBpbWFnZS5nZXRUaHVtYm5haWxJbWcoKTtcblxuXHRcdHRoaXMuc2V0RGF0YSgnZGF0YS1pZCcsIHRoaXMuaWQpO1xuXHRcdHRoaXMuc2V0RGF0YSgnZGF0YS11cmwnLCB0aGlzLnVybCk7XG5cdH1cblxuXHRzZXREYXRhKGtleSwgdmFsdWUpe1xuXHRcdHRoaXMuaXRlbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRnZXREYXRhKGtleSl7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbS5nZXRBdHRyaWJ1dGUoa2V5KTtcblx0fVxuXG5cdGdldElkKCl7XG5cdFx0cmV0dXJuIHRoaXMuaWQ7XG5cdH1cblxuXHRnZXRJdGVtKCl7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaHVtYm5haWw7XG4iLCJmdW5jdGlvbiBVdGlscygpe31cblV0aWxzLnByb3RvdHlwZS52YWxpZFRodW1ibmFpbCA9IGZ1bmN0aW9uKG5vZGUpe1xuXHR2YXIgYm9vbCA9IGZhbHNlO1xuXHRpZihub2RlICYmIG5vZGUuY2xhc3NOYW1lID09PSAnaXRtLXRodScpe1xuXHRcdGJvb2wgPSB0cnVlO1xuXHR9XG5cdHJldHVybiBib29sO1xufTtcblV0aWxzLnByb3RvdHlwZS5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uKG5ld0VsLCB0YXJFbCl7XG5cdHRhckVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsLCB0YXJFbC5uZXh0U2libGluZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzLnByb3RvdHlwZTtcbiJdfQ==
