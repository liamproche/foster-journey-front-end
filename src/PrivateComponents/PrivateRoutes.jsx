import { useContext } from 'react';
import { Route, Navigate, Routes} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import PlacementComponent from './PlacementComponent/PlacementComponent';
import Account from './Account/Account';


//NOTE: MAY BE POSSIBLE TO REMOVE ARGUMENTS
function PrivateRoutes({children, ...rest}){
    let {user} = useContext(AuthContext)
    return user? 
        <Routes>
            <Route path="/placements" element={<PlacementComponent/>} exact/>
            <Route path="/account" element={<Account/>} exact/>
        </Routes>: 
        <Navigate to="/"/>
}

export default PrivateRoutes