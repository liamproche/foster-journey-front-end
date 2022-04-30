function FosterParents(props) {
  return (     
      <div className="FosterParents">
          <button className="edit-delete-button" onClick={(e)=>{
            e.preventDefault()
            props.deleteFosterParent(props.parent.id)}}> <img className="delete-icon" src={process.env.PUBLIC_URL + 'img/delete_icon.png' }/> {props.parent.first_name} {props.parent.last_name}</button>
      </div>
    );
}

export default FosterParents;