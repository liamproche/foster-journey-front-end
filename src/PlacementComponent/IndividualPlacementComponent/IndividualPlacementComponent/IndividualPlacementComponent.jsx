import PlacementControlsComponent from './PlacementControlsComponent/PlacementControlsComponent'
import FosterParents from './FosterParents/FosterParents';
import './IndividualPlacementComponent.css'

function IndividualPlacementComponent(props) {
    return (
      <div className="IndividualPlacementComponent">
          <p>Placement Number: {props.placement.num}</p>
          <p>Placement Name: {props.placement.name}</p>
          <p>Start Date: {props.placement.start_date}</p>
          <p>End Date: {props.placement.end_date}</p>
          {props.placement.foster_parents.map((parent)=>{
            return <FosterParents key={parent} parent={parent}></FosterParents>
          })}
          <PlacementControlsComponent></PlacementControlsComponent>
      </div>
    );
}

export default IndividualPlacementComponent;
