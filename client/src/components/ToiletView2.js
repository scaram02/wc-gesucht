import React, {Component, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
// import ReactStars from "react-rating-stars-component";
import axios from 'axios'
import Comments from './Comments'
import '../stylesheets/toiletView.css'

function ToiletView(props) {

    const [data, setData] = useState({toilet: [], user: props.user});

    

      useEffect(() => {
        const fetchData = async () => {
          const id = props.match.params.id
          const result = await axios(
            `/api/add/${id}`
          );
            console.log("result", result.data)
          setData(result.data);
        };
     
        fetchData();
      }, []);



 // match user for extra permissions
//  const sameUser = this.props.user && this.props.user._id === data.user._id

// display the price color based on calculatedPrice
let costColor;
(data.cost === 0 || data.free)? costColor = "darkolivegreen" : costColor = "darkred"

const typeDisplay = data.locType? <h3>Restroom type: {data.locType}</h3> : <div/>

// map the perks! but howww. come back to this
const genderNeutral = data.genderNeutral? <p>Gender Neutral</p> : <div />
const fem = data.femProd? <p>Feminine Products</p> : <div />
const changingTable = data.changingTable? <p>Infant Changing Table</p> : <div/>
const barrierFree = data.barrierFree? <p>Wheelchair accessible</p> : <div/>
    return (
        <div className='container'>
             <div className="view">
             <div className='toilet-infos'>
           <h1>{data.name} </h1>
           <h2 style={{color: costColor}}>Cost: add here alter</h2>
           <p>why is this a p? {data.description}</p>
           {data.typeDisplay}
           {/* hm */}
           <div className="perks">
           {genderNeutral}
           {fem}
           {changingTable}
           {barrierFree}
        </div>
        
        <Link to='/dashboard'>Back to map</Link>
        </div>
{data.user.username}
        <Comments 
              user={props.user} 
              toiletId={props.match.params.id}
              toilet={data}
              comments={data.comments}
            //   getSingleToilet={this.getSingleToilet}
            //   getAllToilets={this.props.getAllToilets}
              />
        </div>
        </div>
    )
}


export default ToiletView

