import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/auth";
import "../stylesheets/auth.css";

class Login extends Component {
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

    login(this.state.username, this.state.password).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        this.props.history.push("/dashboard");
      }
    });
  };

  render() {
    return (

        <div className='auth-page-container'>
          <form onSubmit={this.handleSubmit}>
          <h1>Log in</h1>
            <div className="input-container">
                <label htmlFor="username">
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

            <div className="input-container">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
            </div>


                <button type="submit" className="auth-button">
                  Log in
                </button>
                <p><Link to='/signup'>Or create an account</Link></p>

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

export default Login;
