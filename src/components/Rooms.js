import React from 'react'
import moment from 'moment'

const formatDatetime = (datetime) => {
    return moment(datetime).format('YY/MM/YY')
}

const Rooms = ({rooms, roomSelect}) => (
    <div className="rooms">
        <ul className="rooms-list">
            {rooms && rooms.get('list') ?
                rooms.get('list').map((room) => (
                    <li key={room.get('id')} className="rooms-list-item">
                        <a href="#" onClick={(event) => {
                            event.preventDefault()
                            roomSelect(room.get('id'))
                        }}>
                            <div className="room-datetime">
                                {formatDatetime(room.get('lastAccessTime'))}
                            </div>
                            <div className="room-avatar">
                                <img src={room.getIn(['user', 'avatarUrlSmall'])} />
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