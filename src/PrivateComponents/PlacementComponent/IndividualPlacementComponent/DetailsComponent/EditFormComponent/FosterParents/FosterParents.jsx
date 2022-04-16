import './FosterParents.css'

function FosterParents(props) {
  
  
  return (     
      <div className="FosterParents">
          <p id="parent-to-edit">{props.parent}</p>
          <button onClick={(e)=>{
            e.preventDefault()
           props.deleteFosterParent(props.parent)}}>Delete Parent</button>
      </div>
    );
}

export default FosterParents;