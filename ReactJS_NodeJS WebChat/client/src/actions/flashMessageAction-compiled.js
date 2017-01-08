'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addFlashMessage = addFlashMessage;

var _ActionTypes = require('../constants/ActionTypes');

function addFlashMessage(message) {
	console.log(1);
	return { type: _ActionTypes.ADD_FLASH_MESSAGE,
		message: message };
}
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(addFlashMessage, 'addFlashMessage', '/Users/zh355245849/WebChat/client/src/actions/flashMessageAction.js');
}();

;

//# sourceMappingURL=flashMessageAction-compiled.js.map