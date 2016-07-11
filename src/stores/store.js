import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/reducers'

const configureStore = () => createStore(
    reducers,
    undefined,
    applyMiddleware(thunk)
)

export default configureStore