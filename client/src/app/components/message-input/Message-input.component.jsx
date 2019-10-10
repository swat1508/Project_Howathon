import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPropsSelector} from 'reselect-immutable-helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {updateConversation} from './../../pages/home/actions'
import './Message-input.styles.scss';
import axios from 'axios'
import {getUser} from '../../pages/login/selectors'
import { serverUrl } from '../../../constant/constant';

const MessageInput = (props) => {
    console.log('============', props.userInfo);
    return (
        <div className="message-input">
            <div className="wrap">
                <input type="text" placeholder="Write your message..." onKeyPress={(event) => updateChatHistory(event, props.updateConversations, props.userInfo)}></input>
                <button className="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}

const updateChatHistory = (event, updateConversations, userInfo) => {
    if (event.which === 13) {
        const input = event.target.value
        event.target.value = ''
        const inputMessage = {
            message: input,
            timeStamp: new Date().getTime(),
            userId: userInfo && userInfo.id || (localStorage.getItem('userId'))
        }
        let botMessage = {
            timeStamp: new Date().getTime()
        }
        console.log(inputMessage)
        updateConversations(inputMessage, false)
        axios
            .post(`${serverUrl}/triggerRecastOps`, inputMessage)
            .then((res) => {
                if (res.data && res.data.data && res.data.data !== "") {
                    botMessage.message = "Intent identified as: " + (res.data && res.data.data)
                } else {
                    botMessage.message = "I'm not sure how to help you with this, you may try to search Google!"
                }
                updateConversations(botMessage, true)
            })
            .catch((err) => {
                updateConversations("Something went wrong, please try again!", true)
            })
    }
}

MessageInput.propTypes = {
    updateConversations: PropTypes.func,
    userInfo: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    userInfo: getUser
})

const mapDispatchToProps = (dispatch) => ({
    updateConversations: (message, isBot) =>
        dispatch(updateConversation(message, isBot))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageInput)
