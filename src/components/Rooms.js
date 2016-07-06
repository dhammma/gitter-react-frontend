import React from 'react'

const Rooms = ({rooms}) => (
    <div className="rooms">
        <ul className="rooms-list">
            {rooms && rooms.get('list')
                ?
                    rooms.get('list').map((room, roomIndex) => (
                        <li key={roomIndex} className="room-list-item">{room.get('name')}</li>
                    ))
                : null
            }
        </ul>
    </div>
)

export default Rooms