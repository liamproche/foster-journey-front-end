import './PlacementControlsComponent.css'
import FosterParents from '../FosterParents/FosterParents';
import FosterSiblings from '../FosterSiblings.jsx/FosterSiblings';


function PlacementControlsComponent(props) {
    return (
      <div className="PlacementControlsComponent">
          <button>Edit Placement</button>
          <button onClick={()=>{
            props.deletePlacement(props.placement.id)
          }}>Delete placement</button>
      </div>
    );
}

export default PlacementControlsComponent;
