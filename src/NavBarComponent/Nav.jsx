import React, { useContext, useState, useEffect, } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Nav.css'

function NavBar(){
  let { logoutUser } = useContext(AuthContext)
  const [navigate, setNavigate] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
    }
  }, []);
  return <nav>
          <Link to="/placements">Home</Link>
          <Link to="/account">Account</Link>
          <a href="" onClick={()=>{logoutUser(); setNavigate(true)}}>Logout</a>
          {navigate?<Navigate to="/"/>:<br className='nothing'/>}
    </nav>
}

export default NavBar;