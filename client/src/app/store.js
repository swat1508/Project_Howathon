import {createStore, compose} from 'redux'
import reducer from './reducers'

export const configureStore = () => {
    const initialState = {}
    return createStore(reducer, initialState, compose)
}

export default configureStore
