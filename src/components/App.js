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
                <Header
                    room={this.getSelectedRoom()}
                    user={this.props.user}
                />
                <div className="content">
                    <SideBar
                        rooms={this.getRooms()}
                        roomSelect={this.props.roomSelect}
                        selectedRoom={this.props.rooms.get('selectedId')}
                        searchQuery={this.props.searchQuery}
                    />
                    <MessageList
                        roomId={this.props.rooms.get('selectedId')}
                        messages={this.getMessages()}
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
    getMessages() {
        const roomId = this.props.rooms.get('selectedId')
        const messages = this.props.messages.getIn([roomId, 'list'])

        return messages
            ? messages.reverse().toJS()
            : []
    }
    getSelectedRoom() {
        const roomId = this.props.rooms.get('selectedId')
        const rooms = this.getRooms()

        return rooms
            ? rooms.find(room => room.get('id') === roomId)
            : null
    }
    componentDidMount() {
        this.props.fetchUser()
    }
}

const mapStateToProps = (state) => state
const AppContainer = connect(mapStateToProps, {
    loadMore,
    fetchUser,
    roomSelect,
    searchQuery
})(App)

export default AppContainer