import { useState, useEffect, useContext } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import FosterParents from './FosterParents/FosterParents'
import FosterSiblings from './FosterSiblings.jsx/FosterSiblings'
import NotesComponent from '../NotesComponent/NotesComponent';
import AuthContext from '../../../../../context/AuthContext';

function EditFormComponent(props) {
  const { user } = useContext(AuthContext)
  const [userToDecrement, setUserToDecrement] = useState({})
  const [editedPlacement, setEditedPlacement] = useState({...props.placement})
  const [parents, setParents] = useState([...props.parents])
  const [siblings, setSiblings] = useState([...props.siblings])
  const handleInputChange=(e)=>{
    setEditedPlacement({
      ...editedPlacement,
      [e.target.name]: e.target.value
    })
  }
  const deleteFosterParent= async (parentToDelete)=>{
      await fetch(`https://foster-journey-backend.herokuapp.com/api/parents/${parentToDelete}`,{
      method: "DELETE"
    })
    setParents(parents.filter((parent)=>{return parent.id !== parentToDelete}))
    decrementUserParents()
  }
  const getUserToDecrement = async () =>{
    try{
      const response = await fetch (`https://foster-journey-backend.herokuapp.com/api/user/${user.user_id}/`)
      const parsedResponse = await response.json()
      setUserToDecrement(parsedResponse)
    }catch(err){
      console.log(err)
    }
  }
  const decrementUserParents = async ()=>{
    setUserToDecrement({
      ...userToDecrement,
      foster_parents: userToDecrement.foster_parents -= 1
    })
    try{
      const response = await fetch (`https://foster-journey-backend.herokuapp.com/api/user/${user.user_id}/`,{
        method: "PUT",
        body: JSON.stringify(userToDecrement),
        headers:{
          "Content-Type":"application/json"
      }
    })
    await response.json()
    }catch(err){
      console.log(err)
    }
  }
  const deleteFosterSibling= async (siblingToDelete)=>{
    await fetch(`https://foster-journey-backend.herokuapp.com/api/siblings/${siblingToDelete}`, {
      method: "DELETE"
    })
    setSiblings(siblings.filter((sibling)=>{return sibling.id !== siblingToDelete}))
    decrementUserSiblings()
  }
  const decrementUserSiblings = async ()=>{
    setUserToDecrement({
      ...userToDecrement,
      foster_siblings: userToDecrement.foster_siblings -= 1
    })
    try{
      const response = await fetch (`https://foster-journey-backend.herokuapp.com/api/user/${user.user_id}/`,{
        method: "PUT",
        body: JSON.stringify(userToDecrement),
        headers:{
          "Content-Type":"application/json"
      }
    })
    await response.json()
    }catch(err){
      console.log(err)
    }
  }
  const deleteNote=(noteToDelete)=>{
    setEditedPlacement({
      ...editedPlacement,
      notes: editedPlacement.notes.filter((note)=>{return note !== noteToDelete})
    })
  }
  const submitEditPlacement=()=>{
    props.setPlacement(editedPlacement)
    props.editPlacement(editedPlacement)
  }

  useEffect(()=>{getUserToDecrement()})

  return (
      <div className="EditFormComponent">
          {/* <form id="edit-placement-form" onSubmit={submitEditPlacement}> */}
          <Form onSubmit={submitEditPlacement}>
            <Form.Group>
              <Form.Label htmlFor="num">Placement Number:</Form.Label> 
              <Form.Control type="number" name="num" min="1" placeholder={props.placement.num} onChange={handleInputChange}></Form.Control>
            </Form.Group>    
            <Form.Group>
              <Form.Label className="styled-input" htmlFor="name">Placement Name:</Form.Label>
              <Form.Control type="text" name="name" placeholder={props.placement.name} onChange={handleInputChange}></Form.Control>
            </Form.Group> 
            <Form.Group>
              <Form.Label className="styled-input" htmlFor="start_date">Start Date</Form.Label>
              <Form.Control type="date" name="start_date" onChange={handleInputChange}></Form.Control>
            </Form.Group>
            <Form.Group> 
              <Form.Label className="styled-input" htmlFor="end_date">End Date</Form.Label>
              <Form.Control type="date" name="end_date" onChange={handleInputChange}></Form.Control>
            </Form.Group> 
            <Form.Group>
              <Form.Label className="styled-input" htmlFor="location">Location</Form.Label>
              <Form.Control type="text" name="location" placeholder={props.placement.location} onChange={handleInputChange}></Form.Control>
            </Form.Group>
              <Form.Label className="styled-input" htmlFor="parents">Foster parents:</Form.Label>
                <div className="edit-delete-container">
                  {props.parents.length !==0?
                  parents.map((parent)=>{
                    return <FosterParents key={parent.id} parent={parent} deleteFosterParent={deleteFosterParent}/>
                  }):<p>None Added</p>}
                </div>  
            <Form.Group>
                <Form.Label className="styled-input" htmlFor="siblings">Foster siblings:</Form.Label>
                  <div className="edit-delete-container">
                    {siblings.length !==0?
                    siblings.map((sibling)=>{
                      return <FosterSiblings key={sibling.id} sibling={sibling} deleteFosterSibling={deleteFosterSibling}/>
                    }):<p>None Added</p>}
                </div>
            </Form.Group>
            <Form.Group> 
                <Form.Label className="styled-input" htmlFor="notes">Notes:</Form.Label>
                <div className="edit-delete-container">
                  {editedPlacement.notes.length !==0?
                  editedPlacement.notes.map((note)=>{
                    return <NotesComponent key={editedPlacement.notes.indexOf(note)} note={note} deleteNote={deleteNote}></NotesComponent>
                }):<p>None Added</p>}
                </div>
            </Form.Group>     
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggleEditForm}>Close</Button>
                <Button type="submit" variant="primary">Submit</Button>
              </Modal.Footer>
          </Form>
          <div className="delete-placement-button-container">
            <Button className="red-button" variant="primary" onClick={()=>{
              props.deletePlacement(props.placement.id)
            }}>Delete placement</Button>
          </div>
      </div>
    );
}

export default EditFormComponent;
