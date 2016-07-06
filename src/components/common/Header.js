import React from 'react'
import User from './User'

const Header = (props) => (
    <header>
        <h1>Gitter Frontend App</h1>
        <User user={props.user} />
    </header>
)

export default Header