import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from 'react-bootstrap';
import NavBar from "../../NavBarComponent/Nav";
import IndividualPlacementComponent from './IndividualPlacementComponent/IndividualPlacementComponent/IndividualPlacementComponent';
import CreatePlacementComponent from './CreatePlacementComponent/CreatePlacementComponent';
import AuthContext from "../../context/AuthContext";

function PlacementComponent() {
  const { user } = useContext(AuthContext)
  const [placements, setPlacements] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [userToIncriment, setUserToIncriment] = useState({})
  const getPlacements = async () => {
    try{
      const placements = await fetch('http://localhost:8000/api/placements')
      const parsedResponse = await placements.json()
      setPlacements(parsedResponse.filter((placement)=>{return placement.user === user.user_id}))
  }catch(err){
    console.log(err)
  }}
  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm)
  }
  const createNewPlacement= async (newPlacement)=>{
    try{
      const newPlacementResponse = await fetch('http://localhost:8000/api/placements',{
        method: "POST",
        body: JSON.stringify(newPlacement),
        headers: {
          "Content-Type": "application/json"
        }
      })
      //KEEPING THIS IN FOR NOW EVEN THOUGH IT THROWS A WARNING.... CAN BE CHANGED TO JUST AWAIT EVENTUALLY
      await newPlacementResponse.json()
      incrementUserPlacements()
      .then(window.location.reload(false))
    }catch(err){
      console.log(err)
      alert('Please try your request again')
    }
  }
  const getUserToIncriment = async () =>{
    try{
      const response = await fetch (`http://localhost:8000/api/user/${user.user_id}/`)
      const parsedResponse = await response.json()
      setUserToIncriment(parsedResponse)
    }catch(err){
      console.log(err)
    }
  }
  const incrementUserPlacements = async () =>{
    setUserToIncriment({
      ...userToIncriment,
      placements: userToIncriment.placements += 1
    })
    try{
      const response = await fetch (`http://localhost:8000/api/user/${user.user_id}/`,{
        method: "PUT",
        body: JSON.stringify(userToIncriment),
        headers:{
          "Content-Type":"application/json"
      }
    })
    const parsedResponse = await response.json()
    console.log(parsedResponse)
    }catch(err){
      console.log(err)
    }
  }
  const deletePlacement = async (id)=>{
    try{
      await fetch(`http://localhost:8000/api/placements/${id}`,{
        method: "DELETE"
    })
    setPlacements(
      placements.filter((placement)=>{
        return placement.id !== id
      })
    )
    decrementUserPlacement();
   }catch(err){
     console.log(err)
      alert('Please try your request again')
  }}
  const decrementUserPlacement = async ()=>{
    setUserToIncriment({
      ...userToIncriment,
      placements: userToIncriment.placements -= 1
    })
    try{
      const response = await fetch (`http://localhost:8000/api/user/${user.user_id}/`,{
        method: "PUT",
        body: JSON.stringify(userToIncriment),
        headers:{
          "Content-Type":"application/json"
      }
    })
    const parsedResponse = await response.json()
    console.log(parsedResponse)
    }catch(err){
      console.log(err)
    }
  }
  const editPlacement=async(placementToEdit)=>{
    try{
    const editedPlacementResponse = await fetch(`http://localhost:8000/api/placements/${placementToEdit.id}`,{
      method: "PUT",
      body: JSON.stringify(placementToEdit),
      headers:{
        "Content-Type":"application/json"
    }
    })
    await editedPlacementResponse.json()
  }catch(err){
    console.log(err)
  }}
  useEffect(()=>{getPlacements(); getUserToIncriment()})
  return (
      <div className="PlacementComponent">
        <NavBar/>
        <div className="placement-container">
          <h2 className="user-greeting">Welcome, {user.first_name}</h2>
          {placements.length > 0?[
            <h5 key="placement-header">Your Current Placements:</h5>,
            placements.map((placement)=>{
              return <IndividualPlacementComponent key={placement.id} placement={placement} deletePlacement={deletePlacement} editPlacement={editPlacement}></IndividualPlacementComponent>})]:
            <p>You have not yet created any placements</p>}
        </div>
        <div className="create-placement-button-container">
          <Button variant="primary" className="button" onClick={toggleCreateForm}>Create New Placement</Button>
        </div>
        <Modal className="m" show={showCreateForm}>
          <Modal.Header id="modal-header-text">Create New Placement</Modal.Header>
          <Modal.Body>
            <CreatePlacementComponent createNewPlacement={createNewPlacement} toggleCreateForm={toggleCreateForm}></CreatePlacementComponent>   
          </Modal.Body>
        </Modal>
      </div>
    );
}


export default PlacementComponent;
