import FosterParents from '../FosterParents/FosterParents'
import FosterSiblings from '../FosterSiblings.jsx/FosterSiblings'
import './EditFormComponent.css'


function EditFormComponent(props) {
    return (
      <div className="EditFormComponent">
          <h1>THIS IS THE EDIT FORM</h1>
          <button onClick={()=>{
            props.deletePlacement(props.placement.id)
          }}>Delete placement</button>
      </div>
    );
}

export default EditFormComponent;
