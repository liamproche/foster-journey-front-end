import React, { useContext } from 'react'
import jwt_decode from 'jwt-decode'
import AuthContext from '../context/AuthContext';

function LoginComponent(){
  const {loginUser} = useContext(AuthContext)
  
  return (
    <div>
      <form onSubmit={loginUser}> 
        <input placeholder="enter username" type="text" name="username"></input>
        <input placeholder="enter email" type="email" name="email"></input>
        <input placeholder="enter password" type="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;