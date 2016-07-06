import React from 'react'

const User = ({user}) => (
    <div className="user">
        {user && !user.get('isFetching')
            ? <img src={user.get('avatarUrlSmall')} />
            : null
        }
    </div>
)

export default User