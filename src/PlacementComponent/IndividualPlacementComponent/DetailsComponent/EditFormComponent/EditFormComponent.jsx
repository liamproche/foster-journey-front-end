import { useState } from 'react'
import FosterParents from './FosterParents/FosterParents'
import FosterSiblings from './FosterSiblings.jsx/FosterSiblings'
import NotesComponent from '../NotesComponent/NotesComponent';
import './EditFormComponent.css'


function EditFormComponent(props) {
  const[editedPlacement, setEditedPlacement]=useState({...props.placement})
  const handleInputChange=(e)=>{
    setEditedPlacement({
      ...props.placement,
      [e.target.name]: e.target.value
    })
  }
  const deleteFosterParent=(parentToDelete)=>{
    setEditedPlacement({
      ...editedPlacement,
      foster_parents: editedPlacement.foster_parents.filter((parent)=>{return parent !== parentToDelete})
    })
  console.log(editedPlacement)
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
                {editedPlacement.foster_parents.length !==0?
                editedPlacement.foster_parents.map((parent)=>{
                  return <FosterParents key={editedPlacement.foster_parents.indexOf(parent)} parent={parent} deleteFosterParent={deleteFosterParent}></FosterParents>
                }):<p>None Added</p>}
                <br/>
                <label htmlFor="siblings">Foster siblings:</label>
                {props.placement.foster_siblings.length !==0?
                props.placement.foster_siblings.map((sibling)=>{
                  return <FosterSiblings key={props.placement.foster_siblings.indexOf(sibling)} sibling={sibling}></FosterSiblings>
                }):<p>None Added</p>}
                <br/>
                <label htmlFor="notes">Notes:</label>
                {props.placement.notes.length !==0?
                props.placement.notes.map((note)=>{
                  return <NotesComponent key={props.placement.notes.indexOf(note)} note={note}></NotesComponent>
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
