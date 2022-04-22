import React, { useContext, useEffect, } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
      <Link to="/placements">Placements</Link>
      ):(
        <p></p>
      )}
      <br/>
      {user? (
        <Link to="/account">Account</Link>):(
        <p></p>
      )}
      {user ? (
        <p className="link" onClick={logoutUser}>Logout</p>
      ):(
        <p></p>
      )}
      {!user? [
      <Link to="/register" key="create-account-link" className="nav-link">Create Account</Link>,
      <Link to="/login" key="login-link" className="nav-link">Login</Link>]
      :(
        <p></p>
      )}

    </nav>
  );
};

export default NavBar;