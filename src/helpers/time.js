import moment from 'moment'

export const formatRoomTime = (time) => {
    const input = moment(time)

    // difference in days
    const days = moment().diff(input, 'days')

    if (days > 6) { // week ago

        return input.format('DD/MM/YY')
    } else if (days > 1) { // on this week

        return input.format('ddd')
    } else { // today

        return input.format('hh:mm A')
    }
}

export const formatMessageTime = (time) => moment(time).format('hh:mm A')