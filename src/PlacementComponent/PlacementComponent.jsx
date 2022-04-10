import IndividualPlacementComponent from './IndividualPlacementComponent/'
import CreatePlacementComponent from './CreatePlacementComponent/CreatePlacementComponent';
import './PlacementComponent.css'

function PlacementComponent() {
    return (
      <div className="PlacementComponent">
        <IndividualPlacementComponent></IndividualPlacementComponent>
        <CreatePlacementComponent></CreatePlacementComponent>
      </div>
    );
}

export default PlacementComponent;
