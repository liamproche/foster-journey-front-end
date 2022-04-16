import React, {useState, useEffect} from "react";
import IndividualPlacementComponent from './IndividualPlacementComponent/IndividualPlacementComponent/IndividualPlacementComponent';
import CreatePlacementComponent from './CreatePlacementComponent/CreatePlacementComponent';
import './PlacementComponent.css'

function PlacementComponent() {
  const[placements, setPlacements] = useState([])
  const getPlacements = async () => {
    try{
      const placements = await fetch('http://localhost:8000/api/placements')
      const parsedResponse = await placements.json()
      setPlacements(parsedResponse)
  }catch(err){
    console.log(err)
    //TODO-ERROR HANDLING
  }}
  const createNewPlacement= async(newPlacement)=>{
    try{
      const newPlacementResponse = await fetch('http://localhost:8000/api/placements',{
        method: "POST",
        body: JSON.stringify(newPlacement),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await newPlacementResponse.json()
      console.log(newPlacementResponse)
    }catch(err){
      console.log(err)
      //TODO-ERROR HANDLING
    }
  }
  const deletePlacement=async(id)=>{
   try{
     await fetch(`http://localhost:8000/api/placements/${id}`,{
      method: "DELETE"
    })
    setPlacements(
      placements.filter((placement)=>{
        return placement.id !== id
      })
    )
   }catch(err){
     console.log(err)
      //TODO-ERROR HANDLING
   }}
  const editPlacement=async(placementToEdit)=>{
    try{
    const editedPlacementResponse = await fetch(`http://localhost:8000/api/placements/${placementToEdit.id}`,{
      method: "PUT",
      body: JSON.stringify(placementToEdit),
      headers:{
        "Content-Type":"application/json"
    }
    })
    const parsedResponse = await editedPlacementResponse.json()
    console.log(parsedResponse)
  }catch(err){
    console.log(err)
    //TODO-ERROR HANDLING
  }}
  useEffect(()=>{getPlacements()},[])
  return (
      <div className="PlacementComponent">
        {placements.map((placement)=>{
          return <IndividualPlacementComponent key={placement.id} placement={placement} deletePlacement={deletePlacement} editPlacement={editPlacement}></IndividualPlacementComponent>
        })}
        <CreatePlacementComponent createNewPlacement={createNewPlacement}></CreatePlacementComponent>
      </div>
    );
}

export default PlacementComponent;
