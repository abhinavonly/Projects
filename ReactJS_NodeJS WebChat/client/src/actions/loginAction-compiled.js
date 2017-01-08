'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.userLoginRequest = userLoginRequest;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userLoginRequest(userData) {
	return function (dispatch) {
		return _axios2.default.post('/auth/login', userData);
	};
}
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(userLoginRequest, 'userLoginRequest', '/Users/zh355245849/WebChat/client/src/actions/loginAction.js');
}();

;

//# sourceMappingURL=loginAction-compiled.js.map