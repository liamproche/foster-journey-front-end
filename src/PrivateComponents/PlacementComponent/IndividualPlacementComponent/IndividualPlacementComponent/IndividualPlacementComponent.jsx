import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap'
import DetailsComponent from '../DetailsComponent/DetailsComponent';
import './IndividualPlacementComponent.css'

function IndividualPlacementComponent(props) {
  const[parents, setParents] = useState([])
  const[siblings, setSiblings] = useState([])

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
  useEffect(()=>{getParents()}, [])
  return (
      <div className="IndividualPlacementComponent">

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-header">
                <div className="placement-title">
                  <h5>Placement:{props.placement.num}</h5>
                  <h5>{props.placement.name}</h5>
                </div>
                <div className="placement-dates">
                  <h5>Start Date:{props.placement.start_date}</h5>
                  <h5>End Date:{props.placement.end_date}</h5>
                </div>
              </Accordion.Header>
              <Accordion.Body id="accordion-body">
                <DetailsComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement} createParent={createParent} parents={parents} createSibling={createSibling} siblings={siblings}></DetailsComponent>
              </Accordion.Body>
              </Accordion.Item>
          </Accordion>



        </div>
    );
}

export default IndividualPlacementComponent;
