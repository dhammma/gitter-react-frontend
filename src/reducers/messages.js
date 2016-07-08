import {fromJS} from 'immutable'
import {
    REQUEST_MESSAGES,
    RECEIVE_MESSAGES,
    LOAD_MORE
} from '../actions/messages'

const step = 100

const messages = (state, action) => {
    const {roomId} = action

    switch (action.type) {
        case REQUEST_MESSAGES:
            return state.setIn(['messages', roomId], fromJS({
                isFetching: true,
                list: state.getIn(['messages', roomId, 'list']) && state.getIn(['messages', roomId, 'list']).toJS() || []
            }))
        case RECEIVE_MESSAGES:
            const list = state.getIn(['messages', roomId, 'list'])
            const nextList = list.concat(fromJS(action.messages))
            console.log('list', list.toJS())
            console.log('nextList', nextList.toJS())
            return state
                .setIn(['messages', roomId, 'isFetching'], false)
                .setIn(
                    ['messages', roomId, 'list'],
                    state.getIn(['messages', roomId, 'list']).concat(fromJS(action.messages))
                )
            // return state.setIn(['messages', roomId], fromJS({
            //     isFetching: false,
            //     list: action.messages
            // }))
        case LOAD_MORE:
            return state.set('msg', state.get('msg').concat(
                fromJS(_.range(
                    state.get('msg').size,
                    state.get('msg').size + step
                ).map(i => `message ${i}`))
            ))
        default:
            return state
    }
}

export default messages