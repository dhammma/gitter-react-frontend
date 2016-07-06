// import {combineReducers} from 'redux'
import {
    REQUEST_USER,
    RECEIVE_USER
} from '../actions/user'
import {
    REQUEST_ROOMS,
    RECEIVE_ROOMS
} from '../actions/rooms'
import user from './user'
import rooms from './rooms'

const rootReducer = (state, action) => {
    switch (action.type) {
        case REQUEST_USER:
        case RECEIVE_USER:
            return user(state, action)
        case RECEIVE_ROOMS:
        case REQUEST_ROOMS:
            return rooms(state, action)
        default:
            return state
    }
}

export default rootReducer