import {combineReducers} from 'redux'
import user from './user'
import rooms from './rooms'
import messages from './messages'
import search from './search'
import faye from './faye'

const reducers = combineReducers({
    user,
    rooms,
    messages,
    search,
    faye
})

export default reducers