import './NotesComponent.css'

function NotesComponent(props) {
    return (
      <div className="NotesComponent">
          <p>{props.note}</p>
          <button>Delete Note</button>
      </div>
    );
}

export default NotesComponent;