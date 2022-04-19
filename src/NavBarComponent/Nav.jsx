import React, { useContext, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Nav.css'

function NavBar(){
  let {user, logoutUser}=useContext(AuthContext)
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
    }
  }, []);
  return (
    <nav>
      {user? (
      <Link to="/">Placements</Link>
      ):(
        <p></p>
      )}
      {user ? (
        <p className="link" onClick={logoutUser}>Logout</p>
      ):(
      <Link to="/login">Login</Link>
      )}
      {!user? (
      <Link to="/register">Create Account</Link>
      ):(
        <p></p>
      )}
      {/* TO-DO- UPDATE TOKEN TO INCLUDE USERNAME AND GREET USER BY USERNAME */}
      {/* {user && <p>Hello, {user.user_id}</p>} */}

    </nav>
  );
};

export default NavBar;