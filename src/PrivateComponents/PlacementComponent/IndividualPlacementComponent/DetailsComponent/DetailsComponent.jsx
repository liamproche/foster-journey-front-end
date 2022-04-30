import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditFormComponent from './EditFormComponent/EditFormComponent';

function DetailsComponent(props) {
  const [placement, setPlacement] = useState(props.placement)
  const [note, setNote] = useState("")
  const [showEditForm, setShowEditForm] = useState(false)
  const [image, setImage] = useState("");
  const [parentModalOpen, setParentModalOpen] = useState(false)
  const [siblingModalOpen, setSiblingOpenModal] = useState(false)
  const [noteErr, setNoteErr] = useState(false)
  const [imgUploaded, setImgUploaded] = useState(false)
  const [newParent, setNewParent] = useState({
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
    }catch(err){
        console.log(err)
    }
  }
  const [newSibling, setNewSibling] = useState({
    first_name: "",
    last_name: "",
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
    e.preventDefault()
    props.createParent(newParent)
  }
  const submitNewSibling=(e)=>{
    e.preventDefault()
    props.createSibling({
      ...newSibling,
      placement: props.placement.id
    })
  }
  const addNoteInputChange=(e)=>{
    setNote(e.target.value)
  }
  const checkNote=()=>{
    if(note.length <= 0){
      setNoteErr(true)
    }
    else{
      setNoteErr(false)
    }
  }
  const toggleEditForm=()=>{
    setShowEditForm(!showEditForm)
  }
  return (
      <div className="DetailsComponent">
        <section className="location-container">
          <h5 className="header-text">Location: {placement.location}</h5>
        </section>
          <div className="foster-parent-header-container">
            <h5>Foster Parents:</h5>
          </div>
        <section className="foster-parents-container">
          <div className="parents-container">
            {props.parents.map((parent)=>{
              return (
              <div className="individual-foster-parent-container" key={parent.id}>
                {parent.url?
                <img className="foster-parent-image" src={parent.url} alt="Foster Parent"/>:
                <img className="foster-parent-image" src={process.env.PUBLIC_URL + 'img/no-profile-image.png'} alt="Foster Parent"/>
                }
                <p>{parent.first_name} {parent.last_name}</p>
              </div>
              )})}
            </div>
          <Button variant ="secondary" className="add-button" onClick={()=>{showParentModal(); setImgUploaded(false)}}>Add Foster Parent</Button>
        </section>
        <Modal className="m" show={parentModalOpen}>
                <Modal.Header id="modal-header-text">Add Foster Parent</Modal.Header>
                <Modal.Body>
                    <label className="styled-input">First Name</label>
                    <input htmlFor="first_name" type="text" name="first_name" minLength={1} className="name-input-field" required onChange={handleParentInputChange} placeholder="Enter first name"/>
                    <br/>
                    <label htmlFor="last_name">Last Name </label>
                    <input type="text" name="last_name" className="name-input-field" onChange={handleParentInputChange} placeholder="Enter last name"/>
                    <br/>
                    <label htmlFor="image">Upload an image:</label>
                    <input type="file" name="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                    <br/>
                    {/* I HATE THE NEED FOR THIS BUTTON, BUT THERE IS A NEED FOR THIS BUTTON */}
                    <button className="upload-image-button"  onClick={()=>{uploadImage(); setImgUploaded(true)}}>Upload File</button>
                    {imgUploaded?
                    <div className="uploaded-message-container">
                      <p>Image Uploaded</p>
                    </div>:
                    <p className="none"></p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="add-button" onClick={showParentModal}>Close</Button>
                    <Button variant="primary" onClick={submitNewParent}>Submit</Button>
                </Modal.Footer>
            </Modal>
          <div className="foster-sibling-header-container">
            <h5>Foster Siblings:</h5>
          </div>
          <section className="foster-siblings-container">
            <div className="siblings-container">
              {props.siblings.map((sibling)=>{return<p key={sibling.id} className="sibling-name">{sibling.first_name} {sibling.last_name} </p>})}
            </div>
            <Button variant="secondary" className="add-button" onClick={showSiblingModal}>Add Foster Sibling</Button>
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
                    <Button variant="primary" onClick={submitNewSibling}>Submit</Button>
                </Modal.Footer>
            </Modal>
        <section className="notes-container">
          <h5>Notes:</h5>
            {placement.notes.length !==0?
              placement.notes.map((note)=>{
              return <p key={props.placement.notes.indexOf(note)}>{note}</p>
            }):<p>None Added</p>}
              <input className="user-input styled-input note-input-field" type="text" name="note" onChange={addNoteInputChange} placeholder="Enter a note" required/>
              {noteErr ?
                <p className="error-message">Note cannot be blank</p>:
                <p></p>
              }   
              <Button className="add-button" variant="secondary" onClick={()=>{
                checkNote()
                const updatedPlacement = {...placement}
                updatedPlacement.notes.push(note)
                setPlacement(updatedPlacement)
                props.editPlacement(updatedPlacement)
                const elements = document.getElementsByClassName('note-input-field')
                for(let i = 0; i < elements.length; i++){
                  console.log('about to set value')
                  elements[i].value = ""
              }
              setNote('')
              }}>Add Note</Button>
          </section>
          <Button variant ="secondary" className="add-button" onClick={toggleEditForm}>Edit Placement</Button>          
          <Modal className="m" show={showEditForm}>
            <Modal.Header id="modal-header-text">Edit {props.placement.name}</Modal.Header>
              <Modal.Body>
                <EditFormComponent placement={props.placement} deletePlacement={props.deletePlacement} editPlacement={props.editPlacement} setPlacement={setPlacement} parents={props.parents} siblings={props.siblings} toggleEditForm={toggleEditForm}></EditFormComponent>
              </Modal.Body>
            </Modal>
      </div>
    );
}

export default DetailsComponent