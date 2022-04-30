import { useState, useEffect, useContext } from 'react';
import { Accordion } from 'react-bootstrap';
import DetailsComponent from '../DetailsComponent/DetailsComponent';
import AuthContext from '../../../../context/AuthContext';

function IndividualPlacementComponent(props) {
  const { user } = useContext(AuthContext)
  const [parents, setParents] = useState([])
  const [siblings, setSiblings] = useState([])
  const [userToIncriment, setUserToIncriment] = useState({})

  // BEGIN PARENT ROUTES
  const getParents = async ()=>{
    try{
      const response = await fetch('https://foster-journey-backend.herokuapp.com/api/parents')
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
      const response = await fetch ('https://foster-journey-backend.herokuapp.com/api/parents',{
        method: "POST",
        body: JSON.stringify(newParent),
        headers: {
          "Content-Type": "application/json"
        }
      })
      await response.json()
      incrementUserParents()
      .then(window.location.reload(false))
    }catch(err){
      console.log(err)
    }
  }
  const getUserToIncriment = async () =>{
    try{
      const response = await fetch (`https://foster-journey-backend.herokuapp.com/api/user/${user.user_id}/`)
      const parsedResponse = await response.json()
      setUserToIncriment(parsedResponse)
    }catch(err){
      console.log(err)
    }
  }
  const incrementUserParents = async () =>{
    setUserToIncriment({
      ...userToIncriment,
      foster_parents: userToIncriment.foster_parents += 1
    })
    try{
      const response = await fetch (`https://foster-journey-backend.herokuapp.com/api/user/${user.user_id}/`,{
        method: "PUT",
        body: JSON.stringify(userToIncriment),
        headers:{
          "Content-Type":"application/json"
      }
    })
     await response.json()
    }catch(err){
      console.log(err)
    }
  }
  // SIBLING API CALLS
  const getSiblings = async ()=>{
    try{
      const response = await fetch('https://foster-journey-backend.herokuapp.com/api/siblings')
      const parsedResponse = await response.json()
      setSiblings(parsedResponse.filter((sibling)=>{return sibling.placement === props.placement.id}))
    }catch(err){
      console.log(err)
      alert('Unable to retrieve foster siblings')
    }
  }
  const createSibling = async (newSibling)=>{
    try{
      const response = await fetch ('https://foster-journey-backend.herokuapp.com/api/siblings',{
        method: "POST",
        body: JSON.stringify(newSibling),
        headers: {
          "Content-Type": "application/json"
        }
      })
      await response.json()
      incrementUserSiblings()
      .then(window.location.reload(false))
    }catch(err){
      console.log(err)
    }
  }
  const incrementUserSiblings = async () =>{
    setUserToIncriment({
      ...userToIncriment,
      foster_siblings: userToIncriment.foster_siblings += 1
    })
    try{
      const response = await fetch (`https://foster-journey-backend.herokuapp.com/api/user/${user.user_id}/`,{
        method: "PUT",
        body: JSON.stringify(userToIncriment),
        headers:{
          "Content-Type":"application/json"
      }
    })
    await response.json()
    }catch(err){
      console.log(err)
    }
  }
  const formatDate = (dateString) =>{
    let tempDate = [...dateString]
    let day = tempDate.slice(8)
    let month = tempDate.slice(5, 7)
    let year = tempDate.slice(0, 4)
    let newDate = `${month}/${day}/${year}`
    return newDate.split(',').join('')
  }
  useEffect(()=>{getParents(); getSiblings(); getUserToIncriment()}, [])
  return (
      <div className="IndividualPlacementComponent">
          <Accordion flush className="accordion-container">
            <Accordion.Item eventKey="0" id="accordian-item">
              <Accordion.Header className="accordion-header">
                <div className="placement-title">
                  <h5 className="accordion-header-text">Placement: {props.placement.num}</h5>
                  <h5 className="accordion-header-text">{props.placement.name}</h5>
                </div>
                <div className="placement-dates">
                  <h5 className="accordion-header-text">Start Date: {formatDate(props.placement.start_date)}</h5>
                  <h5 className="accordion-header-text">End Date: {formatDate(props.placement.end_date)}</h5>
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
