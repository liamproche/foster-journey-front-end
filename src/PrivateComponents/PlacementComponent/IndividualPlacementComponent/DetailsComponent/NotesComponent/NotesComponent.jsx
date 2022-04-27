function NotesComponent(props) {
    return (
      <div className="NotesComponent">
          <button className="edit-delete-button" onClick={(e)=>{
            e.preventDefault()
            props.deleteNote(props.note)
          }}><img className="delete-icon" src={process.env.PUBLIC_URL + 'img/delete_icon.png' }/> {props.note}</button>
      </div>
    );
}

export default NotesComponent;