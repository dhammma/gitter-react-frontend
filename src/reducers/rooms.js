import {fromJS} from 'immutable'
import {
    REQUEST_ROOMS,
    RECEIVE_ROOMS
} from '../actions/rooms'
import {
    ROOM_SELECT,
    JOINED_TO_ROOM,
    LEAVED_FROM_ROOM,
    PATCH_ROOM
} from '../actions/room'

const INITIAL_STATE = fromJS({
    selectedId: undefined,
    isFetching: false,
    list: []
})

const rooms = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_ROOMS:
            return state
                .set('isFetching', true)
        case RECEIVE_ROOMS:
            return state
                .set('isFetching', false)
                .set('list', fromJS(action.rooms))
        case ROOM_SELECT:
            return state
                .set('selectedId', action.roomId)
        case JOINED_TO_ROOM:
            return state
                .set(
                    'list',
                    state
                        .get('list')
                        .push(fromJS(action.room))
                )
        case LEAVED_FROM_ROOM:
            return state.set('list', state.get('list').remove(
                state
                    .get('list')
                    .findKey(room => room.get('id') === action.roomId)
            ))
        case PATCH_ROOM:
            const room = state
                .get('list')
                .find(room => room.get('id') === action.roomId)
            const patchedRoom = room
                .merge(fromJS(action.patchData))
            const roomKey = state
                .get('list')
                .findKey(room => room.get('id') === action.roomId)
            return state
                .setIn(['list', roomKey], patchedRoom)
        default:
            return state
    }
}

export default rooms