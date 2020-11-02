import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Home from './components/Home'
import Login from "./components/Login";
import ToiletForm from "./components/ToiletForm";
import Dashboard from './components/Dashboard'
import Map from './components/Map'
import ToiletView from './components/ToiletView'


class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user, 
    });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route
            exact
            path="/signup"
            render={props => <Signup {...props} setUser={this.setUser} />}
          />
         
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setUser={this.setUser} />}
          />
          {/* <Route
            exact
            path="/add"
            render={props => <ToiletForm {...props} user={this.state.user}  />}
          /> */}
          <Route
            exact
            path="/add/:id"
            render={props => <ToiletForm {...props} user={this.state.user}  />}
          />
          <>
                 <Route
              exact
              path="/dashboard"
              render={props => (
                <Map
                  {...props}
                  user={this.state.user}
                  // clearUser={this.setUser} // should go on Dahs component
                />)}/>

                <Route 
                exact path="/toilets/:id" 
                component={ToiletView}
                />
          </>
        </Switch>
      </div>
    );
  }
}

export default App;
