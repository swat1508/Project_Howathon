import React from 'react';

import man from '../../../assets/man.png';
import chatbot from '../../../assets/chat-bubble.png';

const ChatHeader = () => {
    return (
        <div className="contact-profile">
            <img src={chatbot} alt="User Logo"></img>
            <p>Eunoia Bot</p>
            <div className="social-media">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <i className="fa fa-twitter" aria-hidden="true"></i>
                <i className="fa fa-instagram" aria-hidden="true"></i>
            </div>
        </div>
    );
}

export default ChatHeader;