import {fetchMessages, loadUpdate} from './messages'
import {getRepo, joinRoom, leaveRoom} from '../sources/gitter'
import {subscribeToMessages} from './faye'

export const ROOM_SELECT = 'ROOM_SELECT'
export const JOIN_TO_ROOM = 'JOIN_TO_ROOM'
export const LEAVE_FROM_ROOM = 'LEAVE_FROM_ROOM'
export const JOINED_TO_ROOM = 'JOINED_TO_ROOM'
export const LEAVED_FROM_ROOM = 'LEAVED_FROM_ROOM'
export const PATCH_ROOM = 'PATCH_ROOM'

export const roomSelect = (roomId) => dispatch => {
    dispatch({
        type: ROOM_SELECT,
        roomId
    })
    dispatch(fetchMessages(roomId))
    dispatch(loadUpdate(roomId))
    dispatch(subscribeToMessages(roomId))
}

export const joinedToRoom = (room) => {
    return {
        type: JOINED_TO_ROOM,
        room
    }
}

export const leavedFromRoom = (roomId) => {
    return {
        type: LEAVED_FROM_ROOM,
        roomId
    }
}

export const patchRoom = (roomId, patchData) => dispatch => {
    dispatch({
        type: PATCH_ROOM,
        roomId,
        patchData
    })
    dispatch(fetchMessages(roomId))
}

export const getRepoRoomAvatar = (roomId, repoName) => (dispatch) => {
    getRepo(repoName)
        .then((repo) => dispatch(patchRoom(roomId, repo)))
}

export const checkRoomAvatars = (room) => dispatch => {
    switch (room.githubType) {
        case 'REPO':
            //dispatch(extendRepoRoom(room.id, room.name))
    }
}

export const joinToRoom = (roomUri) => (dispatch) => {
    dispatch({type: JOIN_TO_ROOM, roomUri})
    joinRoom(roomUri)
}

export const leaveFromRoom = (roomId) => (dispatch, getState) => {
    dispatch({type: LEAVE_FROM_ROOM})
    const userId = getState().user.get('id')
    leaveRoom(roomId, userId)
}