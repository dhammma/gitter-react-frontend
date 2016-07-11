import {fetchMessages, loadUpdate} from './messages'
import {getRepo} from '../sources/gitter'
import {subscribeToMessages} from './faye'

export const ROOM_SELECT = 'ROOM_SELECT'
export const JOIN_TO_ROOM = 'JOIN_TO_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const PATCH_ROOM = 'PATCH_ROOM'

export const roomSelect = (roomId) => dispatch => {
    dispatch({
        type: ROOM_SELECT,
        roomId
    })
    dispatch(fetchMessages(roomId))
    dispatch(loadUpdate(roomId))
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