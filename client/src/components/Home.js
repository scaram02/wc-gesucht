import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>HOME</h1>
            <Link to="/login">go to login</Link>
            <Link to="/signup">Sign pu</Link>
            </div>
        )
    }
}


// make this menu dynamic with logout button?