import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './Message-input.styles.scss';

const MessageInput = () => {
    return (
        <div className="message-input">
            <div className="wrap">
                <input type="text" placeholder="Write your message..."></input>
                <button className="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}

export default MessageInput;