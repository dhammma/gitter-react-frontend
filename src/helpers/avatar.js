export const getRoomAvatar = (room) => {
    switch (room.get('githubType')) {
        case 'REPO':
            return room.get('avatar-url')
        default:
            return room.getIn(['user', 'avatarUrlSmall'])
    }
}