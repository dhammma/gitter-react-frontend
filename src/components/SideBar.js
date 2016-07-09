import React from 'react'
import RoomList from './RoomList'
import Search from './Search'

const SideBar = ({rooms, roomSelect, selectedRoom}) => (
    <div className="sidebar">
        <Search />
        <RoomList
            rooms={rooms}
            roomSelect={roomSelect}
            selectedRoom={selectedRoom}
        />
    </div>
)

export default SideBar