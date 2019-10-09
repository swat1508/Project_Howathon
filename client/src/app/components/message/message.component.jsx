import React from 'react';

import './Message.styles.scss';

import man from '../../../assets/man.png';
import chatbot from '../../../assets/chat-bubble.png';

const Message = (message) => {
    return (
        <li className={ message.bot ? 'sent' : 'replies' }>
            <img src={ message.bot ? chatbot : man } alt=""></img>
            <p>{message.message}</p>
        </li>
    )
}

export default Message;