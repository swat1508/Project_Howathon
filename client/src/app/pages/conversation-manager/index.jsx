import React from 'react'
import './base.scss'
// import {initializeHome} from './actions'
import ChatView from '../../components/chat-view/chat-view.component'

class ConversationManager extends React.Component {
    constructor(props) {
        super(props)
        this.pageType = 'conversationManager'
    }

    render() {
        return (
            <div className="t-conversation-manager">
                <div className="hd_container"><p className="cb_header">Welcome to Eunoia's ChatBot!</p></div>
                {/* <input type="button" value="CLICK TO CHAT" /> */}
                < ChatView/>
            </div>
        )
    }
}

export default ConversationManager
