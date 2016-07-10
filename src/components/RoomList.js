import React from 'react'
import moment from 'moment'
import Room from './Room'
import {getRoomAvatar} from '../helpers/avatar'

const getRooms = (rooms, roomSelect, selectedRoom) => rooms
    .sortBy(room => moment(room.get('lastAccessTime')).unix())
    .reverse()
    .map((room) => (
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
            {rooms && getRooms(rooms, roomSelect, selectedRoom)}
        </ul>
    </div>
)

export default RoomList