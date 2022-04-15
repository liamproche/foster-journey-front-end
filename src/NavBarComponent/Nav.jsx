import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function NavBar(){
  const [isAuth, setIsAuth] = useState(false);
  let {user, logoutUser}=useContext(AuthContext)
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);
  return (
    <nav>
      <h1>Foster Journey Nav</h1>

      <span>  |  </span>
      {user ? (
        <p onClick={logoutUser}>Logout</p>,
        <Link to="/">Placements</Link>
      ):(
        <Link to="/login">Login</Link>
      )}
      <span>  |  </span>
      <Link to="/register">Create Account</Link>
      {user && <p>Hello, {user.user_id}</p>}
    </nav>
  );
};

export default NavBar;