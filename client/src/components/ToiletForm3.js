// trying to do it with checked starting as false. we shall see

import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from "axios";
import '../stylesheets/toiletForm.css'
import checkedIcon from '../images/checked.png'
import uncheckedIcon from '../images/unchecked.png'

const perks = [
    { id: "genderNeutral", perk: "Gender neutral"},
    { id: "free", perk: "No cost"},
    { id: "femProd", perk: "Feminine products"},
    { id: "changingTable", perk: "Changing Table"},
    { id: "barrierFree", perk: "Wheelchair accessible"}
    ]



export default function ToiletForm(props) {
    const [data, setData] = useState({allToilets: []});
    const [checked, setChecked] = useState([]);



  // handle toilet input fields
    const initialInputState = { tName: '', description: '', cost: null, locType: null}
    const [toiletInfo, setToiletInfo] = useState(initialInputState)


    const handleInputChange = (event) => {
    const {name, value} = event.target

    setToiletInfo({...toiletInfo, [name]: value})
}


    // load the toilet?
    const url = props.match.params.id
    useEffect(() => {
        const fetchData = async () => {
         const result = await axios(url);

         setData(result.data);
        };

        fetchData();
    }, []);

    // checkmarks handler
    const handleChange = ({ target }) => {
      const { checked, id } = target;
      return setChecked((currentChecks) =>
        checked
          ? [...currentChecks, id]
          : currentChecks.filter((c) => c !== id)
      );
    };

  
    // backend!
   const handleSubmit = e => {
    e.preventDefault()
    const id = props.match.params.id
    
    axios
    .put(`/api/add/${id}`, 
    {genderNeutral: checked.includes("genderNeutral"), femProd: checked.includes("femProd"), changingTable: checked.includes("changingTable"), barrierFree: checked.includes("barrierFree"), free: checked.includes("free"), description: toiletInfo.description, name: toiletInfo.tName, cost: toiletInfo.cost, locType: toiletInfo.locType} ) // optimize this
    .then((data)=>{
      props.history.push(`/toilets/${id}`)
    })
  }
///////////////////


const costChecker = <input type="text" name="cost" placeholder="Cost" value={toiletInfo.cost} onChange={handleInputChange}/>

const cost = !checked.includes("free")? costChecker : <div/>

    return (
        <div>
            <div className="form-container">
            <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="tName"
                placeholder="Give this restroom a name to help others identify it"
                value={toiletInfo.tName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Describe this restroom"
                value={toiletInfo.description}
                onChange={handleInputChange}
              />

<select 
              value={toiletInfo.locType}
              name='locType'
              onChange={handleInputChange}>
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

        {perks.map(({ id, perk }) => (
        <label>
          <input
            id={id}
            type="checkbox"
            value={checked.includes(id)}
            onChange={handleChange}
          />
       {perk}
        </label>
      ))}

      <button className="button" type="submit">Submit a review</button>
      </form>
        </div>
        </div>
    )
}

