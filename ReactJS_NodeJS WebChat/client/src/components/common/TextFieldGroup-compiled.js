'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextFieldGroup = function TextFieldGroup(_ref) {
	var field = _ref.field,
	    value = _ref.value,
	    label = _ref.label,
	    error = _ref.error,
	    type = _ref.type,
	    onChange = _ref.onChange;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)("form-group", { 'has-error': error }) },
		_react2.default.createElement(
			'label',
			{ className: 'control-label' },
			' ',
			label
		),
		_react2.default.createElement('input', {
			onChange: onChange,
			value: value,
			type: type,
			name: field,
			className: 'form-control' }),
		error && _react2.default.createElement(
			'span',
			{ className: 'help-block' },
			error
		)
	);
};

TextFieldGroup.propTypes = {
	field: _react2.default.PropTypes.string.isRequired,
	value: _react2.default.PropTypes.string.isRequired,
	label: _react2.default.PropTypes.string.isRequired,
	error: _react2.default.PropTypes.string,
	type: _react2.default.PropTypes.string.isRequired,
	onChange: _react2.default.PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
	type: 'text'
};
var _default = TextFieldGroup;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(TextFieldGroup, 'TextFieldGroup', '/Users/zh355245849/WebChat/client/src/components/common/TextFieldGroup.js');

	__REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/components/common/TextFieldGroup.js');
}();

;

//# sourceMappingURL=TextFieldGroup-compiled.js.map