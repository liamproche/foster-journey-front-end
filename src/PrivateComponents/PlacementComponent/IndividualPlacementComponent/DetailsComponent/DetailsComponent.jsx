import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import EditFormComponent from './EditFormComponent/EditFormComponent'
import './DetailsComponent.css'

function DetailsComponent(props) {
  const[placement, setPlacement] = useState(props.placement)
  const[note, setNote] = useState("")
  const[showEditForm, setShowEditForm] = useState(false)
  const[image, setImage] = useState("");
  const[parentModalOpen, setParentModalOpen] = useState(false)
  const[siblingModalOpen, setSiblingOpenModal] = useState(false)
  const[newParent, setNewParent] = useState({
    first_name: "",
    last_name: "",
    placement: props.placement.id,
    url: null
  })
  const showParentModal=()=>{
    setParentModalOpen(!parentModalOpen)
  }
  const showSiblingModal=()=>{
    setSiblingOpenModal(!siblingModalOpen)
  }
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
        console.log("image uploaded")
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
    // e.preventDefault()
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
        <section className="location-container">
          <h5>Location: {placement.location}</h5>
        </section>
        <section className="foster-parents-container">
          <div className="foster-parent-header-container">
            <h6>Foster Parents:</h6>
          </div>
        <div className="parents-container">
          {props.parents.map((parent)=>{
            return (
            <div className="individual-foster-parent-container" key={parent.id}>
              <img className="foster-parent-image" src={parent.url}/>
              <p>{parent.first_name} {parent.last_name}</p>
            </div>
            )})}
          </div>
        </section>
        <Button variant ="secondary" id="add-parent-button" className="button" onClick={showParentModal}>Add Foster Parent</Button>
        <Modal className="m" show={parentModalOpen}>
                <Modal.Header id="modal-header-text">Add Foster Parent</Modal.Header>
                <Modal.Body>
                    <label className="styled-input">First Name</label>
                    <input htmlFor="first_name" type="text" name="first_name" minLength={1} required onChange={handleParentInputChange}/>
                    <br/>
                    <label htmlFor="last_name">Last Name </label>
                    <input type="text" name="last_name" onChange={handleParentInputChange}/>
                    <br/>
                    <label htmlFor="image">Upload an image</label>
                    <input type="file" name="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                    <br/>
                    {/* I HATE THE NEED FOR THIS BUTTON, BUT THERE IS A NEED FOR THIS BUTTON */}
                    <Button variant="secondary" onClick={uploadImage}>Upload Image</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showParentModal}>Close</Button>
                    <Button variant="primary" onClick={()=>{submitNewParent(); window.location.reload(false)}}>Submit</Button>
                </Modal.Footer>
            </Modal>
        <section className="foster-siblings-container">
          <div className="foster-sibling-header-container">
            <p>Foster Siblings:</p>
          </div>
          <div className="foster-siblings-name-container">
            {props.siblings.map((sibling)=>{return<p key={sibling.id} className="sibling-name">{sibling.first_name} {sibling.last_name} </p>})}
          </div>
          <Button variant="secondary" onClick={showSiblingModal}>Add Sibling</Button>
        </section>
        <Modal className="m" show={siblingModalOpen}>
                <Modal.Header id="modal-header-text">Add Foster Sibling</Modal.Header>
                <Modal.Body>
                    <label className="styled-input">First Name</label>
                    <input htmlFor="first_name" type="text" name="first_name" minLength={1} required onChange={handleSiblingInputChange}/>
                    <br/>
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" onChange={handleSiblingInputChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showSiblingModal}>Close</Button>
                    <Button variant="primary" onClick={()=>{submitNewSibling(); window.location.reload(false)}}>Submit</Button>
                </Modal.Footer>
            </Modal>
        <p>Notes:</p>
        {placement.notes.length !==0?
        placement.notes.map((note)=>{
            return <p key={props.placement.notes.indexOf(note)}>{note}</p>
          }):<p>None Added</p>}
            <input id="note-input-field" type="text" name="note" onChange={addNoteInputChange} required></input>
            <Button variant="secondary" onClick={()=>{
              const updatedPlacement = {...placement}
              updatedPlacement.notes.push(note)
              setPlacement(updatedPlacement)
              props.editPlacement(updatedPlacement)
              document.getElementById('note-input-field').value=""
              setNote('')
            }}>Add Note</Button>
          <br/>
          {!showEditForm?
          <Button variant="secondary" onClick={toggleEditForm}>Edit Placement</Button>:
          <EditFormComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement} setPlacement={setPlacement} parents={props.parents} siblings={props.siblings}></EditFormComponent>
          }
      </div>
    );
}

export default DetailsComponent