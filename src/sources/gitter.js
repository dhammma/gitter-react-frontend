import qs from 'qs'
import fetch from 'isomorphic-fetch'
import config from '../config/config'
import {
    mapUser, 
    mapRoom, 
    mapMessage,
    mapRepo
} from '../helpers/mappers'
import _ from 'lodash'

const {token} = config

const apiUrl = 'https://api.gitter.im/v1'
const stagingApiUrl = 'https://gitter.im/api_staging/v1'

const getCallApiWrapper = apiUrl => (endpoint, params = {}) => {
    const query = qs.stringify({
        access_token: token,
        ...params
    })
    return fetch(`${apiUrl}/${endpoint}?${query}`)
        .then(response => response.json())
}

const callApi = getCallApiWrapper(apiUrl)
const callStagingApi = getCallApiWrapper(stagingApiUrl)

export const getUser = () => callApi('user')
    .then(data => mapUser(_.head(data)))

export const getRooms = (roomId) => callApi(`user/${roomId}/rooms`)
    .then(data => _.map(data, mapRoom))

export const getMessages = (roomId, limit = 50, beforeId, afterId) => callApi(
    `rooms/${roomId}/chatMessages`,
    {limit, beforeId, afterId}
).then(data => _.map(data, mapMessage))

export const searchRooms = (q) => callApi(`rooms`, {q})
    .then(data => _.map(data.results, mapRoom))

export const getRepo = (repo) => callStagingApi('repo-info', {repo})
    .then(data => mapRepo(data))