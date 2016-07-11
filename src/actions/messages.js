import {getMessages} from '../sources/gitter'

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'

export const LOAD_MORE = 'LOAD_MORE'

export const NEW_MESSAGE = 'NEW_MESSAGE'

export const loadMore = (roomId) => (dispatch) => {
    // return {
    //     type: LOAD_MORE,
    //     roomId
    // }
    // dispatch(fetchMessagesIfNeeded(roomId))
}

const requestMessages = (roomId) => {
    return {
        type: REQUEST_MESSAGES,
        roomId
    }
}

const receiveMessages = (roomId, messages) => {
    return {
        type: RECEIVE_MESSAGES,
        roomId,
        messages
    }
}

export const newMessage = (roomId, message) => {
    return {
        type: NEW_MESSAGE,
        roomId,
        message
    }
}

const shouldFetchMessages = (state, roomId) => !state.messages.get(roomId)

export const fetchMessages = (roomId, limit, beforeId) => (dispatch, getState) => {
    if (shouldFetchMessages(getState(), roomId)) {
        dispatch(requestMessages(roomId))
        getMessages(roomId, limit, beforeId)
            .then(messages => dispatch(receiveMessages(roomId, messages)))
    }
}