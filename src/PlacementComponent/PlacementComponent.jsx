import React, {useState, useEffect} from "react";
import IndividualPlacementComponent from './IndividualPlacementComponent/IndividualPlacementComponent/IndividualPlacementComponent';
import CreatePlacementComponent from './CreatePlacementComponent/CreatePlacementComponent';
import './PlacementComponent.css'

function PlacementComponent() {
  const[placements, setPlacements] = useState([])
  const getPlacements = async () => {
    const placements = await fetch('http://localhost:8000/api/placements')
    const parsedResponse = await placements.json();
    console.log(parsedResponse)
    setPlacements(parsedResponse)
  }
  useEffect(()=>{getPlacements()},[])
  return (
      <div className="PlacementComponent">
        {placements.map((placement)=>{
          return <IndividualPlacementComponent key={placement.id} placement={placement}></IndividualPlacementComponent>
        })}
   
        <CreatePlacementComponent></CreatePlacementComponent>
      </div>
    );
}

export default PlacementComponent;
