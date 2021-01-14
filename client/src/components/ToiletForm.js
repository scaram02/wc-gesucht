import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from "axios";
import '../stylesheets/toiletForm.css'
import checkedIcon from '../images/checked.png'
import uncheckedIcon from '../images/unchecked.png'



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


{/* so begin the checkboxes */}
<div className="check-container">
<div className="check-div" onClick={this.handleFreeChecks} checked={this.state.free} >
<img src={this.state.free? checkedIcon : uncheckedIcon} alt="cost is free checkbox"
  name="free"/>
  <p>No cost</p>
</div>
<br />
<div className="check-div" onClick={this.handleGenderChecks} checked={this.state.genderNeutral} >
<img src={this.state.genderNeutral? checkedIcon : uncheckedIcon} alt="gender neutral checkbox"
  name="genderNeutral"/>
  <p>Gender neutral</p>
</div>

<div className="check-div" onClick={this.handleFemProdChecks} checked={this.state.femProd} >
<img src={this.state.femProd? checkedIcon : uncheckedIcon} alt="feminine product checkbox"
  name="femProd"/>
  <p>Feminine products</p>
</div>

<div className="check-div" onClick={this.handleChangingTableChecks} checked={this.state.changingTable} >
<img src={this.state.changingTable? checkedIcon : uncheckedIcon} alt="changing table checkbox"
  name="changingTable"/>
  <p>Changing table</p>
</div>
<div className="check-div" onClick={this.handleBarrierChecks} checked={this.state.barrierFree} >
<img src={this.state.barrierFree? checkedIcon : uncheckedIcon} alt="wheelchair accessible checkbox"
  name="barrierFree"/>
  <p>Wheelchair accessible</p>
</div>
</div>

 <button className="button" type="submit">Submit a review</button>
</form>
</div>
</div>
        )
    }
}


export default withRouter(ToiletForm)