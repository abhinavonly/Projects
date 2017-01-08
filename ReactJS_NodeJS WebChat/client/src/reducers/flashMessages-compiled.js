'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ActionTypes = require('../constants/ActionTypes');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _default = function _default() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case _ActionTypes.ADD_FLASH_MESSAGE:
			return [].concat(_toConsumableArray(state), [{
				id: _shortid2.default.generate(),
				type: action.message.type,
				text: action.message.text
			}]);
		default:
			return state;
	}
};

exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/reducers/flashMessages.js');
}();

;

//# sourceMappingURL=flashMessages-compiled.js.map