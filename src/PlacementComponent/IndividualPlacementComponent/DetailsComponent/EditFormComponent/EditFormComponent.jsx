import FosterParents from '../FosterParents/FosterParents'
import FosterSiblings from '../FosterSiblings.jsx/FosterSiblings'
import './EditFormComponent.css'


function EditFormComponent(props) {
    return (
      <div className="EditFormComponent">
          <h1>Edit a placement:</h1>
          <form id="placement-form">
                <label htmlFor="num">Placement Number:</label>
                <input type="number" name="num" min="1" required value={props.placement.num}></input>
                <br/>
                <label htmlFor="name">Create a name for this placement</label>
                <input type="text" name="name" value={props.placement.name}></input>
                <br/>
                <label htmlFor="start_date">Start Date</label>
                <input type="date" name="start_date" value={props.placement.start_date}></input>
                <br/>
                <label htmlFor="end_date">End Date</label>
                <input type="date" name="end_date" value={props.placement.end_date}></input>
                <br/>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" value={props.placement.location}></input>
                <br/>
                <br/>
                <button type="Submit">Submit Placement</button>
            </form>
          <button onClick={()=>{
            props.deletePlacement(props.placement.id)
          }}>Delete placement</button>
      </div>
    );
}

export default EditFormComponent;
