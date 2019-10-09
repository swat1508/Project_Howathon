import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {updateConversation} from './../../pages/home/actions'
import './Message-input.styles.scss';
import axios from 'axios'

const MessageInput = (props) => {
    return (
        <div className="message-input">
            <div className="wrap">
                <input type="text" placeholder="Write your message..." onKeyPress={(event) => updateChatHistory(event, props.updateConversations)}></input>
                <button className="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}

const updateChatHistory = (event, updateConversations) => {
    if (event.which === 13) {
        const input = event.target.value
        event.target.value = ''
        const message = {
            message: input,
            bot: false,
            timeStamp: new Date().getTime()
        }
        updateConversations(message)
        const host = window.location.hostname
        const port = 4001
        console.log({input})
        axios
            .post(`http://${host}:${port}/triggerRecastOps`, message)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

MessageInput.propTypes = {
    updateConversations: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
    updateConversations: (message) =>
        dispatch(updateConversation(message))
})

export default connect(
    null,
    mapDispatchToProps
)(MessageInput)
