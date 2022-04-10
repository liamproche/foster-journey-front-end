import PlacementControlsComponent from './PlacementControlsComponent/PlacementControlsComponent'
import './IndividualPlacementComponent.css'

function IndividualPlacementComponent() {
    return (
      <div className="IndividualPlacementComponent">
          <h4>Individual Placement:</h4>
          <p>Placement info goes here</p>
          <PlacementControlsComponent></PlacementControlsComponent>
      </div>
    );
}

export default IndividualPlacementComponent;
