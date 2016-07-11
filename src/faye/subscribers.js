import {joinedToRoom, leavedFromRoom, patchRoom} from '../actions/room'
import {mapRoom, mapMessage} from '../helpers/mappers'
import {newMessage} from '../actions/messages'

export const roomsSubscriber = (dispatch) => (({operation, model}) => {
    switch (operation) {
        case 'create':
            dispatch(joinedToRoom(model))
            break;
        case 'remove':
            dispatch(leavedFromRoom(model.id))
            break;
        case 'patch':
            dispatch(patchRoom(model.id, mapRoom(model)))
            break
    }
})

export const messagesSubscriber = (dispatch, roomId) => ({operation, model}) => {
    switch (operation) {
        case 'create':
            dispatch(newMessage(roomId, mapMessage(model)))
            break;
    }
}