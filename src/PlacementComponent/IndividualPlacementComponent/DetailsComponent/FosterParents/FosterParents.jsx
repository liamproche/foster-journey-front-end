import './FosterParents.css'

function FosterParents(props) {
    return (
      <div className="FosterParents">
          <p>{props.parent}</p>
          <button>Delete Parent</button>
      </div>
    );
}

export default FosterParents;