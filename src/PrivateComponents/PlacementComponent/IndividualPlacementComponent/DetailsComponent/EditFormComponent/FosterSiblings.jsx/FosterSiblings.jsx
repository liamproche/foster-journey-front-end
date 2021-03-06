function FosterSiblings(props) {
    return (
      <div className="FosterSiblings">
          <button className="edit-delete-button" onClick={(e)=>{
            e.preventDefault()
            props.deleteFosterSibling(props.sibling.id)
          }}><img className="delete-icon" src={process.env.PUBLIC_URL + 'img/delete_icon.png' }/> {props.sibling.first_name} {props.sibling.last_name}</button>
      </div>
    );
}
export default FosterSiblings;