import { useState } from 'react'
import FosterParents from './FosterParents/FosterParents'
import FosterSiblings from './FosterSiblings.jsx/FosterSiblings'
import NotesComponent from '../NotesComponent/NotesComponent';
import './EditFormComponent.css'


function EditFormComponent(props) {
  const[editedPlacement, setEditedPlacement]=useState({...props.placement})
  const[parents, setParents]=useState([...props.parents])
  const handleInputChange=(e)=>{
    setEditedPlacement({
      ...editedPlacement,
      [e.target.name]: e.target.value
    })
  }
  const deleteFosterParent= async (parentToDelete)=>{
    const response = await fetch(`http://localhost:8000/api/parents/${parentToDelete}`,{
      method: "DELETE"
    })
    setParents(parents.filter((parent)=>{return parent.id !== parentToDelete}))
  }
  const deleteFosterSibling=(siblingToDelete)=>{
    setEditedPlacement({
      ...editedPlacement,
      foster_siblings: editedPlacement.foster_siblings.filter((sibling)=>{return sibling !== siblingToDelete})
    })
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
          <h1>Edit a placement:</h1>
          <form id="placement-form" onSubmit={submitEditPlacement}>
                <label htmlFor="num">Placement Number:</label>
                <input type="number" name="num" min="1" placeholder={props.placement.num} onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="name">Placement Name:</label>
                <input type="text" name="name" placeholder={props.placement.name} onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="start_date">Start Date</label>
                <input type="date" name="start_date" onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="end_date">End Date</label>
                <input type="date" name="end_date" onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" placeholder={props.placement.location} onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="parents">Foster parents:</label>
                {props.parents.length !==0?
                parents.map((parent)=>{
                  return <FosterParents key={parent.id} parent={parent} deleteFosterParent={deleteFosterParent}></FosterParents>
                }):<p>None Added</p>}
                <br/>
                <label htmlFor="siblings">Foster siblings:</label>
                {props.siblings.length !==0?
                props.siblings.map((sibling)=>{
                  return <FosterSiblings key={sibling.id} sibling={sibling} deleteFosterSibling={deleteFosterSibling}></FosterSiblings>
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
            </form>
          <button onClick={()=>{
            props.deletePlacement(props.placement.id)
          }}>Delete placement</button>
      </div>
    );
}

export default EditFormComponent;
