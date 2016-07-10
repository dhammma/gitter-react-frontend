import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import SideBar from './SideBar'
import MessageList from './MessageList'
import {fetchUser} from '../actions/user'
import {roomSelect} from '../actions/room'
import {loadMore} from '../actions/messages'
import {searchQuery} from '../actions/search'

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <Header user={this.props.user} />
                <div className="content">
                    <SideBar
                        rooms={this.getRooms()}
                        roomSelect={this.props.roomSelect}
                        selectedRoom={this.props.selectedRoom}
                        searchQuery={this.props.searchQuery}
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
    getRooms() {
        return this.props.search.get('query') !== ''
            ? this.props.search.get('rooms')
            : this.props.rooms.get('list')
    }
    componentDidMount() {
        this.props.fetchUser()
    }
}

const mapStateToProps = (state) => state.toObject()
const AppContainer = connect(mapStateToProps, {
    loadMore,
    fetchUser,
    roomSelect,
    searchQuery
})(App)

export default AppContainer