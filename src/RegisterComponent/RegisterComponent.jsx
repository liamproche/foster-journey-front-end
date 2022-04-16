import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Register(){
  const [username, setUsername]=useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate() 
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/dashboard')
    } 
    else {
      setLoading(false)
    }
  }, []);

  const onSubmit=async(e)=>{
    e.preventDefault()
    const user = {
      username: username,
      email: email,
      password: password,
    }
    console.log(user)
    try{
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const parsedResponse = await response.json()
      console.log(parsedResponse)
      if(parsedResponse.user){
        console.log('the user has been created')
        return navigate('/login')
      }
      else{
        setUsername('')
        setEmail('')
        setPassword('')
        setErrors(true)
      }
    }catch(err){
      console.log(err)
      //TO-DO ERROR HANDLING
    }
    }
  return(
    <div>
      {loading === false && <h1>Signup</h1>}
      {errors === true && <h2>Cannot signup with provided credentials</h2>}
      <form onSubmit={onSubmit}>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' required value={username} onChange={(e)=>setUsername(e.target.value)}/>{' '}        
        <br/>
        <label htmlFor='email'>Email address:</label> 
        <input name='email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>{' '}
        <br/>
        <label htmlFor='password'>Password:</label> 
        <br/>
        <input name='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} minLength="8" required/>{' '}
        <br/>
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Register