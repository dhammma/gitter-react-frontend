import React from 'react'
import classNames from 'classnames'
import {formatRoomTime} from '../helpers/time'

const getRoomClassNames = (roomId, selectedRoom) => classNames({
    'rooms-list-item': true,
    'active': roomId === selectedRoom
})

const onRoomClick = (roomSelect, id) => (event) => {
    event.preventDefault()
    roomSelect(id)
}

const Room = ({id, name, topic, lastAccessTime, unreadItems, avatar, roomSelect, selectedRoom}) => (
    <li className={getRoomClassNames(id, selectedRoom)}>
        <a href="#" onClick={onRoomClick(roomSelect, id)}>
            <div className="room-meta">
                <div className="room-datetime">
                    {formatRoomTime(lastAccessTime)}
                </div>
                {unreadItems > 0 &&
                    <span className="room-badge">
                        {unreadItems}
                    </span>
                }
            </div>
            <div className="room-avatar">
                <img src={avatar} width="48" height="48" />
            </div>
            <div className="room-wrapper">
                <div className="room-name">
                    {name}
                </div>
                {topic &&
                    <div className="room-topic">
                        {topic}
                    </div>
                }
            </div>
        </a>
    </li>
)

export default Room