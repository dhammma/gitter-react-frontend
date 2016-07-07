import React from 'react'
import Rooms from './Rooms'
import Search from './sideBar/Search'

const SideBar = ({rooms, roomSelect}) => (
    <div className="sidebar">
        <Search />
        <Rooms rooms={rooms} roomSelect={roomSelect} />
    </div>
)

export default SideBar