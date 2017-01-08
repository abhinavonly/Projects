/**
 * Created by zh355245849 on 2016/11/26.
 */
// app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'
import uuid from 'node-uuid'
import S from 'shorti'
import _ from 'lodash'
import { Input } from 'react-bootstrap'
var socket = io.connect();

class chat extends Component {

    constructor() {
        super()
        this.state = {
            data: {
                messages: []
            }
        }
    }

    componentDidMount() {
        const data = this.state.data
        const messages = data.messages

        socket.on('updatechat', (data) => {
            console.log(data);
            const message_browser = {
                _id: uuid.v1(),
                metafield: {
                    message: {
                        value: data
                    }
                }
            }

            messages.push(message_browser)
            this.setState({
                data: {
                    messages
                }
            })
            this.refs.message.refs.input.value = ''
        });
    }

    createMessage() {
        const data = this.state.data
        const messages = data.messages
        const message_text = this.refs.message.refs.input.value.trim()
        if (!message_text)
            return

        socket.emit("sendchat", {room:"room1", message:message_text})

        // Render to browser
        const message_browser = {
            _id: uuid.v1(),
            metafield: {
                message: {
                    value: message_text
                }
            }
        }

        messages.push(message_browser)
        this.setState({
            data: {
                messages
            }
        })
        this.refs.message.refs.input.value = ''
    }

    handleSubmit(e) {
        e.preventDefault()
        this.createMessage()
    }

    render() {
        const data = this.state.data
        let form_input

        form_input = (
            <div>
                Hello { data.author }, type a message:<br />
                <Input type="text" ref="message" />
            </div>
        )
        const messages = data.messages
        let messages_list
        if (messages) {
            // order by created
            const sorted_messages = _.sortBy(messages, message => {
                return message.created
            })
            messages_list = sorted_messages.map(message_object => {
                if (message_object) {
                    return (
                        <li style={ { listStyle: 'none', ...S('mb-5') } } key={ message_object._id }>
                            <b>Nickname</b><br/>
                            { message_object.metafield.message.value }
                        </li>
                    )
                }
            })
        }
        const scroll_area_style = {
            ...S('h-' + (window.innerHeight - 140)),
            overflowY: 'scroll'
        }
        return (
            <div>
                <div style={ S('pl-15') }>
                    <h2>React Chat Channel</h2>
                    <div id="text" ref="messages_scroll_area" style={ scroll_area_style }>
                        <ul style={ S('p-0') }>{ messages_list }</ul>
                    </div>
                </div>
                <div style={ S('absolute b-0 w-100p pl-15 pr-15') }>
                    <form onSubmit={ this.handleSubmit.bind(this) }>
                        { form_input }
                    </form>
                </div>
            </div>
        )
    }
}

export default chat
