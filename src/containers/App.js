import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import SideBar from '../components/SideBar'
import Messages from '../components/Messages'
import {fetchUserIfNeeded} from '../actions/user'
import {roomSelectAndFetchMessages} from '../actions/room'
import {loadMore} from '../actions/messages'

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUserIfNeeded()
    }
    render() {
        const {
            user,
            rooms,
            roomSelectAndFetchMessages,
            loadMore,
            selectedRoom,
            messages
        } = this.props
        return (
            <div className="app-container">
                <Header user={user} />
                <div className="content">
                    <SideBar rooms={rooms} roomSelect={roomSelectAndFetchMessages} selectedRoom={selectedRoom} />
                    <Messages roomId={selectedRoom} messages={messages && messages.toJS()} loadMore={loadMore} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => state.toObject()
const AppContainer = connect(mapStateToProps, {
    loadMore,
    fetchUserIfNeeded,
    roomSelectAndFetchMessages
})(App)

export default AppContainer