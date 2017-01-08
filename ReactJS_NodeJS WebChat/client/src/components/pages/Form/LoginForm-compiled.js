'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextFieldGroup = require('../../common/TextFieldGroup');

var _TextFieldGroup2 = _interopRequireDefault(_TextFieldGroup);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.state = {
			useremail: '',
			password: '',
			errors: {},
			isLoading: false
		};
		_this.onChange = _this.onChange.bind(_this);
		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(Login, [{
		key: 'onChange',
		value: function onChange(e) {
			console.log(this.state);
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'onSubmit',
		value: function onSubmit(e) {
			var _this2 = this;

			e.preventDefault();
			this.setState({ errors: {}, isLoading: true });
			this.props.userLoginRequest({ useremail: this.state.useremail, password: this.state.password }).then(function () {
				_reactRouter.browserHistory.push('/');
			}, function (err) {
				return _this2.setState({ errors: err.response.data.errors, isLoding: false });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var errors = this.state.errors;

			return _react2.default.createElement(
				'form',
				{ onSubmit: this.onSubmit },
				_react2.default.createElement(
					'h1',
					null,
					'Login'
				),
				_react2.default.createElement(_TextFieldGroup2.default, {
					error: errors.useremail,
					label: 'Email',
					onChange: this.onChange,
					value: this.state.useremail,
					field: 'useremail'
				}),
				_react2.default.createElement(_TextFieldGroup2.default, {
					error: errors.password,
					label: 'Password',
					onChange: this.onChange,
					value: this.state.password,
					field: 'password',
					type: 'password'
				}),
				_react2.default.createElement(
					'div',
					{ className: 'form-group' },
					_react2.default.createElement(
						'button',
						{ disable: this.state.isLoading, className: 'btn btn-primary btn-lg' },
						'Login'
					)
				)
			);
		}
	}]);

	return Login;
}(_react2.default.Component);

Login.propTypes = {
	userLoginRequest: _react2.default.PropTypes.func.isRequired
};

var _default = Login;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Login, 'Login', '/Users/zh355245849/WebChat/client/src/components/pages/Form/LoginForm.js');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/components/pages/Form/LoginForm.js');
}();

;

//# sourceMappingURL=LoginForm-compiled.js.map