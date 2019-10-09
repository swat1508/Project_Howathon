import {initializeApp} from '../../actions'

export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION'

export const initializeHome = () => (dispatch) => {
    return Promise.all([
        dispatch(initializeApp()),
    ])
    .then(() => ({statusCode: 200}))
    .catch((err) => ({statusCode: err.statusCode || 500}))
}

export const updateConversation = (message) => {
    return {
        type: UPDATE_CONVERSATION,
        payload: {conversations: [message]}
    }
} 