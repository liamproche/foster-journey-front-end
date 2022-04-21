import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

function LoginComponent(){
  const {loginUser, user} = useContext(AuthContext)
  return (
    <div>
      {!user?
      <form onSubmit={loginUser}> 
        <label htmlFor="username">Username:</label>
        <input type="text" name="username"></input>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
      :
      <p></p>
    }
    </div>
  );
};

export default LoginComponent;