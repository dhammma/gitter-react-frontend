import {
    ROOM_SELECT,
    JOIN_TO_ROOM,
    LEAVE_ROOM
} from '../actions/room'
import {fromJS} from 'immutable'

const room = (store, action) => {
    switch (action.type) {
        case ROOM_SELECT:
            return store.set('selectedRoom', action.roomId)
        case JOIN_TO_ROOM:
            return store.setIn(['rooms', 'list'], store.getIn(['rooms', 'list']).push(fromJS(action.room)))
        case LEAVE_ROOM:
            return store.setIn(['rooms', 'list'], store.getIn(['rooms', 'list']).remove(
                store.getIn(['rooms', 'list']).findKey(room => room.get('id') === action.roomId)
            ))
        default:
            return state
    }
}

export default room