import {getUser} from '../sources/gitter'
import {fetchRooms} from './rooms'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

const shouldFetchUser = (user) => !user || !user.get('isFetching')

export const fetchUser = () => (dispatch, getState) => {
    if (shouldFetchUser(getState().get('user'))) {
        dispatch({type: REQUEST_USER})
        getUser()
            .then(user => dispatch(receiveUser(user)))
            .then(() => dispatch(fetchRooms()))
    }
}