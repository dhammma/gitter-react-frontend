import fetch from 'isomorphic-fetch'
import config from '../config/config'
import _ from 'lodash'
import fayeClient from '../faye/fayeClient'

import {
    joinToRoom,
    leaveRoom,
    mapJSONToRoom
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

const mapJSONToRooms = (json) => _.map(json, mapJSONToRoom)

const fetchRooms = (state) => dispatch => {
    const userId = state.get('user') && state.getIn(['user', 'id'])
    dispatch(requestRooms())
    fetch(`https://api.gitter.im/v1/user/${userId}/rooms?access_token=${config.token}`)
        .then(response => response.json())
        .then(json => mapJSONToRooms(json))
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
    fayeClient.subscribe(`/api/v1/user/${userId}/rooms`, (message) => {
        switch (message.operation) {
            case 'create':
                dispatch(joinToRoom(message.model))
                break;
            case 'remove':
                dispatch(leaveRoom(message.model.id))
                break;
        }
    })
}