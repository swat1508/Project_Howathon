import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from "redux-saga";
import reducer from './reducers'
import mySaga from "./../store/sagas";

export const configureStore = () => {
    const initialState = {}
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(mySaga);
    return store
}

export default configureStore
