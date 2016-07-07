import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import SideBar from '../components/SideBar'
import Messages from '../components/Messages'
import {fetchUserIfNeeded} from '../actions/user'
import {roomSelectAndFetchMessages} from '../actions/room'

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUserIfNeeded()
    }
    render() {
        const {
            user,
            rooms,
            roomSelectAndFetchMessages,
            selectedRoom,
            messages
        } = this.props
        return (
            <div className="app-container">
                <Header user={user} />
                <SideBar rooms={rooms} roomSelect={roomSelectAndFetchMessages} />
                <Messages roomId={selectedRoom} messages={messages} />
            </div>
        )
    }
}

const mapStateToProps = (state) => state.toObject()
const AppContainer = connect(mapStateToProps, {
    fetchUserIfNeeded,
    roomSelectAndFetchMessages
})(App)

export default AppContainer