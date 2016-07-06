import fetch from 'isomorphic-fetch'
import config from '../config/config'
import _ from 'lodash'

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

const mapJSONToRooms = (json) => _.map(json, (room) => _.pick(room, [
    'id',
    'name',
    'topic',
    'oneToOne',
    'users',
    'userCount',
    'unreadItems',
    'mentions',
    'lastAccessTime',
    'favourite',
    'lurk',
    'url',
    'githubType',
    'tags',
    'v'
]))

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