import { useState, useEffect } from 'react'
import EditFormComponent from './EditFormComponent/EditFormComponent'
import './DetailsComponent.css'

function DetailsComponent(props) {
  const[placement, setPlacement] = useState(props.placement)
  const[note, setNote] = useState("")
  const[showEditForm, setShowEditForm] = useState(false)
  const[image, setImage] = useState("");
  const[newParent, setNewParent] = useState({
    first_name: "",
    last_name: "",
    placement: props.placement.id,
    url: null
  })
  const uploadImage = async ()=>{
    try{
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'ym3qlxdj')
        const imgUplaodResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_IMG_CLOUD}/image/upload/`, {
            method: 'POST',
            body: data
        })
        const parsedResponse = await imgUplaodResponse.json()
        setNewParent({
            ...newParent,
            url: parsedResponse.url
        })
    }catch(err){
        console.log(err)
    }
  }
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
  const submitNewParent= async (e)=>{
    e.preventDefault()
    props.createParent(newParent)
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
        <div className="location-container">
          <h5>Location: {placement.location}</h5>
        </div>
        <div className="foster-parents-container">
          <div className="foster-parents-header-container">
            <h6>Foster Parents:</h6>
          </div>
          {props.parents.map((parent)=>{
            return (
            <div className="foster-parent-container" key={parent.id}>
              <img className="foster-parent-image" src={parent.url}/>
              <p>{parent.first_name} {parent.last_name}</p>
            </div>
            )
            })}
          <button>Add Foster Parent</button>
        </div>
        
        
        
        
        <p>Foster Parent Create Form</p>
        <form onSubmit={submitNewParent}>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" minLength={1} required onChange={handleParentInputChange}/>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" onChange={handleParentInputChange}/>
          <br/>
          <label htmlFor="image">Upload an image</label>
          <input type="file" name="file" onChange={(e)=>setImage(e.target.files[0])}></input>
          {/* I HATE THE NEED FOR THIS BUTTON, BUT THERE IS A NEED FOR THIS BUTTON */}
          <button onClick={uploadImage}>Upload Image</button>
          <input type="submit"></input>
        </form>





        <div className="foster-siblings-container">
          <p>Foster Siblings:</p>
          {props.siblings.map((sibling)=>{return<p key={sibling.id}>{sibling.first_name} {sibling.last_name}</p>})}
          <button>Add Foster Sibling</button>
        </div>
        
        
        {/* <p>Foster sibling create form</p>
        <form onSubmit={submitNewSibling}>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" minLength={1} required onChange={handleSiblingInputChange}/>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" onChange={handleSiblingInputChange}/>
          <input type="submit"></input>
        </form> */}





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
          <EditFormComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement} setPlacement={setPlacement} parents={props.parents} siblings={props.siblings}></EditFormComponent>
          }
      </div>
    );
}

export default DetailsComponent