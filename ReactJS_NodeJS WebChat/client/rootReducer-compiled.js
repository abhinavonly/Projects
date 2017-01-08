'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _flashMessages = require('./src/reducers/flashMessages');

var _flashMessages2 = _interopRequireDefault(_flashMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
	flashMessages: _flashMessages2.default
});

exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/rootReducer.js');
}();

;

//# sourceMappingURL=rootReducer-compiled.js.map