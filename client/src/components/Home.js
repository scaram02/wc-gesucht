import React, { Component } from 'react'
import { Link } from "react-router-dom";
import '../stylesheets/home.css'
export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
            <div className="text-container">
            <h1>WC Gesucht</h1>
            <div className="home-links">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
            <Link to='about'>About</Link>
            </div>
            </div>
            </div>
        )
    }
}

