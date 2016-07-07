import config from '../config/config'

const {token} = config

const incoming = (message, callback) => {
    callback(message)
}

const outgoing = (message, callback) => {
    if (message.channel == '/meta/handshake') {
        if (!message.ext) {
            message.ext = {}
        }
        message.ext.token = token;
    }
    callback(message);
}

const authExtension = {incoming, outgoing}

export default authExtension