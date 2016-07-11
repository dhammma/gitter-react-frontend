import {fromJS} from 'immutable'
import {
    REQUEST_USER,
    RECEIVE_USER
} from '../actions/user'

const INITIAL_STATE = fromJS({
    isFetching: false
})

const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return state
                .set('isFetching', true)
        case RECEIVE_USER:
            return state
                .set('isFetching', false)
                .merge(action.user)
        default:
            return state
    }
}

export default user