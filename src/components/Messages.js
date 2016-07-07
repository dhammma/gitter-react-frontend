import React from 'react'
import MessageBox from './MessageBox'
import moment from 'moment'

const formatDatetime = (datetime) => {
    return moment(datetime).format('YY/MM/YY')
}

const Messages = ({roomId, messages}) => (
    <div className="messages-container">
        {roomId ?
            <div className="messages-list">
                {messages.getIn([roomId, 'list']) && messages.getIn([roomId, 'list']).size ?
                    messages.getIn([roomId, 'list']).map(message => (
                        <div key={message.get('id')} className="message">
                            <div className="message-datetime">
                                {formatDatetime(message.get('sent'))}
                            </div>
                            <a href="#" className="user-avatar">
                                <img src={message.getIn(['fromUser', 'avatarUrlSmall'])} width="42" height="42" />
                            </a>
                            <div className="message-wrapper">
                                <a className="user-name">
                                    {message.getIn(['fromUser', 'displayName'])}
                                </a>
                                <div className="message-text">
                                    {message.get('text')}
                                </div>
                            </div>
                        </div>
                    )) : 'No messages in this room'
                }
            </div> :
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