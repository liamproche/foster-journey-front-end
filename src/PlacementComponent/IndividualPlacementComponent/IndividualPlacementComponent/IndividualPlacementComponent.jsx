import PlacementControlsComponent from './PlacementControlsComponent/PlacementControlsComponent'
import FosterParents from './FosterParents/FosterParents';
import FosterSiblings from './FosterSiblings.jsx/FosterSiblings';
import './IndividualPlacementComponent.css'

function IndividualPlacementComponent(props) {
    return (
      <div className="IndividualPlacementComponent">
          <p>Placement Number: {props.placement.num}</p>
          <p>Placement Name: {props.placement.name}</p>
          <p>Start Date: {props.placement.start_date}</p>
          <p>End Date: {props.placement.end_date}</p>
          <p>Foster Parents:</p>{props.placement.foster_parents.map((parent)=>{
            return <FosterParents key={parent} parent={parent}></FosterParents>
          })}
          <p>Foster Siblings:</p>{props.placement.foster_siblings.map((sibling)=>{
            return <FosterSiblings key={sibling} sibling={sibling}></FosterSiblings>
          })}
          <PlacementControlsComponent></PlacementControlsComponent>
      </div>
    );
}

export default IndividualPlacementComponent;
