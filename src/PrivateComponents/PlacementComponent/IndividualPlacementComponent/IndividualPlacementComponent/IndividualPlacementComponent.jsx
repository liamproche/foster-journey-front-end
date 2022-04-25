import { useState } from 'react';
import DetailsComponent from '../DetailsComponent/DetailsComponent';
import './IndividualPlacementComponent.css'

function IndividualPlacementComponent(props) {
  const[showDetails, setShowDetails] = useState(false) 
  const[parents, setParents] = useState([])
  const[siblings, setSiblings] = useState([])
  const toggleDetails=()=>{
    setShowDetails(!showDetails)
  }  
  // BEGIN PARENT ROUTES
  const getParents = async ()=>{
    try{
      const response = await fetch('http://localhost:8000/api/parents')
      const parsedResponse = await response.json()
      setParents(parsedResponse.filter((parent)=>{return parent.placement === props.placement.id}))
    }catch(err){
      console.log(err)
      alert('Unable to retrieve foster parents')
    }
  }
  // PARENT API CALLS
  const createParent = async (newParent)=>{
    try{
      const response = await fetch ('http://localhost:8000/api/parents',{
        method: "POST",
        body: JSON.stringify(newParent),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await response.json()
    }catch(err){
      console.log(err)
      alert('Please try your request again')
    }
  }
  // SIBLING API CALLS
  const getSiblings = async ()=>{
    try{
      const response = await fetch('http://localhost:8000/api/siblings')
      const parsedResponse = await response.json()
      setSiblings(parsedResponse.filter((sibling)=>{return sibling.placement === props.placement.id}))
    }catch(err){
      console.log(err)
      alert('Unable to retrieve foster siblings')
    }
  }
  const createSibling = async (newSibling)=>{
    try{
      const response = await fetch ('http://localhost:8000/api/siblings',{
        method: "POST",
        body: JSON.stringify(newSibling),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await response.json()
    }catch(err){
      console.log(err)
      alert('Please try your request again')
    }
  }
  return (
      <div className="IndividualPlacementComponent">
          <p>Placement: {props.placement.num}</p>
          <p>{props.placement.name}</p>
          <p className="link" onClick={()=>{toggleDetails(); getParents(); getSiblings()}}>Show Details</p>
          {showDetails?
          <DetailsComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement} createParent={createParent} parents={parents} createSibling={createSibling} siblings={siblings}></DetailsComponent>:
          <p></p>
          }
        </div>
    );
}

export default IndividualPlacementComponent;
