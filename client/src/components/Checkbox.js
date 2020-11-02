import React from 'react'

export const Checkbox = props => {
    return (
      <li>
       <input key={props.value} 
       onChange={props.handleCheckbox} 
       type="checkbox" 
       checked={props.checked} 
       value={props.value} /> {props.value}
      </li>
    )
}

export default Checkbox