import React from 'react';
import {formatMessageTime} from '../helpers/time'

const Message = ({user, avatar, text, time}) => (
    <div className="message-list-item">
        <div className="message-time">
            {formatMessageTime(time)}
        </div>
        <a href="#" className="user-avatar">
            <img src={avatar} width="42" height="42" />
        </a>
        <div className="message-wrapper">
            <a className="user-name">
                {user}
            </a>
            <div className="message-text">
                {text}
            </div>
        </div>
    </div>
)

export default Message