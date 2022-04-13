import './FosterSiblings.css'

function FosterSiblings(props) {
    return (
      <div className="FosterSiblings">
          <p>{props.sibling}</p>
          <button>Delete Sibling</button>
      </div>
    );
}
export default FosterSiblings;