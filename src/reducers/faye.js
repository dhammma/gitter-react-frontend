import {
    SUBSCRIBE_TO_ROOMS,
    UNSUBSCRIBE_FROM_ROOMS,
    SUBSCRIBE_TO_MESSAGES,
    UNSUBSCRIBE_FROM_MESSAGES
} from '../actions/faye'

const faye = (state, action) => {
    switch (action.type) {
        case SUBSCRIBE_TO_ROOMS:
            return state.set('rooms', action.subscriber)
        case UNSUBSCRIBE_FROM_ROOMS:
            return state.remove('rooms')
        case SUBSCRIBE_TO_MESSAGES:
            return state.setIn(['messages', action.roomId], action.subscriber)
        case UNSUBSCRIBE_FROM_MESSAGES:
            return state.set(
                'messages',
                state
                    .get('messages')
                    .remove(action.roomId)
            )
        default:
            return state
    }
}

export default faye