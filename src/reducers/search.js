import {fromJS} from 'immutable'
import {
    SEARCH_QUERY,
    REQUEST_SEARCH,
    RECEIVE_SEARCH
} from '../actions/search'

const search = (state, action) => {
    switch (action.type) {
        case SEARCH_QUERY:
            return state.setIn(['search', 'query'], action.query)
        case REQUEST_SEARCH:
            return state.setIn(['search', 'isFetching'], true)
        case RECEIVE_SEARCH:
            return state.setIn(['search', 'rooms'], fromJS(action.rooms))
        default:
            return state
    }
}

export default search