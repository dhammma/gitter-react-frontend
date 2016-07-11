import {subscribeToRooms} from './faye'
import {checkRoomAvatars} from './room'
import {getRooms} from '../sources/gitter'

export const REQUEST_ROOMS = 'REQUEST_ROOMS'
export const RECEIVE_ROOMS = 'RECEIVE_ROOMS'

const receiveRooms = (rooms) => {
    return {
        type: RECEIVE_ROOMS,
        rooms
    }
}

const shouldFetchRooms = (rooms) => !rooms || !rooms.get('isFetching')

export const fetchRooms = () => (dispatch, getState) => {
    if (shouldFetchRooms(getState().rooms)) {
        const userId = getState().user.get('id')
        dispatch({type: REQUEST_ROOMS})
        getRooms(userId)
            .then(rooms => {
                dispatch(receiveRooms(rooms))
                dispatch(subscribeToRooms(userId))
                _.map(rooms, room => dispatch(checkRoomAvatars(room)))
            })
    }
}