import './FosterSiblings.css'

function FosterSiblings(props) {
    return (
      <div className="FosterSiblings">
          <p>{props.sibling}</p>
          <button onClick={(e)=>{
            e.preventDefault()
            props.deleteFosterSibling(props.sibling)
          }}>Delete Sibling</button>
      </div>
    );
}
export default FosterSiblings;