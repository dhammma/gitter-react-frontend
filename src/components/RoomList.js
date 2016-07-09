import React from 'react'
import Room from './Room'
import {getRoomAvatar} from '../helpers/avatar'

const getRooms = (rooms, roomSelect, selectedRoom) => rooms.map((room) => (
    <Room
        key={room.get('id')}
        id={room.get('id')}
        name={room.get('name')}
        topic={room.get('topic')}
        lastAccessTime={room.get('lastAccessTime')}
        unreadItems={room.get('unreadItems')}
        avatar={getRoomAvatar(room)}
        roomSelect={roomSelect}
        selectedRoom={selectedRoom}
    />
))

const RoomList = ({rooms, roomSelect, selectedRoom}) => (
    <div className="rooms">
        <ul className="rooms-list">
            {rooms && rooms.get('list') && getRooms(rooms.get('list'), roomSelect, selectedRoom)}
        </ul>
    </div>
)

export default RoomList