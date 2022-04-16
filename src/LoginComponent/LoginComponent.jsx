import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

function LoginComponent(){
  const {loginUser, user} = useContext(AuthContext)
  return (
    <div>
      {!user?
      <form onSubmit={loginUser}> 
        <input placeholder="enter username" type="text" name="username"></input>
        <input placeholder="enter email" type="email" name="email"></input>
        <input placeholder="enter password" type="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
      :
      <p></p>
    }
    </div>
  );
};

export default LoginComponent;