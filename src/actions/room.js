import {fetchMessagesIfNeeded} from './messages'

export const ROOM_SELECT = 'ROOM_SELECT'

export const roomSelect = (roomId) => {
    return {
        type: ROOM_SELECT,
        roomId
    }
}

export const roomSelectAndFetchMessages = (roomId) => dispatch => {
    dispatch(roomSelect(roomId))
    dispatch(fetchMessagesIfNeeded(roomId))
}