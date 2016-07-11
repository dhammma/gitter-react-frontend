import {getMessages} from '../sources/gitter'

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'

export const LOAD_MORE = 'LOAD_MORE'
export const LOAD_UPDATE = 'LOAD_UPDATE'

export const NEW_MESSAGE = 'NEW_MESSAGE'

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

export const loadMore = (roomId) => (dispatch, getState) => {
    if (!getState().messages.getIn([roomId, 'isFetching'])) {
        const beforeId = getState().messages.getIn([roomId, 'list']).first().get('id')
        dispatch(requestMessages(roomId))
        getMessages(roomId, undefined, beforeId)
            .then(messages => dispatch({
                type: LOAD_MORE,
                roomId,
                messages
            }))
    }
}

export const loadUpdate = (roomId) => (dispatch, getState) => {
    if (!getState().messages.getIn([roomId, 'isFetching'])) {
        const afterId = getState().messages.getIn([roomId, 'list']).last().get('id')
        const limit = getState().rooms.getIn([roomId, 'unreadItems'])
        dispatch(requestMessages(roomId))
        getMessages(roomId, limit, undefined, afterId)
            .then(messages => dispatch({
                type: LOAD_UPDATE,
                roomId,
                messages
            }))
    }
}