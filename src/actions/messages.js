import fetch from 'isomorphic-fetch'
import config from '../config/config'
import _ from 'lodash'

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'

export const requestMessages = (roomId) => {
    return {
        type: REQUEST_MESSAGES,
        roomId
    }
}

export const receiveMessages = (roomId, messages) => {
    return {
        type: RECEIVE_MESSAGES,
        roomId,
        messages
    }
}

const mapJSONToMessages = (json) => _.map(json, (message) => _.pick(message, [
    'id',
    'text',
    'html',
    'sent',
    'fromUser',
    'unread',
    'readBy',
    'urls',
    'mentions',
    'issues',
    'meta',
    'v'
]))

const fetchMessages = (roomId) => dispatch => {
    dispatch(requestMessages(roomId))
    fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?access_token=${config.token}`)
        .then(response => response.json())
        .then(json => mapJSONToMessages(json))
        .then(messages => dispatch(receiveMessages(roomId, messages)))
}

const shouldFetchMessages = (state, roomId) => {
    return !state.getIn(['messages', roomId])
        || state.getIn(['rooms', 'list'])
            .find(room => room.get('id') === roomId)
            .get('unreadItems')
}

export const fetchMessagesIfNeeded = (roomId) => (dispatch, getState) => {
    if (shouldFetchMessages(getState(), roomId)) {
        return dispatch(fetchMessages(roomId))
    }
}