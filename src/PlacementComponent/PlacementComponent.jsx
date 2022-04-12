import React, {useState, useEffect} from "react";
import IndividualPlacementComponent from './IndividualPlacementComponent/IndividualPlacementComponent/IndividualPlacementComponent';
import CreatePlacementComponent from './CreatePlacementComponent/CreatePlacementComponent';
import './PlacementComponent.css'

function PlacementComponent() {
  const[placements, setPlacements] = useState([])
  const getPlacements = async () => {
    const placements = await fetch('http://localhost:8000/api/placements')
    const parsedResponse = await placements.json()
    setPlacements(parsedResponse)
  }
  const createNewPlacement= async(newPlacement)=>{
    console.log(newPlacement)
    const newPlacementResponse = await fetch('http://localhost:8000/api/placements',{
      method: "POST",
      body: JSON.stringify(newPlacement),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const parsedResponse = await newPlacementResponse.json()
    console.log(parsedResponse)
  }
  useEffect(()=>{getPlacements()},[])
  return (
      <div className="PlacementComponent">
        {placements.map((placement)=>{
          return <IndividualPlacementComponent key={placement.id} placement={placement}></IndividualPlacementComponent>
        })}
        <CreatePlacementComponent createNewPlacement={createNewPlacement}></CreatePlacementComponent>
      </div>
    );
}

export default PlacementComponent;
