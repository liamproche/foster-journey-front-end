import './NotesComponent.css'

function NotesComponent(props) {
    return (
      <div className="NotesComponent">
          <p>{props.note}</p>
      </div>
    );
}

export default NotesComponent;