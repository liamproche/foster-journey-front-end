import { useState } from 'react'
import EditFormComponent from './EditFormComponent/EditFormComponent'
import './DetailsComponent.css'

function DetailsComponent(props) {
  const[placement, setPlacement] = useState(props.placement)
  const[note, setNote] = useState("")
  const[showEditForm, setShowEditForm] = useState(false)
  const[newParent, setNewParent] = useState({
    first_name: "",
    last_name: "",
    placement: props.placement.id
  })
  const[newSibling, setNewSibling] = useState({
    first_name: "",
    last_name: "",
    placement: props.placement.id
  })
  const handleParentInputChange=(e)=>{
    setNewParent({
      ...newParent,
      [e.target.name]: e.target.value
    })
  }
  const handleSiblingInputChange=(e)=>{
    setNewSibling({
      ...newSibling,
      [e.target.name]: e.target.value
    })
  }
  const submitNewParent=(e)=>{
    props.createParent({
      ...newParent,
      placement:props.placement.id
    })
  }
  const submitNewSibling=(e)=>{
    props.createSibling({
      ...newSibling,
      placement:props.placement.id
    })
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
        {props.parents.map((parent)=>{return<p key={parent.id}>{parent.first_name} {parent.last_name}</p>})}
        <p>Foster Parent Create Form</p>
        <form onSubmit={submitNewParent}>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" minLength={1} required onChange={handleParentInputChange}/>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" onChange={handleParentInputChange}/>
          <label htmlFor="url">Photo</label>
          <input type="text" name="url" onChange={handleParentInputChange}/>
          <input type="submit"></input>
        </form>
        <p>Foster Siblings Go Here</p>
        {props.siblings.map((sibling)=>{return<p key={sibling.id}>{sibling.first_name} {sibling.last_name}</p>})}
        <p>Foster sibling create form</p>
        <form onSubmit={submitNewSibling}>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" minLength={1} required onChange={handleSiblingInputChange}/>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" onChange={handleSiblingInputChange}/>
          <input type="submit"></input>
        </form>
        {/* <p>Foster Siblings:</p>
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
            }}>Add Sibling</button> */}
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