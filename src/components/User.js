import React from 'react'

const User = ({user}) => (
    <div className="user">
        {user && !user.get('isFetching') &&
            <img src={user.get('avatarUrlSmall')} width="36" height="36" />
        }
    </div>
)

export default User