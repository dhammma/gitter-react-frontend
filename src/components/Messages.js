import React from 'react'
import MessageBox from './MessageBox'
import moment from 'moment'
import ChatView from 'react-chatview'
import _ from 'lodash'

const formatDatetime = (datetime) => {
    return moment(datetime).format('YY/MM/YY')
}

const onInfiniteLoad = (loadMore, roomId) => () => {
    return new Promise(resolve => {
        loadMore(roomId)
        resolve()
    })
}

const Messages = ({roomId, messages, loadMore}) => (
    <div className="messages-container">
        {roomId}
        {roomId ?
            <ChatView onInfiniteLoad={onInfiniteLoad(loadMore, roomId)} className="messages-list" flipped={true}>
                {_.map(messages[roomId].list, message => (

                    <div key={message.id} className="message">
                        <div className="message-datetime">
                            {formatDatetime(message.sent)}
                        </div>
                        <a href="#" className="user-avatar">
                            <img src={message.fromUser.avatarUrlSmall} width="42" height="42" />
                        </a>
                        <div className="message-wrapper">
                            <a className="user-name">
                                {message.fromUser.displayName}
                            </a>
                            <div className="message-text">
                                {message.text}
                            </div>
                        </div>
                    </div>

                ))}
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

export default Messages