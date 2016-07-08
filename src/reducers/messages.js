import {fromJS, List} from 'immutable'
import {
    REQUEST_MESSAGES,
    RECEIVE_MESSAGES,
    LOAD_MORE
} from '../actions/messages'

const messages = (state, action) => {
    const {roomId} = action

    switch (action.type) {
        case REQUEST_MESSAGES:
            return state
                .setIn(['messages', roomId, 'isFetching'], true)
        case RECEIVE_MESSAGES:
            const currentList = state.getIn(['messages', roomId, 'list']) || List()
            const updatedList = currentList.concat(fromJS(action.messages))

            return state
                .setIn(['messages', roomId, 'isFetching'], false)
                .setIn(['messages', roomId, 'list'], updatedList)
        case LOAD_MORE:
            return state
        default:
            return state
    }
}

export default messages