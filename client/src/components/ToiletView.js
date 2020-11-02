import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


class ToiletView extends Component {

constructor(props){
    super(props)
    this.state = {}
}

componentDidMount(){
    this.getSingleToilet()

}

getSingleToilet = () => {
    const {params} = this.props.match;
    axios
    .get(`/api/add/${params.id}`)
    .then(apiRes => {
        const singleToilet = apiRes.data
        this.setState(singleToilet)
    })
}


deleteTheToilet = () => {
    const {params} = this.props.match
    axios
    .delete(`/api/add/${params.id}`)
    .then(() => {
        this.props.history.push(`/dashboard`)
    })
    .catch(err => {
        console.log(err)
    })
}





    render(){

        return(
          <div>
              <h1>{this.state.name}</h1>
              <h2>{this.state.location}</h2>
              <p>{this.state.description}</p>
              <p>{this.state.locType}</p>
              <p>Filter the checked boxes here</p>
             <div>
                 {/* <ul>{renderedChecked}</ul> */}
             </div>

              <Link to='/dashboard'>Dash back</Link>
              <p>onle allow delete if from same user tho</p>
              <button onClick={this.deleteTheToilet}>delete meh</button>
           </div>   
        )}


}



export default ToiletView
