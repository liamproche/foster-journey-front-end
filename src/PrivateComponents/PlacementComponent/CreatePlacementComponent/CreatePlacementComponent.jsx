import { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import './CreatePlacementComponent.css'

function CreatePlacementComponent(props) {
  const {user}=useContext(AuthContext)
  const[newPlacement, setNewPlacement] = useState({
    num: "",
    name: "",
    start_date: "",
    end_date: "",
    location: "",
  })
  const submitNewPlacement=()=>{
    props.createNewPlacement({
      ...newPlacement,
      user: user.user_id
    })
  }
    
  const handleInputChange=(e)=>{
    setNewPlacement({
      ...newPlacement,
      [e.target.name]: e.target.value
    })
  }
  
  return (
      <div className="CreatePlacementComponent">
          <h1>Create a Placement</h1>
          <form id="placement-form" onSubmit={submitNewPlacement}>
                <label htmlFor="num">Placement Number:</label>
                <input type="number" name="num" min="1" required onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="name">Create a name for this placement</label>
                <input type="text" name="name" placeholder="Optional" onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="start_date">Start Date</label>
                <input type="date" name="start_date" onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="end_date">End Date</label>
                <input type="date" name="end_date" onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" onChange={handleInputChange}></input>
                <br/>
                <br/>
                <button type="Submit">Submit Placement</button>
            </form>
      </div>
    );
}

export default CreatePlacementComponent;