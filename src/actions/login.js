import {getToken} from '../sources/login'
const REQUEST_TOKEN = 'REQUEST_TOKEN'
const RECEIVE_TOKEN = 'RECEIVE_TOKEN'

export const requestToken = (code) => dispatch => {
    dispatch({type: REQUEST_TOKEN})
    getToken(code)
        .then(data => dispatch(receiveToken(data.token)))
}

export const receiveToken = (token) => {
    return {
        type: RECEIVE_TOKEN,
        token
    }
}