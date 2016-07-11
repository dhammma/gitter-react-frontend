import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import SideBar from './SideBar'
import MessageList from './MessageList'
import {fetchUser} from '../actions/user'
import {
    roomSelect,
    joinToRoom,
    leaveFromRoom
} from '../actions/room'
import {loadMore, sendMessage, editMessage, markRead} from '../actions/messages'
import {searchQuery} from '../actions/search'
import {receiveToken} from '../actions/login'

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
                        uri={this.getSelectedRoom() && this.getSelectedRoom().get('uri')}
                        messages={this.getMessages()}
                        loadMore={this.props.loadMore}
                        isJoined={this.isJoinedToRoom()}
                        joinToRoom={this.props.joinToRoom}
                        leaveFromRoom={this.props.leaveFromRoom}
                        sendMessage={this.props.sendMessage}
                        editMessage={this.props.editMessage}
                        text={this.getText()}
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
    isJoinedToRoom() {
        const roomId = this.props.rooms.get('selectedId')
        const rooms = this.props.rooms.get('list')

        return rooms.find(room => room.get('id') === roomId)
    }
    getText() {
        const roomId = this.props.rooms.get('selectedId')
        const text = this.props.messages.getIn([roomId, 'text'])

        return text && ''
    }
    componentWillMount() {
        const token = document.getElementById('app').getAttribute('data-token')
        localStorage.setItem('token', token)
        this.props.receiveToken(token)
        this.props.fetchUser()
    }
}

const mapStateToProps = (state) => state
const AppContainer = connect(mapStateToProps, {
    loadMore,
    fetchUser,
    roomSelect,
    searchQuery,
    joinToRoom,
    leaveFromRoom,
    sendMessage,
    editMessage,
    markRead,
    receiveToken
})(App)

export default AppContainer