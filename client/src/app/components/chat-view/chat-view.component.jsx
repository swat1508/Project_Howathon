import React, { Component } from "react";

import './Chat-view.styles.scss';
import man from '../../../assets/man.png';
import chatbot from '../../../assets/chatbot.png';

import MessageInput from '../message-input/Message-input.component';
import ChatHeader from "../chat-header/Chat-header.component";
import Message from "../message/message.component";

class ChatView extends Component {
    constructor() {
        super();
        this.state = {
            messages: [
                {
                    id: 1,
                    message: 'How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!',
                    bot: true,
                    dateStamp: ''
                },
                {
                    id: 2,
                    message: 'When you\'re backed against the wall, break the god damn thing down.',
                    bot: false,
                    dateStamp: ''
                },
                {
                    id: 3,
                    message: 'Excuses don\'t win championships.',
                    bot: false,
                    dateStamp: ''
                },
                {
                    id: 4,
                    message: 'Oh yeah, did Michael Jordan tell you that?',
                    bot: true,
                    dateStamp: ''
                },
                {
                    id: 5,
                    message: 'No, I told him that.',
                    bot: false,
                    dateStamp: ''
                },
                {
                    id: 6,
                    message: 'What are your choices when someone puts a gun to your head?',
                    bot: false,
                    dateStamp: ''
                },
                {
                    id: 7,
                    message: 'What are you talking about? You do what they say or they shoot you.',
                    bot: true,
                    dateStamp: ''
                },
                {
                    id: 8,
                    message: 'Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.',
                    bot: false,
                    dateStamp: ''
                },
            ]
        };
    }

    render() {
        return (
            <div className="content">
                <ChatHeader />
                <div className="messages">
                    <ul>
                        {
                            this.state.messages.map((message) => {
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

export default ChatView;