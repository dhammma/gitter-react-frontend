import {
    REQUEST_USER,
    RECEIVE_USER
} from '../actions/user'

const user = (state, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return state.setIn(['user', 'isFetching'], true)
        case RECEIVE_USER:
            return state
                .setIn(['user', 'isFetching'], false)
                .mergeIn(['user'], action.user)
        default:
            return state
    }
}

export default user