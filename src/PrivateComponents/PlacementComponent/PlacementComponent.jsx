import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../NavBarComponent/Nav";
import IndividualPlacementComponent from './IndividualPlacementComponent/IndividualPlacementComponent/IndividualPlacementComponent';
import CreatePlacementComponent from './CreatePlacementComponent/CreatePlacementComponent';
import AuthContext from "../../context/AuthContext";


function PlacementComponent() {
  const {user}=useContext(AuthContext)
  const[placements, setPlacements] = useState([])
  const getPlacements = async () => {
    try{
      const placements = await fetch('http://localhost:8000/api/placements')
      const parsedResponse = await placements.json()
      setPlacements(parsedResponse.filter((placement)=>{return placement.user === user.user_id}))
  }catch(err){
    console.log(err)
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
      //KEEPING THIS IN FOR NOW EVEN THOUGH IT THROWS A WARNING.... CAN BE CHANGED TO .then() FUNCTION EVENTUALLY
      const parsedResponse = await newPlacementResponse.json()
    }catch(err){
      console.log(err)
      alert('Please try your request again')
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
      alert('Please try your request again')
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
  }}
  useEffect(()=>{getPlacements()}, [])
  return (
      <div className="PlacementComponent">
        <NavBar/>
        <div className="placement-container">
          <h2 className="user-greeting">Welcome, {user.first_name}</h2>
          {placements.length > 0?[
            <p key="placement-header">Your Current Placements:</p>,
            placements.map((placement)=>{
              return <IndividualPlacementComponent key={placement.id} placement={placement} deletePlacement={deletePlacement} editPlacement={editPlacement}></IndividualPlacementComponent>})]:
            <p>You have not yet created any placements</p>}
        <CreatePlacementComponent createNewPlacement={createNewPlacement}></CreatePlacementComponent>     
        </div>
      </div>
    );
}

export default PlacementComponent;
