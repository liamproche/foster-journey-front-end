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
  return <nav>
          <Link to="/placements">Home</Link>
          <Link to="/account">Account</Link>
          <a href="" onClick={logoutUser}>Logout</a>
    </nav>
}

export default NavBar;