import { useState } from 'react'
import { Form, Forms } from 'react-bootstrap'
import FosterParents from './FosterParents/FosterParents'
import FosterSiblings from './FosterSiblings.jsx/FosterSiblings'
import NotesComponent from '../NotesComponent/NotesComponent';
import './EditFormComponent.css'

function EditFormComponent(props) {
  const[editedPlacement, setEditedPlacement] = useState({...props.placement})
  const[parents, setParents] = useState([...props.parents])
  const[siblings, setSiblings] = useState([...props.siblings])
  const handleInputChange=(e)=>{
    setEditedPlacement({
      ...editedPlacement,
      [e.target.name]: e.target.value
    })
  }
  const deleteFosterParent= async (parentToDelete)=>{
      await fetch(`http://localhost:8000/api/parents/${parentToDelete}`,{
      method: "DELETE"
    })
    setParents(parents.filter((parent)=>{return parent.id !== parentToDelete}))
  }
  const deleteFosterSibling= async (siblingToDelete)=>{
    await fetch(`http://localhost:8000/api/siblings/${siblingToDelete}`, {
      method: "DELETE"
    })
    setSiblings(siblings.filter((sibling)=>{return sibling.id !== siblingToDelete}))
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
  return (
      <div className="EditFormComponent">
          {/* <form id="edit-placement-form" onSubmit={submitEditPlacement}> */}
          <Form>
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
                <div className="edit-foster-parents-container">
                  {props.parents.length !==0?
                  parents.map((parent)=>{
                    return <FosterParents key={parent.id} parent={parent} deleteFosterParent={deleteFosterParent}/>
                  }):<p>None Added</p>}
                </div>
            </Form>




                <label htmlFor="siblings">Foster siblings:</label>
                {siblings.length !==0?
                siblings.map((sibling)=>{
                  return <FosterSiblings key={sibling.id} sibling={sibling} deleteFosterSibling={deleteFosterSibling}/>
                }):<p>None Added</p>}
                <br/>
                <label htmlFor="notes">Notes:</label>
                {editedPlacement.notes.length !==0?
                editedPlacement.notes.map((note)=>{
                  return <NotesComponent key={editedPlacement.notes.indexOf(note)} note={note} deleteNote={deleteNote}></NotesComponent>
                }):<p>None Added</p>}
                <br/>
                <br/>
                <button type="Submit">Submit Edits</button>
            {/* </form> */}
          <button onClick={()=>{
            props.deletePlacement(props.placement.id)
          }}>Delete placement</button>
      </div>
    );
}

export default EditFormComponent;
