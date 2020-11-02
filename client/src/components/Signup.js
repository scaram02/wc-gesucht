import React, { Component } from "react";
import { signup } from "../services/auth";
// import "./Signup.css";

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
        this.props.history.push("/add");
      }
    });
  };

  render() {
    return (
      <div className="chalkboard-container">

        <div className="signup-form-box">

        <div>
          <h2 className="sign-up-header">Sign up</h2>
          </div>

        <form onSubmit={this.handleSubmit}>
          
          <div className="field-container">
            <div className="fields">
              <label htmlFor="username" className="signup-label">
                Username:{" "}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>

            <div className="fields">
              <label htmlFor="password" className="signup-label">
                Password:{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <button className="signup-button chalk-border" type="submit">
                Sign up
              </button>
            </div>

            <div>
              {this.state.error && (
                <alert className="alert" variant="danger">
                  {this.state.error}
                </alert>
              )}
            </div>

          </div>
        </form>
        </div>
      </div>

    );
  }
}

export default Signup;
