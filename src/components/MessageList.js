import React from 'react'
import ChatView from 'react-chatview'
import Message from './Message'
import MessageBox from './MessageBox'
import _ from 'lodash'

const onInfiniteLoad = (loadMore, roomId) => () => {
    return new Promise(resolve => {
        loadMore(roomId)
        resolve()
    })
}

const getMessages = (messages) => _.map(messages, message => (
    <Message
        key={message.id}
        user={message.fromUser.displayName}
        avatar={message.fromUser.avatarUrlSmall}
        text={message.text}
        time={message.sent}
    />
))

const MessageList = ({
    roomId,
    uri,
    messages,
    loadMore,
    isJoined,
    joinToRoom,
    leaveFromRoom,
    sendMessage,
    editMessage,
    text
}) => (
    <div className="messages-container">
        {isJoined &&
            <div className="messages-controls">
                <a href="#" className="joined" onClick={() => leaveFromRoom(roomId)}>Leave a room</a>
            </div>
        }
        {roomId ?
            <ChatView onInfiniteLoad={onInfiniteLoad(loadMore, roomId)} className="messages-list" flipped={true}>
                {getMessages(messages)}
            </ChatView> :
            <div className="no-chat-selected">
                Please select a chat to start messaging
            </div>
        }
        {roomId && (isJoined ?
            <MessageBox
                sendMessage={sendMessage}
                editMessage={editMessage}
                roomId={roomId}
                text={text}
            /> :
            <div className="join-room">
                <a href="#" onClick={() => joinToRoom(uri)}>Join</a>
            </div>
        )}
    </div>
)

export default MessageList