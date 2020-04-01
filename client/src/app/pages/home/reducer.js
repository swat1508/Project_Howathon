import Immutable from 'immutable'

import {UPDATE_CONVERSATION} from './actions'

const initialState = Immutable.Map({
    conversations: []
})

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CONVERSATION:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default homeReducer
