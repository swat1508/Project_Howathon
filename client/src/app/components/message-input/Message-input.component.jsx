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
        const message = {
            message: input,
            bot: false,
            timeStamp: new Date().getTime(),
            userId: userInfo && userInfo.id || (localStorage.getItem('userId'))
        }
        console.log(message)
        updateConversations(message)
        const host = window.location.hostname
        const port = 4001
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
    updateConversations: PropTypes.func,
    userInfo: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    userInfo: getUser
})

const mapDispatchToProps = (dispatch) => ({
    updateConversations: (message) =>
        dispatch(updateConversation(message))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageInput)
