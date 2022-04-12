import { useState } from 'react'
import FosterParents from './FosterParents/FosterParents'
import FosterSiblings from './FosterSiblings.jsx/FosterSiblings'
import NotesComponent from './NotesComponent/NotesComponent'
import PlacementControlsComponent from './PlacementControlsComponent/PlacementControlsComponent'
import './DetailsComponent.css'


function DetailsComponent(props) {
  const[placement, setPlacement] = useState(props.placement)
  const[parent, setParent] = useState("")
  const addParentInputChange=(e)=>{
    setParent(e.target.value)
    console.log(parent)
  }
  return (
      <div className="DetailsComponent">
        <p>Start Date: {placement.start_date}</p>
        <p>End Date: {placement.end_date}</p>
        <p>Foster Parents:</p>
        {placement.foster_parents?
        placement.foster_parents.map((parent)=>{
            return <FosterParents key={parent} parent={parent}></FosterParents>
          }):<p>None Added</p>}
            <input type="text" name="parent" onChange={addParentInputChange}></input>
            <button onClick={()=>{
              placement.foster_parents.push(parent)
              console.log(placement)
            }}>Add Parent</button>
        <p>Foster Siblings:</p>
        {placement.foster_siblings?
        placement.foster_siblings.map((sibling)=>{
            return <FosterSiblings key={sibling} sibling={sibling}></FosterSiblings>
          }):<p>None Added</p>}
        <p>Notes:</p>
        {placement.notes?
        placement.notes.map((note)=>{
            return <NotesComponent key={note} note={note}></NotesComponent>
          }):<p>None Added</p>}

          <PlacementControlsComponent placement={props.placement} deletePlacement={props.deletePlacement}></PlacementControlsComponent>
      </div>
    );
}

export default DetailsComponent