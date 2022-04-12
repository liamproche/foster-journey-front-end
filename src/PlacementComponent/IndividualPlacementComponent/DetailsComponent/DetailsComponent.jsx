import { useState } from 'react'
import FosterParents from './FosterParents/FosterParents'
import FosterSiblings from './FosterSiblings.jsx/FosterSiblings'
import NotesComponent from './NotesComponent/NotesComponent'
import PlacementControlsComponent from './PlacementControlsComponent/PlacementControlsComponent'
import './DetailsComponent.css'


function DetailsComponent(props) {
  const[placement, setPlacement] = useState(props.placement)
  const[parent, setParent] = useState("")
  const[sibling, setSibling] = useState("")
  const[note, setNote] = useState("")
  const addParentInputChange=(e)=>{
    setParent(e.target.value)
  }
  const addSiblingInputChange=(e)=>{
      setSibling(e.target.value)
    }
  const addNoteInputChange=(e)=>{
    setNote(e.target.value)
  }
  return (
      <div className="DetailsComponent">
        <p>Start Date: {placement.start_date}</p>
        <p>End Date: {placement.end_date}</p>
        <p>Foster Parents:</p>
        {placement.foster_parents.length !==0?
        placement.foster_parents.map((parent)=>{
            return <FosterParents key={parent} parent={parent}></FosterParents>
          }):<p>None Added</p>}
            <input type="text" name="parent" onChange={addParentInputChange}></input>
            <button onClick={()=>{
              const updatedPlacement = {...placement}
              updatedPlacement.foster_parents.push(parent)
              setPlacement(updatedPlacement)
              props.editPlacement(updatedPlacement)
            }}>Add Parent</button>
        <p>Foster Siblings:</p>
        {placement.foster_siblings.length !==0?
        placement.foster_siblings.map((sibling)=>{
            return <FosterSiblings key={sibling} sibling={sibling}></FosterSiblings>
          }):<p>None Added</p>}
            <input type="text" name="sibling" onChange={addSiblingInputChange}></input>
            <button onClick={()=>{
              const updatedPlacement = {...placement}
              updatedPlacement.foster_siblings.push(sibling)
              setPlacement(updatedPlacement)
              props.editPlacement(updatedPlacement)
            }}>Add Sibling</button>
        <p>Notes:</p>
        {placement.notes.length !==0?
        placement.notes.map((note)=>{
            return <NotesComponent key={note} note={note}></NotesComponent>
          }):<p>None Added</p>}
            <input type="text" name="note" onChange={addNoteInputChange}></input>
            <button onClick={()=>{
              const updatedPlacement = {...placement}
              updatedPlacement.notes.push(note)
              setPlacement(updatedPlacement)
              props.editPlacement(updatedPlacement)
            }}>Add Note</button>
          <PlacementControlsComponent placement={props.placement} deletePlacement={props.deletePlacement}></PlacementControlsComponent>
      </div>
    );
}

export default DetailsComponent