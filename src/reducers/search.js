import {fromJS} from 'immutable'
import {
    SEARCH_QUERY,
    REQUEST_SEARCH,
    RECEIVE_SEARCH
} from '../actions/search'

const INITIAL_STATE = fromJS({
    isFetching: false,
    query: '',
    rooms: ''
})

const search = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_QUERY:
            return state.set('query', action.query)
        case REQUEST_SEARCH:
            return state.set('isFetching', true)
        case RECEIVE_SEARCH:
            return state.set('rooms', fromJS(action.rooms))
        default:
            return state
    }
}

export default search