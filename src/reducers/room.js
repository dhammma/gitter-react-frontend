import {
    ROOM_SELECT,
    JOIN_TO_ROOM,
    LEAVE_ROOM,
    PATCH_ROOM
} from '../actions/room'
import {fromJS} from 'immutable'

const room = (state, action) => {
    switch (action.type) {
        case ROOM_SELECT:
            return state.set('selectedRoom', action.roomId)
        case JOIN_TO_ROOM:
            return state.setIn(['rooms', 'list'], state.getIn(['rooms', 'list']).push(fromJS(action.room)))
        case LEAVE_ROOM:
            return state.setIn(['rooms', 'list'], state.getIn(['rooms', 'list']).remove(
                state.getIn(['rooms', 'list']).findKey(room => room.get('id') === action.roomId)
            ))
        case PATCH_ROOM:
            const room = state
                .getIn(['rooms', 'list'])
                .find(room => room.get('id') === action.roomId)
            const patchedRoom = room
                .merge(fromJS(action.patchData))
            const roomKey = state.getIn(['rooms', 'list']).findKey(room => room.get('id') === action.roomId)
            return state.setIn(['rooms', 'list', roomKey], patchedRoom)
        default:
            return state
    }
}

export default room