import React from 'react';
import { Button } from 'react-bootstrap';
import { frontendUrl } from '../../../constant/constant';

import chatbot from '../../../assets/chat-bubble.png';
import man from '../../../assets/man.png';

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.replace(`${frontendUrl}/login`);
};

const ChatHeader = (props) => {
    const username = localStorage.getItem('userName') || 'Eunoia Bot';
    return (
        <div className="contact-profile">
            <img src={username.toLocaleLowerCase() === 'eunoia bot' ? chatbot : man } alt="User Logo"></img>
            <p>{username}</p>
            <div className="social-media">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <i className="fa fa-twitter" aria-hidden="true"></i>
                <i className="fa fa-instagram" aria-hidden="true"></i>
                <Button variant="outline-dark" size="sm" style={{marginRight: '15px'}} onClick={logout}>Logout</Button>
            </div>
        </div>
    );
};

export default ChatHeader;