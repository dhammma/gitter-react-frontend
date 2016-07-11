import Faye from 'faye'
import config from '../config/config'

const {endpoint, timeout, retry, interval} = config.faye

const fayeClient = new Faye.Client(endpoint, {timeout, retry, interval})

const token = localStorage.getItem('token')

const outgoing = (message, callback) => {
    if (message.channel == '/meta/handshake') {
        if (!message.ext) {
            message.ext = {}
        }
        message.ext.token = token;
    }
    callback(message);
}

fayeClient.addExtension({outgoing})

export default fayeClient