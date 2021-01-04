import {combineReducers} from 'redux'

import authReducer from './auth'

const rootReducer = combineReducers({
    authState: authReducer
})

export default rootReducer;