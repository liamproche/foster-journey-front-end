import { useState } from 'react';
import DetailsComponent from '../DetailsComponent/DetailsComponent';
import './IndividualPlacementComponent.css'

function IndividualPlacementComponent(props) {
  const[showDetails, setShowDetails] = useState(false)  
  const toggleDetails=()=>{
    setShowDetails(!showDetails)
  }
  return (
      <div className="IndividualPlacementComponent">
          <p>Placement: {props.placement.num}</p>
          <p>{props.placement.name}</p>
          <a href="#" onClick={toggleDetails}>Show Details</a>:
          {showDetails?
          <DetailsComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement}></DetailsComponent>:
          <p></p>
          }
        </div>
    );
}

export default IndividualPlacementComponent;