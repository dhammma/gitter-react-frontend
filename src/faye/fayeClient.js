import Faye from 'faye'
import config from '../config/config'
import authExtension from './authExtensions'

const {endpoint, timeout, retry, interval} = config.faye

const fayeClient = new Faye.Client(endpoint, {timeout, retry, interval})

fayeClient.addExtension(authExtension)

export default fayeClient