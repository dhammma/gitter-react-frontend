import {createStore} from 'redux'
import rootReducer from '../reducers/rootReducer'
import INITIAL_STATE from './initialState'

const configureStore = () => createStore(rootReducer, INITIAL_STATE)

export default configureStore