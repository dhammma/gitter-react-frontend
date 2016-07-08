import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

const formatDatetime = (datetime) => {
    return moment(datetime).format('YY/MM/YY')
}

const getRoomClassNames = (room, selectedRoom) => classNames({
    'rooms-list-item': true,
    'active': room.get('id') === selectedRoom
})

const getAvatarUrl = (room) => {
    if (room.get('githubType') === 'REPO') {
        return room.get('avatar_url')
    } else {
        return room.getIn(['user', 'avatarUrlSmall'])
    }
}

const Rooms = ({rooms, roomSelect, selectedRoom}) => (
    <div className="rooms">
        <ul className="rooms-list">
            {rooms && rooms.get('list') ?
                rooms.get('list').map((room) => (
                    <li key={room.get('id')} className={getRoomClassNames(room, selectedRoom)}>
                        <a href="#" onClick={(event) => {
                            event.preventDefault()
                            roomSelect(room.get('id'))
                        }}>
                            <div className="room-meta">
                                <div className="room-datetime">
                                    {formatDatetime(room.get('lastAccessTime'))}
                                </div>
                                {room.get('unreadItems') > 0 &&
                                    <span className="room-badge">
                                        {room.get('unreadItems')}
                                    </span>
                                }
                            </div>
                            <div className="room-avatar">
                                <img src={getAvatarUrl(room)} width="48" height="48" />
                            </div>
                            <div className="room-wrapper">
                                <div className="room-name">{room.get('name')}</div>
                                <div className="room-topic">{room.get('topic') ? room.get('topic') : 'no'}</div>
                            </div>
                        </a>
                    </li>
                )) : null
            }
        </ul>
    </div>
)

export default Rooms