import { useState } from 'react';
import { Accordion } from 'react-bootstrap'
import { renderMatches } from 'react-router-dom';
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
          <div className="placement-title-container">
          <h2>Placement: {props.placement.num}</h2>
          <h3>{props.placement.name}</h3>
          </div>
          <div className="placement-dates-container">
          <h4>{props.placement.start_date} to {props.placement.end_date}</h4>
          </div>
          <p className="link" onClick={()=>{toggleDetails(); getParents(); getSiblings()}}>Show Details</p>
          {showDetails?
          <DetailsComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement} createParent={createParent} parents={parents} createSibling={createSibling} siblings={siblings}></DetailsComponent>:
          <p></p>
          }
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="accordion-header">
                  <h3>Placement: {props.placement.num}</h3>
                  <br/>
                  <h4>{props.placement.name}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
              </Accordion.Body>
              </Accordion.Item>
          </Accordion>



        </div>
    );
}

export default IndividualPlacementComponent;
