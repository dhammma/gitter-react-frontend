import {fromJS, List, Map} from 'immutable'
import {
    REQUEST_MESSAGES,
    RECEIVE_MESSAGES,
    LOAD_MORE
} from '../actions/messages'

const messages = (state = Map(), action) => {
    const {roomId} = action

    switch (action.type) {
        case REQUEST_MESSAGES:
            return state
                .setIn([roomId, 'isFetching'], true)
        case RECEIVE_MESSAGES:
            const currentList = state.getIn([roomId, 'list']) || List()
            const updatedList = currentList.concat(fromJS(action.messages))

            return state
                .setIn([roomId, 'isFetching'], false)
                .setIn([roomId, 'list'], updatedList)
        case LOAD_MORE:
            return state
        default:
            return state
    }
}

export default messages