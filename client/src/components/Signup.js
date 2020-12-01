import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../services/auth";
import "../stylesheets/auth.css"

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    signup(this.state.username, this.state.password).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect 
        this.props.history.push("/dashboard");
      }
    });
  };

  render() {
    return (
        <div className='auth-page-container'>
        <form onSubmit={this.handleSubmit}>
        <h1>Sign up</h1> 
          <div className='input-container'>
              <label htmlFor="username">
                {/* Username:{" "} */}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
          </div>

            <div className='input-container'>
              <label htmlFor="password">
                {/* Password:{" "} */}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

        
              <button type="submit" className='auth-button'>
                Sign up
              </button>
        <p><Link to='/login'>Or log in instead</Link></p>

            <div>
              {this.state.error && (
                <alert className="alert" variant="danger">
                  {this.state.error}
                </alert>
              )}
            </div>

          
        </form>
        </div>

    );
  }
}

export default Signup;
