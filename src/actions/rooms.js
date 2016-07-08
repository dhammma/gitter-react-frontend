import fayeClient from '../faye/fayeClient'
import {getRooms} from '../sources/gitter'
import {mapRoom} from '../helpers/mappers'

import {
    joinToRoom,
    leaveRoom,
    patchRoom
} from './room'

export const REQUEST_ROOMS = 'REQUEST_ROOMS'
export const RECEIVE_ROOMS = 'RECEIVE_ROOMS'

export const requestRooms = () => {
    return {
        type: REQUEST_ROOMS
    }
}

export const receiveRooms = (rooms) => {
    return {
        type: RECEIVE_ROOMS,
        rooms
    }
}

const fetchRooms = (state) => dispatch => {
    const userId = state.get('user') && state.getIn(['user', 'id'])
    dispatch(requestRooms())
    getRooms(userId)
        .then(rooms => dispatch(receiveRooms(rooms)))
}

const shouldFetchRooms = (state) => {
    const rooms = state.get('rooms')

    return !rooms || !rooms.get('isFetching')
}

export const fetchRoomsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchRooms(getState())) {
        return dispatch(fetchRooms(getState()))
    }
}

export const subscribeToRooms = () => (dispatch, getState) => {
    const userId = getState().getIn(['user', 'id'])
    fayeClient.subscribe(`/api/v1/user/${userId}/rooms`, ({operation, model}) => {
        switch (operation) {
            case 'create':
                dispatch(joinToRoom(model))
                break;
            case 'remove':
                dispatch(leaveRoom(model.id))
                break;
            case 'patch':
                dispatch(patchRoom(model.id, mapRoom(model)))
                break
        }
    })
}