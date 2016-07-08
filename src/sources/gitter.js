import qs from 'qs'
import fetch from 'isomorphic-fetch'
import config from '../config/config'
import {mapUser, mapRoom, mapMessage} from '../helpers/mappers'
import _ from 'lodash'

const {token} = config

const apiUrl = 'https://api.gitter.im/v1'

const callApi = (endpoint, params = {}) => {
    const query = qs.stringify({
        access_token: token,
        ...params
    })
    return fetch(`${apiUrl}/${endpoint}?${query}`)
        .then(response => response.json())
}

export const getUser = () => callApi('user')
    .then(data => mapUser(_.head(data)))

export const getRooms = (roomId) => callApi(`user/${roomId}/rooms`)
    .then(data => _.map(data, mapRoom))

export const getMessages = (roomId, limit = 50, beforeId) => callApi(
    `rooms/${roomId}/chatMessages`,
    {limit, beforeId}
).then(data => _.map(data, mapMessage))