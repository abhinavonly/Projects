'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TextFieldGroup = require('../../common/TextFieldGroup');

var _TextFieldGroup2 = _interopRequireDefault(_TextFieldGroup);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import axios from 'axios';


var Signup = function (_React$Component) {
	_inherits(Signup, _React$Component);

	function Signup(props) {
		_classCallCheck(this, Signup);

		var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

		_this.state = {
			useremail: '',
			password: '',
			passwordconfirm: '',
			nickname: '',
			errors: {},
			isLoading: false
		};
		_this.onChange = _this.onChange.bind(_this);
		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(Signup, [{
		key: 'onChange',
		value: function onChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'onSubmit',
		value: function onSubmit(e) {
			var _this2 = this;

			e.preventDefault();
			this.setState({ errors: {}, isLoading: true });
			this.props.userSignupRequest({ useremail: this.state.useremail, password: this.state.password,
				passwordconfirm: this.state.passwordconfirm,
				nickname: this.state.nickname }).then(function (success) {
				console.log(success);
				_this2.props.addFlashMessage({
					type: 'success',
					text: _this2.state.nickname + ',' + success.data.message
				});
				_reactRouter.browserHistory.push('/');
			}, function (err) {
				return _this2.setState({ errors: err.response.data.errors, isLoding: false });
			});
			//(err)=>{ console.log(err.response.data.errors);})
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
					' Join the World!'
				),
				_react2.default.createElement(_TextFieldGroup2.default, {
					error: errors.email,
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
				_react2.default.createElement(_TextFieldGroup2.default, {
					error: errors.passwordconfirm,
					label: 'Verify Password',
					onChange: this.onChange,
					value: this.state.passwordconfirm,
					field: 'passwordconfirm',
					type: 'password'
				}),
				_react2.default.createElement(_TextFieldGroup2.default, {
					error: errors.name,
					label: 'Nickname',
					onChange: this.onChange,
					value: this.state.nickname,
					field: 'nickname'
				}),
				_react2.default.createElement(
					'div',
					{ className: 'form-group' },
					_react2.default.createElement(
						'button',
						{ disable: this.state.isLoading, className: 'btn btn-primary btn-lg' },
						'Sign up'
					)
				)
			);
		}
	}]);

	return Signup;
}(_react2.default.Component);

Signup.propTypes = {
	userSignupRequest: _react2.default.PropTypes.func.isRequired,
	addFlashMessage: _react2.default.PropTypes.func.isRequired
};
var _default = Signup;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Signup, 'Signup', '/Users/zh355245849/WebChat/client/src/components/pages/Form/SignupForm.js');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/components/pages/Form/SignupForm.js');
}();

;

//# sourceMappingURL=SignupForm-compiled.js.map