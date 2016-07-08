import {fromJS} from 'immutable'
import config from '../config/config'
import _ from 'lodash'

const INITIAL_STATE = fromJS({
    token: config.token,
    msg: _.range(0, 100)
})

export default INITIAL_STATE