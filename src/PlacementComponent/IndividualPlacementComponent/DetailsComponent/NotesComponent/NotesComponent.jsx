import './NotesComponent.css'

function NotesComponent(props) {
    return (
      <div className="NotesComponent">
          <p>{props.note}</p>
          <button onClick={(e)=>{
            e.preventDefault()
            props.deleteNote(props.note)
          }}>Delete Note</button>
      </div>
    );
}

export default NotesComponent;