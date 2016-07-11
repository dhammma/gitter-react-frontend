import {fromJS, List, Map} from 'immutable'
import {
    REQUEST_MESSAGES,
    RECEIVE_MESSAGES,
    LOAD_MORE,
    LOAD_UPDATE,
    NEW_MESSAGE,
    EDIT_MESSAGE,
    SEND_MESSAGE
} from '../actions/messages'

const messages = (state = Map(), action) => {
    const {roomId} = action

    switch (action.type) {
        case REQUEST_MESSAGES:
            return state
                .setIn([roomId, 'isFetching'], true)
        case LOAD_UPDATE:
        case RECEIVE_MESSAGES:{
            const currentList = state.getIn([roomId, 'list']) || List()
            const updatedList = currentList.concat(fromJS(action.messages))

            return state
                .setIn([roomId, 'isFetching'], false)
                .setIn([roomId, 'list'], updatedList)
        }
        case LOAD_MORE: {
            const currentList = state.getIn([roomId, 'list']) || List()
            const updatedList = fromJS(action.messages).concat(currentList)

            return state
                .setIn([roomId, 'isFetching'], false)
                .setIn([roomId, 'list'], updatedList)
        }
        case NEW_MESSAGE:
            return state
                .setIn(
                    [roomId, 'list'],
                    state
                        .getIn([roomId, 'list'])
                        .push(fromJS(action.message))
                )
        case EDIT_MESSAGE:
            return state
                .setIn([roomId, 'text'], action.text)
        case SEND_MESSAGE:
            return state
                .setIn([roomId, 'text'], '')
        default:
            return state
    }
}

export default messages