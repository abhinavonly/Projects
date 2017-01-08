'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LoginForm = require('./Form/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _reactRedux = require('react-redux');

var _loginAction = require('../../actions/loginAction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPage = function (_React$Component) {
	_inherits(LoginPage, _React$Component);

	function LoginPage() {
		_classCallCheck(this, LoginPage);

		return _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).apply(this, arguments));
	}

	_createClass(LoginPage, [{
		key: 'render',
		value: function render() {
			var userLoginRequest = this.props.userLoginRequest;

			return _react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-md-4 col-md-offset-4' },
					_react2.default.createElement(_LoginForm2.default, { userLoginRequest: userLoginRequest })
				)
			);
		}
	}]);

	return LoginPage;
}(_react2.default.Component);

LoginPage.propTypes = {
	userLoginRequest: _react2.default.PropTypes.func.isRequired
};

var _default = (0, _reactRedux.connect)(function (state) {
	return {};
}, { userLoginRequest: _loginAction.userLoginRequest })(LoginPage);

exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(LoginPage, 'LoginPage', '/Users/zh355245849/WebChat/client/src/components/pages/login.js');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/components/pages/login.js');
}();

;

//# sourceMappingURL=login-compiled.js.map