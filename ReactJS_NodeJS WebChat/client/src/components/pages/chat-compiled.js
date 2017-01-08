'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _shorti = require('shorti');

var _shorti2 = _interopRequireDefault(_shorti);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zh355245849 on 2016/11/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
// app-client.js


var socket = _socket2.default.connect();

var chat = function (_Component) {
    _inherits(chat, _Component);

    function chat() {
        _classCallCheck(this, chat);

        var _this = _possibleConstructorReturn(this, (chat.__proto__ || Object.getPrototypeOf(chat)).call(this));

        _this.state = {
            data: {
                messages: []
            }
        };
        return _this;
    }

    _createClass(chat, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var data = this.state.data;
            var messages = data.messages;

            socket.on('updatechat', function (data) {
                console.log(data);
                var message_browser = {
                    _id: _nodeUuid2.default.v1(),
                    metafield: {
                        message: {
                            value: data
                        }
                    }
                };

                messages.push(message_browser);
                _this2.setState({
                    data: {
                        messages: messages
                    }
                });
                _this2.refs.message.refs.input.value = '';
            });
        }
    }, {
        key: 'createMessage',
        value: function createMessage() {
            var data = this.state.data;
            var messages = data.messages;
            var message_text = this.refs.message.refs.input.value.trim();
            if (!message_text) return;

            socket.emit("sendchat", { room: "room1", message: message_text });

            // Render to browser
            var message_browser = {
                _id: _nodeUuid2.default.v1(),
                metafield: {
                    message: {
                        value: message_text
                    }
                }
            };

            messages.push(message_browser);
            this.setState({
                data: {
                    messages: messages
                }
            });
            this.refs.message.refs.input.value = '';
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            this.createMessage();
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.state.data;
            var form_input = void 0;

            form_input = _react2.default.createElement(
                'div',
                null,
                'Hello ',
                data.author,
                ', type a message:',
                _react2.default.createElement('br', null),
                _react2.default.createElement(_reactBootstrap.Input, { type: 'text', ref: 'message' })
            );
            var messages = data.messages;
            var messages_list = void 0;
            if (messages) {
                // order by created
                var sorted_messages = _lodash2.default.sortBy(messages, function (message) {
                    return message.created;
                });
                messages_list = sorted_messages.map(function (message_object) {
                    if (message_object) {
                        return _react2.default.createElement(
                            'li',
                            { style: _extends({ listStyle: 'none' }, (0, _shorti2.default)('mb-5')), key: message_object._id },
                            _react2.default.createElement(
                                'b',
                                null,
                                'Nickname'
                            ),
                            _react2.default.createElement('br', null),
                            message_object.metafield.message.value
                        );
                    }
                });
            }
            var scroll_area_style = _extends({}, (0, _shorti2.default)('h-' + (window.innerHeight - 140)), {
                overflowY: 'scroll'
            });
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: (0, _shorti2.default)('pl-15') },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'React Chat Channel'
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'text', ref: 'messages_scroll_area', style: scroll_area_style },
                        _react2.default.createElement(
                            'ul',
                            { style: (0, _shorti2.default)('p-0') },
                            messages_list
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: (0, _shorti2.default)('absolute b-0 w-100p pl-15 pr-15') },
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.handleSubmit.bind(this) },
                        form_input
                    )
                )
            );
        }
    }]);

    return chat;
}(_react.Component);

var _default = chat;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(socket, 'socket', '/Users/zh355245849/WebChat/client/src/components/pages/chat.js');

    __REACT_HOT_LOADER__.register(chat, 'chat', '/Users/zh355245849/WebChat/client/src/components/pages/chat.js');

    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/zh355245849/WebChat/client/src/components/pages/chat.js');
}();

;

//# sourceMappingURL=chat-compiled.js.map