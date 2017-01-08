'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _signup = require('./pages/signup');

var _signup2 = _interopRequireDefault(_signup);

var _main = require('./pages/main');

var _main2 = _interopRequireDefault(_main);

var _login = require('./pages/login');

var _login2 = _interopRequireDefault(_login);

var _chat = require('./pages/chat');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createElement(
	_reactRouter.Route,
	{ path: '/', component: _app2.default },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _main2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _signup2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: 'login', component: _login2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: 'chat/:id', component: _chat2.default })
);

exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/components/routes.js');
}();

;

//# sourceMappingURL=routes-compiled.js.map