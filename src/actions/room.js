import {fetchMessagesIfNeeded} from './messages'
import {getRepo} from '../sources/gitter'

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

export const extendRepoRoom = (roomId, repoName) => dispatch => {
    getRepo(repoName)
        .then((repo) => dispatch(patchRoom(roomId, repo)))
}

export const extendRoomIfNeeded = (room) => dispatch => {
    switch (room.githubType) {
        case 'REPO':
            dispatch(extendRepoRoom(room.id, room.name))
    }
}