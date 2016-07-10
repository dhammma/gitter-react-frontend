import {searchRooms} from '../sources/gitter'

export const SEARCH_QUERY = 'REQUEST_SEARCH'

export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'

export const searchQuery = (query) => dispatch => {
    dispatch({
        type: SEARCH_QUERY,
        query
    })
    if (query !== '') {
        dispatch({type: REQUEST_SEARCH})
        searchRooms(query)
            .then((rooms) => dispatch({
                type: RECEIVE_SEARCH,
                rooms
            }))
    }
}