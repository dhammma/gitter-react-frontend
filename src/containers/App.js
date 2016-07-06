import React from 'react'
import {connect} from 'react-redux'

const App = () => (
    <div className="app">
        Gitter React Frontend
    </div>
)

const mapStateToProps = (state) => state.toObject()
const AppContainer = connect(mapStateToProps)(App)

export default AppContainer