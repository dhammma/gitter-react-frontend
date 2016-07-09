import {fromJS} from 'immutable'
import config from '../config/config'
import _ from 'lodash'

const INITIAL_STATE = fromJS({
    token: config.token,
    messages: {},
    rooms: {
        isFetching: false,
        list: []
    }
})

export default INITIAL_STATE