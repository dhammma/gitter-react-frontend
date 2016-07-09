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

const getMessages = (messages) => _.map(messages.list, message => (
    <Message
        key={message.id}
        user={message.fromUser.displayName}
        avatar={message.fromUser.avatarUrlSmall}
        text={message.text}
        time={message.sent}
    />
))

const MessageList = ({roomId, messages, loadMore}) => (
    <div className="messages-container">
        {roomId ?
            <ChatView onInfiniteLoad={onInfiniteLoad(loadMore, roomId)} className="messages-list" flipped={true}>
                {getMessages(messages[roomId])}
            </ChatView> :
            <div className="no-chat-selected">
                Please select a chat to start messaging
            </div>
        }
        {roomId ?
            <MessageBox /> : null
        }
    </div>
)

export default MessageList