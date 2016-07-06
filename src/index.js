import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './stores/store'
import {Provider} from 'react-redux'
import AppContainer from './containers/App'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
)