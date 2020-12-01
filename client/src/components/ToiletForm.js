import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from "axios";
import {Link} from 'react-router-dom'
import '../stylesheets/toiletForm.css'



class ToiletForm extends Component {
  constructor(props){
    super(props)
    this.state = {
        toilet: {},
        allToilets: [],
        checkedOptions: [],
        genderNeutral: false,
        free: false,
        femProd: false,
        changingTable: false,
        barrierFree: false,
        cost: 0,         
    }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this)
  
  }
  

  handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

// Need to make more efficient
// If you are reading this please feel free to reach out
    handleFreeChecks = e => {
      this.setState({
        free: !this.state.free,
      })
    }

    handleGenderChecks = e => {
      this.setState({
        genderNeutral: !this.state.genderNeutral
      })
    }
  
    handleFemProdChecks = e => {
      this.setState({
        femProd: !this.state.femProd
      })
    }

    handleChangingTableChecks = e => {
      this.setState({
        changingTable: !this.state.changingTable
      })
    }

    handleBarrierChecks = e => {
      this.setState({
        barrierFree: !this.state.barrierFree
      })
    }


  handleSubmit = e => {
    e.preventDefault()
    const id = this.props.match.params.id
    const {name, description, lng, lat, locType, genderNeutral, free, femProd, changingTable, barrierFree, cost} = this.state;
    axios
    .put(`/api/add/${id}`, 
    {name, description, lng, lat, locType, genderNeutral, free, femProd, changingTable, barrierFree, cost})
    .then((data)=>{
      this.props.history.push(`/toilets/${id}`)
    })
  }


componentDidMount(){
axios
.get('/api/add')
.then(res => {
  this.setState({
    toilet: res.data, 
    allToilets: res.data,
  })
})
}


    render() {
      const costChecker = <input type="text" name="cost" placeholder="Cost" value={this.state.cost || ''} onChange={this.handleChange}/>
      const cost = !this.state.free? costChecker : ''
        return (
            <div>
              <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Give this restroom a name to help others identify it"
                value={this.state.name || ''}
                onChange={this.handleChange}
              />

                <textarea
                type="text"
                name="description"
                placeholder="Describe this restroom"
                value={this.state.description || ''}
                onChange={this.handleChange}
              />

       
              <select 
              value={this.state.locType}
              name='locType'
              onChange={this.handleChange}>
                <option value="null">Choose a location type</option>
                <option value="Public">Public</option>
                <option value="Cafe/Restaurant">Cafe/Restaurant</option>
                <option value="Museum">Museum</option>
                <option value="Bar/Club">Bar/Club</option>
                <option value="Train Station">Train Station</option>
                <option value="Bus Station">Bus Station</option>
                <option value="Gas Station">Gas Station</option>
                <option value="Other">Other</option>
              </select>

              {cost}
<label style={{marginTop: "15px"}}>
  <input type="checkbox" 
  checked={this.state.free} 
  onChange={this.handleFreeChecks} 
  name="free"/><span>No cost</span>
</label>



<div className='checkboxes'>
<label>
  <input type="checkbox" 
  value='genderNeutral' 
  onChange={this.handleGenderChecks} 
  name="genderNeutal"
  />
  <span>Gender neutral</span>
</label>
<label>
  <input type="checkbox" 
  checked={this.state.femProd} 
  onChange={this.handleFemProdChecks} 
  name="femProd"/><span>Feminine Products</span>
</label>
<label>
  <input type="checkbox" 
  checked={this.state.changingTable} 
  onChange={this.handleChangingTableChecks} 
  name="changingTable"/><span>Infant Changing Table</span>
</label>
<label>
  <input type="checkbox" 
  checked={this.state.barrierFree} 
  onChange={this.handleBarrierChecks} 
  name="barrierFree"/><span>Wheelchair accessible</span>
</label>



</div>

                <button className="button" type="submit">Submit a review</button>
                </form>
            </div>
            </div>
        )
    }
}


export default withRouter(ToiletForm)