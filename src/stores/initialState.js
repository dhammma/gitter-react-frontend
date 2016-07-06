import {fromJS} from 'immutable'
import config from '../config/config'

const INITIAL_STATE = fromJS({
    token: config.token
})

export default INITIAL_STATE