import fayeClient from '../faye/fayeClient'
import {roomsSubscriber, messagesSubscriber} from '../faye/subscribers'

export const SUBSCRIBE_TO_ROOMS = 'SUBSCRIBE_TO_ROOMS'
export const UNSUBSCRIBE_FROM_ROOMS = 'UNSUBSCRIBE_FROM_ROOMS'
export const SUBSCRIBE_TO_MESSAGES = 'SUBSCRIBE_TO_MESSAGES'
export const UNSUBSCRIBE_FROM_MESSAGES = 'UNSUBSCRIBE_FROM_MESSAGES'

export const subscribeToRooms = () => (dispatch, getState) => {
    const userId = getState().user.get('id')
    const subscription = fayeClient.subscribe(`/api/v1/user/${userId}/rooms`, roomsSubscriber(dispatch))

    dispatch({
        type: SUBSCRIBE_TO_ROOMS,
        subscription
    })
}

export const unsubscribeFromRooms = () => (dispatch, getState) => {
    const userId = getState().user.get('id')
    const subscriber = getState().faye.get('user')

    fayeClient.unsubscribe(`/api/v1/user/${userId}/rooms`, subscriber)
    dispatch({type: UNSUBSCRIBE_FROM_ROOMS})
}

export const subscribeToMessages = (roomId) => (dispatch) => {
    const subscription = fayeClient
        .subscribe(
            `/api/v1/rooms/${roomId}/chatMessages`,
            messagesSubscriber(dispatch, roomId)
        )

    dispatch({
        type: SUBSCRIBE_TO_MESSAGES,
        roomId,
        subscription
    })
}

export const unsubscribeFromMessages = (roomId) => (dispatch, getState) => {
    const subscriber = getState().faye.getIn(['messages', roomId])
    fayeClient.unsubscribe(`/api/v1/rooms/${roomId}/chatMessages`, subscriber)
    dispatch({
        type: UNSUBSCRIBE_FROM_MESSAGES,
        roomId
    })
}