import './FosterParents.css'

function FosterParents(props) {
    return (
      <div className="FosterParents">
          <p>Parent: {props.parent}</p>
      </div>
    );
}

export default FosterParents;