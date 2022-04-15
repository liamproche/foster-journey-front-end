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
      <ul>
        {isAuth === true ? (
          <Fragment>
            {' '}
            <li>
              <Link to='/placements'>Placements</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Signup</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;