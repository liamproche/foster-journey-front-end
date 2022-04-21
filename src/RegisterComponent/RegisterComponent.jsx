import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Register(){
  const [username, setUsername]=useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)
  const [confirmPass, setConfirmPass] = useState('')
  const [passErr, setPassErr] = useState(false)
  const navigate = useNavigate() 
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
    } 
    else {
      setLoading(false)
    }
  }, []);

  const verifyPass = (e)=>{
    e.preventDefault()
    if(password !== confirmPass){
      setPassErr(true)
    }
    else{
      onSubmit(e);
    }
  }
  const onSubmit=async(e)=>{
    e.preventDefault()
    const user = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: password,
    }
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
        setFirstName('')
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
      <form onSubmit={verifyPass}>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' required value={username} onChange={(e)=>setUsername(e.target.value)}/>{' '}        
        <br/>
        <label htmlFor='first_name'>First Name:</label> 
        <input name='first_name' type='text' minLength={1} onChange={(e)=>setFirstName(e.target.value)} required/>{' '}
        <br/>
        <label htmlFor='last_name'>Last Name:</label> 
        <input name='last_name' type='text' minLength={1} onChange={(e)=>setLastName(e.target.value)}/>{' '}
        <br/>
        <label htmlFor='password'>Password:</label> 
        <input name='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} minLength="8" required/>{' '}
        <br/>
        <label htmlFor='password-confirm'>Confirm Password:</label>
        <input type='password' name='password-confirm' onChange={(e)=>setConfirmPass(e.target.value)}></input>
        <button type='submit'>Signup</button>
      </form>
      {passErr?
        <p>Passwords Must Match</p>:
        <p></p>  
    }
    </div>
  )
}

export default Register