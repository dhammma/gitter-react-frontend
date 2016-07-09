import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import SideBar from './SideBar'
import MessageList from './MessageList'
import {fetchUserIfNeeded} from '../actions/user'
import {roomSelectAndFetchMessages} from '../actions/room'
import {loadMore} from '../actions/messages'

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <Header user={this.props.user} />
                <div className="content">
                    <SideBar
                        rooms={this.props.rooms}
                        roomSelect={this.props.roomSelectAndFetchMessages}
                        selectedRoom={this.props.selectedRoom}
                    />
                    <MessageList
                        roomId={this.props.selectedRoom}
                        messages={this.props.messages && this.props.messages.toJS()}
                        loadMore={this.props.loadMore}
                    />
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.props.fetchUserIfNeeded()
    }
}

const mapStateToProps = (state) => state.toObject()
const AppContainer = connect(mapStateToProps, {
    loadMore,
    fetchUserIfNeeded,
    roomSelectAndFetchMessages
})(App)

export default AppContainer