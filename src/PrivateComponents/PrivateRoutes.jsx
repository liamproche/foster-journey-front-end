import { Route, Redirect } from 'react-router-dom';
import PlacementComponent from './PlacementComponent/PlacementComponent';

function PrivateRoutes(){
    console.log('private route is working')
    return(
        <PlacementComponent></PlacementComponent>
    )
}

export default PrivateRoutes