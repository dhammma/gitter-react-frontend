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
    'uri',
    'url',
    'githubType',
    'tags',
    'v',

    'avatar_url'
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

export const mapRepo = (data) => _.pick(data.owner, ['avatar_url'])