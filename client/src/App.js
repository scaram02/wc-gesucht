import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios'
import Signup from "./components/Signup";
import Home from './components/Home'
import Login from "./components/Login";
import ToiletForm from "./components/ToiletForm3";
import Map from './components/Map'
import ToiletView from './components/ToiletView'
import About from './components/About'



class App extends React.Component {
  state = {
    user: this.props.user
  };

  componentDidMount(){
    this.getAllToilets()
  }

  setUser = user => {
    this.setState({
      user: user, 
    });
  };

getAllToilets = () => {
  axios
    .get("/api/add/mytoilets")
    .then(response => {
      this.setState({
        allToilets: response.data
      });
      // console.log(this.state.allToilets)
    })
    .catch(err => {
      console.log(err);
    });
};


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
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
          <Route
            exact
            path="/add/:id"
            render={props => <ToiletForm {...props} user={this.state.user} />}
          />
          
          <>
          {this.state.user?
           (
           <Route
              exact
              path="/dashboard"
              render={props => (
                <Map
                  {...props}
                  user={this.state.user}
                  clearUser={this.setUser} 
              />
              )}/>
    )
    : <Redirect to="/" />
  }

               {this.state.user?
               (
               <Route 
                exact path="/toilets/:id" 
                render={props => 
                <ToiletView 
                  {...props} 
                  state={this.state} // ??
                  getAllToilets={this.getAllToilets}
                  user={this.state.user}  />}
               />)
               : <Redirect to='/' />
                }


             {/* <Route exact path="/profiles/:username" 
              render={props => (
             <Profile 
             {...props}
             user={this.state.user}
             getAllToilets={this.getAllToilets} // ?
          />
        )}/> */}
          </>
    

        </Switch>
      </div>
    );
  }
}

export default App;
