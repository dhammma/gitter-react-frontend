import {fromJS} from 'immutable'
import {
    REQUEST_MESSAGES,
    RECEIVE_MESSAGES
} from '../actions/messages'

const messages = (state, action) => {
    const {roomId} = action

    switch (action.type) {
        case REQUEST_MESSAGES:
            return state.setIn(['messages', roomId], fromJS({
                isFetching: true,
                list: []
            }))
        case RECEIVE_MESSAGES:
            return state.setIn(['messages', roomId], fromJS({
                isFetching: false,
                list: action.messages
            }))
        default:
            return state
    }
}

export default messages