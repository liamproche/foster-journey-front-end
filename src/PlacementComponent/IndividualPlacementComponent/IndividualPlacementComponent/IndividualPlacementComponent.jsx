import { useState } from 'react';
import DetailsComponent from '../DetailsComponent/DetailsComponent';
import './IndividualPlacementComponent.css'

function IndividualPlacementComponent(props) {
  const[showDetails, setShowDetails] = useState(false)  
  return (
      <div className="IndividualPlacementComponent">
          <p>Placement: {props.placement.num}</p>
          <p>{props.placement.name}</p>
          {!showDetails?
          <a href="#" onClick={()=>setShowDetails(true)}>Show Details</a>:
          <DetailsComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement}></DetailsComponent>
          }
        </div>
    );
}

export default IndividualPlacementComponent;
