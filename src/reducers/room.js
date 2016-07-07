import {ROOM_SELECT} from '../actions/room'

const room = (store, action) => {
    switch (action.type) {
        case ROOM_SELECT:
            return store.set('selectedRoom', action.roomId)
        default:
            return state
    }
}

export default room