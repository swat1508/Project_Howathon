import React from 'react';

import './Message.styles.scss';

import man from '../../../assets/man.png';
import chatbot from '../../../assets/chat-bubble.png';

const Message = (message) => {
    return (
        <li className={ message.isBot ? 'sent' : 'replies' }>
            <img src={ message.isBot ? chatbot : man } alt=""></img>
            <p>{message.message.message}</p>
        </li>
    )
}

export default Message;