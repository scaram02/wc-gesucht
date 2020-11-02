import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Map from "./Map"

import { logout } from "../services/auth";
// import "./Dashboard.css";


class Dashboard extends Component {
  constructor(props){
  super(props)

  this.state = {
    user: this.props.user,
    // allToilets: [],
    // toiletInfo: {}
    }  
  };

  handleLogout = () => {
    //
    logout();
    this.props.clearUser(null);
  };



  componentDidMount() {
    this.getData();
  }

  handleSubmit = e => {
    e.preventDefault();
    const {lng, lat} = this.state;
    axios
    .post('/api/add', {
        lng,
        lat,
        user: this.props.user
    })
    .then(toiletData => {
       this.props.history.push('/add')     
           // this.props.refreshData()
    })
    .catch(err => {
        console.log(err)
    })
}

  

  

  render() {
    
    return (
      <div className="dashboard-container">
        {/* <Navbar user={this.state.user} clearUser={this.setUser} /> */}
        <div>
          <div >
             {/* <ToiletList/> */}
            </div>
          
        </div>
     <Map/>
        <div>

            
            <Link to="/" onClick={this.handleLogout}>
              LOGOUT
            </Link>
          </div>
        </div>
    );
  }
}

export default Dashboard;
