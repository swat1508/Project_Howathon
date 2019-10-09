import React, { Component } from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getConversation} from './../../pages/home/selectors'

import './Chat-view.styles.scss';

import MessageInput from '../message-input/Message-input.component';
import ChatHeader from "../chat-header/Chat-header.component";
import Message from "../message/message.component";

class ChatView extends Component {

    render() {
        return (
            <div className="content">
                <ChatHeader />
                <div className="messages">
                    <ul>
                        {
                            this.props.messages && this.props.messages.map((message) => {
                                const {id, ...otherProps} = message;
                                return (<Message key={id} {...otherProps} />)
                            })
                        }
                    </ul>
                </div>
                <MessageInput />
            </div>
        );
    }
}

ChatView.propTypes = {
    messages: PropTypes.array
}

const mapStateToProps = createPropsSelector({
    messages: getConversation
})

export default connect(
    mapStateToProps,
    null
)(ChatView)
