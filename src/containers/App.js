import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/common/Header'
import Rooms from '../components/Rooms'
import {fetchUserIfNeeded} from '../actions/user'
import {fetchRoomsIfNeeded} from '../actions/rooms'
import client from '../faye/client'

class App extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchUserIfNeeded('react'))
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props
        const userId = nextProps.user && nextProps.user.get('id')
        const prevUserId = this.props.user && this.props.user.get('id')
        if (!prevUserId && userId) {
            // subscribe to room
            client.subscribe(`/api/v1/user/${userId}/rooms`, (message) => {
                console.log(message)
            })
           // dispatch(fetchRoomsIfNeeded())
        }
    }
    render() {
        return (
            <div className="app-container">
                <Header user={this.props.user} />
                <Rooms rooms={this.props.rooms} />
            </div>
        )
    }
}

const mapStateToProps = (state) => state.toObject()
const AppContainer = connect(mapStateToProps)(App)

export default AppContainer