import {combineReducers} from 'redux'
import homeReducer from './pages/home/reducer.js'
import loginReducer from './pages/login/reducer.js'
// Reducers

export default combineReducers({
    ui: combineReducers({
        pages: combineReducers({
            home: homeReducer,
            login: loginReducer
        })
    }),
})
