import config from '../config/config'

const {token} = config
const authExt = function() {}

authExt.prototype.outgoing = function (message, callback) {
    if (message.channel == '/meta/handshake') {
        if (!message.ext) {
            message.ext = {}
        }

        message.ext.token = token
    }

    callback(message)
}

// authExt.prototype.incoming = function(message, callback) {
//     if(message.channel == '/meta/handshake') {
//         if(message.successful) {
//             console.log('Successfuly subscribed to room: ', roomId);
//         } else {
//             console.log('Something went wrong: ', message.error);
//         }
//     }
//
//     callback(message);
// };

export default authExt