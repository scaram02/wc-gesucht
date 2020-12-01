import React from 'react'
import '../stylesheets/nav.css'

const Nav = props => {
    return (
        <div className="nav">
            <h1>Welcome, {props.user.username}</h1>
        </div>
    )
}

export default Nav