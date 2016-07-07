import React from 'react'
import Rooms from './Rooms'
import Search from './sideBar/Search'

const SideBar = ({rooms, roomSelect, selectedRoom}) => (
    <div className="sidebar">
        <Search />
        <Rooms rooms={rooms} roomSelect={roomSelect} selectedRoom={selectedRoom} />
    </div>
)

export default SideBar