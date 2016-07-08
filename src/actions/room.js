import {fetchMessagesIfNeeded} from './messages'

export const ROOM_SELECT = 'ROOM_SELECT'
export const JOIN_TO_ROOM = 'JOIN_TO_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const PATCH_ROOM = 'PATCH_ROOM'

export const roomSelect = (roomId) => {
    return {
        type: ROOM_SELECT,
        roomId
    }
}

export const mapJSONToRoom = (json) => _.pick(json, [
    'id',
    'name',
    'topic',
    'oneToOne',
    'user',
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
])

export const joinToRoom = (room) => {
    return {
        type: JOIN_TO_ROOM,
        room
    }
}

export const leaveRoom = (roomId) => {
    return {
        type: LEAVE_ROOM,
        roomId
    }
}

export const patchRoom = (roomId, patchData) => dispatch => {
    dispatch({
        type: PATCH_ROOM,
        roomId,
        patchData
    })
    dispatch(fetchMessagesIfNeeded(roomId))
}

export const roomSelectAndFetchMessages = (roomId) => dispatch => {
    dispatch(roomSelect(roomId))
    dispatch(fetchMessagesIfNeeded(roomId))
}