import { useContext } from 'react';
import { Route, Navigate, Routes} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import PlacementComponent from './PlacementComponent/PlacementComponent';


//NOTE:THIS IS WHERE TO ENTER ARGUMENTS TO CHANGE ROUTES BASED ON USER PERMISSIONS

//NOTE: MAY BE POSSIBLE TO REMOVE ARGUMENTS
function PrivateRoutes({children, ...rest}){
    let {user} = useContext(AuthContext)
    return user? (
            <PlacementComponent/>) : (
            <Navigate to="/login"/>
           )
}

export default PrivateRoutes