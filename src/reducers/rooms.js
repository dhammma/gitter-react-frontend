import {fromJS} from 'immutable'
import {
    REQUEST_ROOMS,
    RECEIVE_ROOMS
} from '../actions/rooms'

const rooms = (state, action) => {
    switch (action.type) {
        case REQUEST_ROOMS:
            return state.set('rooms', fromJS({
                isFetching: true,
                list: []
            }))
        case RECEIVE_ROOMS:
            return state
                .setIn(['rooms', 'isFetching'], false)
                .mergeIn(['rooms', 'list'], action.rooms)
        default:
            return state
    }
}

export default rooms