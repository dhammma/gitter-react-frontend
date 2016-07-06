import client from './client'

// const roomId =
const roomId = 0
const messageHandler = function (msg) {
    console.log(msg)
}

// const subscribe = () => {
//     client.subscribe('/api/v1/rooms/' + roomId,                   messageHandler, {});
//     client.subscribe('/api/v1/rooms/' + roomId + '/chatMessages', messageHandler, {});
//     client.subscribe('/api/v1/rooms/' + roomId + '/users',        messageHandler, {});
//     client.subscribe('/api/v1/rooms/' + roomId + '/events',       messageHandler, {});
// }