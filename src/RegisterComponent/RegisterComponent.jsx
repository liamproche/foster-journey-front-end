import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import './RegisterComponent.css'

function Register(){
  const [username, setUsername]=useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [passErr, setPassErr] = useState(null)
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const usernames = []
  const navigate = useNavigate() 
  const getUsernames = async () =>{
    try{
      const response = await fetch('http://localhost:8000/api/user/')
      const parsedResponse = await response.json()
      parsedResponse.map((user)=>{
        return usernames.push(user.username)
      })
    }catch(err){
      console.log(err)
    }
  }
  const checkUsername = () =>{
    if(usernames.includes(username)){
      setUsernameAvailable(false)
    }
    else{
      setUsernameAvailable(true)
    }
  }
  const verifyPass = ()=>{
    if(password !== confirmPass){
      setPassErr(true)
      console.log(passErr)
    }
    else{
      setPassErr(false)
    }
  }
  const checkSubmit = (e) =>{
    e.preventDefault()
    verifyPass()
    checkUsername()
    if(passErr === false){
      submitNewUser()
    }
  }
  
  const submitNewUser = async () => { 
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
      }
    }catch(err){
      console.log(err)
      alert("Please try you request again")
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
    } 
    getUsernames();
  });
  return(
    <div>
      <div id="register-form-container">
        <Form id="register-form" className="rounded p-4 p-sm-3" onSubmit={checkSubmit}>
          <h2 className="form-header" key="register-header">Sign Up</h2>
            <Form.Group className="mb-3">
              <Form.Label className="login-form-label">Username</Form.Label>
              <Form.Control className="user-input" type="username" placeholder='Select a Username' name="username" required value={username} onChange={(e)=>{setUsername(e.target.value); setUsernameAvailable(true)}}/>
            <div className="error-message-container">
              {usernameAvailable?
                <p></p>:
                <p>Username unavailable</p>
              }
            </div>
            </Form.Group>
            <div className="name-input-container">
              <Form.Group className="name-input">
                <Form.Label className="user-input">First Name</Form.Label>
                <Form.Control className="user-input" type="text" placeholder="Enter first name" name="first-name" minLength={1} onChange={(e)=>setFirstName(e.target.value)} required/>
              </Form.Group>
              <Form.Group className="name-input">
                <Form.Label className="user-input">Last Name</Form.Label>
                <Form.Control className="user-input" type="text" placeholder="Enter last name" name="last-name" minLength={1} onChange={(e)=>setLastName(e.target.value)}/>
              </Form.Group>
            </div>
            <div className="password-input-container">
              <Form.Group className="mb-3 pass-input">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control className="user-input" type="password" placeholder='Enter Password' name="password" value={password} onChange={(e)=>{setPassword(e.target.value); setPassErr(false)}} minLength="8" required/>
              </Form.Group>
              <Form.Group className="mb-3 pass-input">
                <Form.Label className="form-label">Confirm Password</Form.Label>
                <Form.Control className="user-input" type="password" placeholder='Confirm Password' name="password-confirm" onChange={(e)=>{setConfirmPass(e.target.value); setPassErr(false)}} required/>
              </Form.Group>
            </div>
            {passErr?
                <p>Passwords Must Match</p>:
                <p></p>  
              }
            <Button className="form-button" varient="primary" type="submit">Create Account</Button>
            <Link id="login-link" className="nav-link" to="/about" key="create-account-link">Login</Link>
          </Form>
        </div>

    </div>
  )
}

export default Register