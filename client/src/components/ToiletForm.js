import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Checkbox from './Checkbox' 


class ToiletForm extends Component {
  constructor(props){
    super(props)
    this.state = {
        toilet: {},
        allToilets: [],
        // genderNeutral: false,
        // free: false
        checkboxes: [
          {value: "genderNeutral", checked: false},
          {value: "free", checked: false}
        ]
    }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this)
  }
  

  handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  // handleCheckboxChange = e => {
  //   this.setState({
  //     [e.target.name]: !this.state.checked
  //   })
  // }

  handleCheckbox = e => {
    const checkboxes = this.state.checkboxes
    checkboxes.forEach(checkbox => {
      if (checkbox.value === e.target.value){
        checkbox.checked = e.target.checked
      }
    })
    this.setState({ checkboxes: checkboxes})
    console.log(this.state.checkboxes)
  }


  handleSubmit = e => {
    e.preventDefault()
    const id = this.props.match.params.id
    const {name, description, location, lng, lat, locType, genderNeutral, free} = this.state;
    axios
    .put(`/api/add/${id}`, 
    {name, description, location, lng, lat, locType, genderNeutral, free})
    .then((data)=>{
      console.log(data)
      this.props.history.push('/dashboard')
    })
  }


componentDidMount(){
axios
.get('/api/add')
.then(res => {
  this.setState({
    toilet: res.data, 
    allToilets: res.data
  })
})
}


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Add toilet name here"
                value={this.state.name || ''}
                onChange={this.handleChange}
              />

                <textarea
                type="text"
                name="description"
                placeholder="Add description here"
                value={this.state.description || ''}
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="location"
                placeholder="Add location here"
                value={this.state.location || ''}
                onChange={this.handleChange}
              />
              <select 
              value={this.state.locType}
              name='locType'
              onChange={this.handleChange}>
                <option value="Public">Public</option>
                <option value="Cafe/Restaurant">Cafe/Restaurant</option>
                <option value="Museum">Museum</option>
                <option value="Bar/Club">Bar/Club</option>
                <option value="Train Station">Train Station</option>
                <option value="Bus Station">Bus Station</option>
                <option value="Gas Station">Gas Station</option>
                <option value="Other">Other</option>
              </select>

              {/* <label>
								<input type="checkbox"
									checked={this.state.free}
									onChange={this.handleCheckboxChange}
                  name='free'
                  
								/>
								Free
							</label> */}
              <ul>
        {
          this.state.checkboxes.map((checkboxes, i) => {
            return (<Checkbox key={i} handleCheckbox={this.handleCheckbox} {...checkboxes} />)
          })
        }
        </ul>
                <button className="button" type="submit">Submit data</button>
                </form>
              
            </div>
        )
    }
}


export default withRouter(ToiletForm)