import Faye from 'faye'
import config from '../config/config'
import authExt from './authExt'

const {endpoint, timeout, retry, interval} = config.faye

const client = new Faye.Client(endpoint, {timeout, retry, interval})

client.addExtension(new authExt())

export default client