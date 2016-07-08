export const mapUser = (data) => _.pick(data, [
    'id',
    'username',
    'displayName',
    'url',
    'avatarUrlSmall',
    'avatarUrlMedium'
])

export const mapRoom = (data) => _.pick(data, [
    'id',
    'name',
    'topic',
    'oneToOne',
    'user',
    'userCount',
    'unreadItems',
    'mentions',
    'lastAccessTime',
    'favourite',
    'lurk',
    'url',
    'githubType',
    'tags',
    'v'
])

export const mapMessage = (data) => _.pick(data, [
    'id',
    'text',
    'html',
    'sent',
    'fromUser',
    'unread',
    'readBy',
    'urls',
    'mentions',
    'issues',
    'meta',
    'v'
])