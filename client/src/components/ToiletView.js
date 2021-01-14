import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import ReactStars from "react-rating-stars-component";
import axios from 'axios'
import Comments from './Comments'
import '../stylesheets/toiletView.css'


class ToiletView extends Component {

constructor(props){
    super(props)
    this.state = {}

    this.getSingleToilet = this.getSingleToilet.bind(this)
    this.deleteTheToilet = this.deleteTheToilet.bind(this)
}

componentDidMount(){
    this.getSingleToilet()
}


getSingleToilet = () => {
    const id = this.props.match.params.id
    axios
    .get(`/api/add/${id}`)
    .then(apiRes => {
        const singleToilet = apiRes.data
        this.setState(singleToilet)
    })
}



deleteTheToilet = () => {
    const id = this.props.match.params.id
    axios
    .delete(`/api/add/${id}`) 
    .then(() => {
        this.props.history.push(`/dashboard`)
    })
    .catch(err => {
        console.log(err)
    })
}

// ratingChanged = (newRating) => {
//     console.log(newRating);
//   };

    render(){
    // math user for extra permissions
    const sameUser = (this.state.user && (this.props.user._id === this.state.user._id))
    const matchUserForDelete = sameUser? <button className='delete-toilet' onClick={this.deleteTheToilet}>Remove this review</button> : <div></div>

    // calculate the price allowing for decimals/no decimals
    const calculatedPrice = (this.state.cost < 1)? `0.${this.state.cost*100}` : (this.state.cost === 1)? this.state.cost : (this.state.cost <= 2)? `${this.state.cost}0` : `0.${this.state.cost}`
    // display the price color based on calculatedPrice
    let costColor;
    (this.state.cost === 0 || this.state.free)? costColor = 'darkolivegreen' : costColor="darkred"


    const typeDisplay = this.state.locType? <h3>Restroom type: {this.state.locType}</h3> : <div></div>


    // here are the perks
    const genderNeutral = this.state.genderNeutral? <p>Gender Neutral</p> : <div></div>
    const fem = this.state.femProd? <p>Feminine Products</p> : <div></div>
    const changingTable = this.state.changingTable? <p>Infant Changing Table</p> : <div></div>
    const barrierFree = this.state.barrierFree? <p>Wheelchair accessible</p> : <div></div>
        
    
    return(
          <div className='container'>
              <div className="view">
              <div className='toilet-infos'>
              <h1>{this.state.name}</h1>
              <h2 style={{color: costColor}}>Cost: {(this.state.free || (this.state.cost === 0))? "Free" : `${calculatedPrice}€`}</h2>

              {typeDisplay}
             
              <p className="author">{this.state.user && this.state.user.username} said:</p>
              <p>{this.state.description}</p>
              
              {matchUserForDelete}
              <div className="perks">
              {genderNeutral}
              {fem}
              {changingTable}
              {barrierFree}
              </div>
              
              <Link to='/dashboard'>Back to map</Link>
              </div>
              
              {/* <ReactStars
    count={5}
    onChange={this.ratingChanged}
    size={24}
    activeColor="#ffd700"
  /> */}
              
              <Comments 
              user={this.props.user} 
              toiletId={this.props.match.params.id}
              toilet={this.state}
              comments={this.state.comments}
              getSingleToilet={this.getSingleToilet}
              getAllToilets={this.props.getAllToilets}
              />
           </div>  
           </div> 
        )}


}



export default ToiletView
