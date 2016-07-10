import {joinToRoom, leaveRoom, patchRoom} from '../actions/room'
import {mapRoom} from '../helpers/mappers'
import {newMessage} from '../actions/messages'

const roomsSubscriber = (dispatch) => (({operation, model}) => {
    switch (operation) {
        case 'create':
            dispatch(joinToRoom(model))
            break;
        case 'remove':
            dispatch(leaveRoom(model.id))
            break;
        case 'patch':
            dispatch(patchRoom(model.id, mapRoom(model)))
            break
    }
})

const messagesSubscriber = (dispatch) => ({operation, model}) => {
    switch (operation) {
        case 'create':
            dispatch(newMessage(model))
            break;
    }
}