import { useState } from 'react'
import EditFormComponent from './EditFormComponent/EditFormComponent'
import './DetailsComponent.css'

function DetailsComponent(props) {
  const[placement, setPlacement] = useState(props.placement)
  const[parent, setParent] = useState("")
  const[sibling, setSibling] = useState("")
  const[note, setNote] = useState("")
  const[showEditForm, setShowEditForm] = useState(false)
  const addParentInputChange=(e)=>{
    setParent(e.target.value)
  }
  const addSiblingInputChange=(e)=>{
      setSibling(e.target.value)
    }
  const addNoteInputChange=(e)=>{
    setNote(e.target.value)
  }
  const toggleEditForm=()=>{
    setShowEditForm(!showEditForm)
  }
  return (
      <div className="DetailsComponent">
        <p>Start Date: {placement.start_date}</p>
        <p>End Date: {placement.end_date}</p>
        <p>Location: {placement.location}</p>
        <p>Foster Parents:</p>
        {placement.foster_parents.length !==0?
        placement.foster_parents.map((parent)=>{
            return <p key={props.placement.foster_parents.indexOf(parent)}>{parent}</p>
          }):<p>None Added</p>}
            <input id="parent-input-field" type="text" name="parent" onChange={addParentInputChange} required></input>
            <button onClick={()=>{
              const updatedPlacement = {...placement}
              updatedPlacement.foster_parents.push(parent)
              setPlacement(updatedPlacement)
              props.editPlacement(updatedPlacement)
              document.getElementById('parent-input-field').value=""
              setParent('')
            }}>Add Parent</button>
        <p>Foster Siblings:</p>
        {placement.foster_siblings.length !==0?
        placement.foster_siblings.map((sibling)=>{
            return <p key={props.placement.foster_siblings.indexOf(sibling)}>{sibling}</p>
          }):<p>None Added</p>}
            <input id="sibling-input-field" type="text" name="sibling" onChange={addSiblingInputChange} required></input>
            <button onClick={()=>{
              const updatedPlacement = {...placement}
              updatedPlacement.foster_siblings.push(sibling)
              setPlacement(updatedPlacement)
              props.editPlacement(updatedPlacement)
              document.getElementById('sibling-input-field').value=""
              setSibling('')
            }}>Add Sibling</button>
        <p>Notes:</p>
        {placement.notes.length !==0?
        placement.notes.map((note)=>{
            return <p key={props.placement.notes.indexOf(note)}>{note}</p>
          }):<p>None Added</p>}
            <input id="note-input-field" type="text" name="note" onChange={addNoteInputChange} required></input>
            <button onClick={()=>{
              const updatedPlacement = {...placement}
              updatedPlacement.notes.push(note)
              setPlacement(updatedPlacement)
              props.editPlacement(updatedPlacement)
              document.getElementById('note-input-field').value=""
              setNote('')
            }}>Add Note</button>
          {!showEditForm?
          <button onClick={toggleEditForm}>Edit Placement</button>:
          <EditFormComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement} setPlacement={setPlacement}></EditFormComponent>
          }
      </div>
    );
}

export default DetailsComponent