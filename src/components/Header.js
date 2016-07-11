import React from 'react'
import User from './User'

const Header = ({user, room}) => (
    <header>
        <h1>Gitter Frontend App</h1>
        {room &&
            <div className="room-info">
                <h2 className="room-name">{room.get('name')}</h2>
                <span className="room-members">{room.get('userCount')} members</span>
            </div>
        }
        <User user={user} />
    </header>
)

export default Header