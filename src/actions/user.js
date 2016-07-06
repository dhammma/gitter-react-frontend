import fetch from 'isomorphic-fetch'
import config from '../config/config'
import _ from 'lodash'

import {fetchRoomsIfNeeded} from './rooms'

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

const mapJSONToUser = (json) =>  _.pick(_.head(json), [
    'id',
    'username',
    'displayName',
    'url',
    'avatarUrlSmall',
    'avatarUrlMedium'
])

const fetchUser = () => dispatch => {
    dispatch(requestUser())
    fetch(`https://api.gitter.im/v1/user?access_token=${config.token}`)
        .then(response => response.json())
        .then(json => mapJSONToUser(json))
        .then(user => dispatch(receiveUser(user)))
        .then(() => dispatch(fetchRoomsIfNeeded()))
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