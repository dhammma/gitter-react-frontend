import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import INITIAL_STATE from './initialState'

const configureStore = () => createStore(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(thunk)
)

export default configureStore