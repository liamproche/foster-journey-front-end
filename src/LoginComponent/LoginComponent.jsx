import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import {Navigate} from 'react-router-dom';

function LoginComponent(){
  const {loginUser, user, incorrectCredentials} = useContext(AuthContext)
  return !user?
      <div>
        <h2 key="login-header">Login</h2>
        <form key="login-form" onSubmit={loginUser}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username"></input>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password"></input>
          <button type="submit">Login</button>
        </form>
        {incorrectCredentials?
        <p className="error-message">Username or password is incorrect</p>:
        <p></p>}
      </div>
        :
        <Navigate to="/placements"/>

};

export default LoginComponent;