import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

function NavBar(){
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);
  return (
    <nav>
      <h1>Foster Journey Nav</h1>
      <Link to="/">Home</Link>
      <span>  |  </span>
      <Link to="/login">Login</Link>
      <span>  |  </span>
      <Link to="/register">Create Account</Link>
    </nav>
  );
};

export default NavBar;