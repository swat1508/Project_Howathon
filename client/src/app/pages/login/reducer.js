import Immutable from 'immutable'

import {UPDATE_USER_INFO} from './actions'

const initialState = Immutable.Map({
    user: {}
})

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default loginReducer
