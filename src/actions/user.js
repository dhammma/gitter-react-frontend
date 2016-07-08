import {getUser} from '../sources/gitter'

import {
    fetchRoomsIfNeeded,
    subscribeToRooms
} from './rooms'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export const requestUser = () => {
    return {
        type: REQUEST_USER
    }
}

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

const fetchUser = () => dispatch => {
    dispatch(requestUser())
    getUser()
        .then(user => dispatch(receiveUser(user)))
        .then(() => dispatch(fetchRoomsIfNeeded()))
        .then(() => dispatch(subscribeToRooms()))
}

const shouldFetchUser = (state) => {
    const user = state.get('user')

    return !user || !user.get('isFetching')
}

export const fetchUserIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchUser(getState())) {
        return dispatch(fetchUser())
    }
}