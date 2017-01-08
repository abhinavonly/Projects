'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlashMessage = function (_React$Component) {
	_inherits(FlashMessage, _React$Component);

	function FlashMessage() {
		_classCallCheck(this, FlashMessage);

		return _possibleConstructorReturn(this, (FlashMessage.__proto__ || Object.getPrototypeOf(FlashMessage)).apply(this, arguments));
	}

	_createClass(FlashMessage, [{
		key: 'render',
		value: function render() {
			var _props$message = this.props.message,
			    id = _props$message.id,
			    type = _props$message.type,
			    text = _props$message.text;

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('alert', {
						'alert-success': type === 'success',
						'alert-danger': type === 'error'
					}) },
				text
			);
		}
	}]);

	return FlashMessage;
}(_react2.default.Component);

FlashMessage.propTypes = {
	message: _react2.default.PropTypes.object.isRequired
};

var _default = FlashMessage;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(FlashMessage, 'FlashMessage', '/Users/zh355245849/WebChat/client/src/components/flash/FlashMessage.js');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/components/flash/FlashMessage.js');
}();

;

//# sourceMappingURL=FlashMessage-compiled.js.map