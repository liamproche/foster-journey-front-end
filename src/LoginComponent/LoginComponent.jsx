import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'


function Login(){
  const[authTokens, setAuthTokens] = useState(false)
  const[userDataFromToken , setUserDataFromToken] = useState({})
  const[user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleInputChange=(e)=>{
    e.preventDefault()
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  
  const loginUser= async(e)=>{
    e.preventDefault()
    console.log('login form submitted')
    const response = await fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    console.log(data)
    console.log(response)
    if(response.status === 200){
      setAuthTokens(data)
      setUserDataFromToken(jwt_decode(data.access))
    }
    else{
      alert('Something went wrong with the login api call')
      //TODO: ERROR HANDLING
    }
  }
  
  
  return (
    <div>
      <form onSubmit={loginUser}> 
        <input placeholder="enter username" type="text" name="username" onChange={handleInputChange}></input>
        <input placeholder="enter email" type="email" name="email" onChange={handleInputChange}></input>
        <input placeholder="enter password" type="password" name="password" onChange={handleInputChange}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;