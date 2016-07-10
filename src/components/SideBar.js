import React from 'react'
import RoomList from './RoomList'
import Search from './Search'

const SideBar = ({rooms, roomSelect, selectedRoom, searchQuery}) => (
    <div className="sidebar">
        <Search searchQuery={searchQuery} />
        <RoomList
            rooms={rooms}
            roomSelect={roomSelect}
            selectedRoom={selectedRoom}
        />
    </div>
)

export default SideBar