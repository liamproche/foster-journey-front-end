import React, { useState, useEffect } from 'react'

function Login(){
  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('')
  const[errors, setErrors] = useState(false)
  const[loading, setLoading] = useState(true)

  useEffect(()=>{
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/dashboard')
    } else {
      setLoading(false)
    }
  }, []);

  const onSubmit=(e)=>{
    e.preventDefault()

    const user = {
      username: username,
      email: email,
      password: password
    };

    fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear()
          localStorage.setItem('token', data.key)
          window.location.replace('http://localhost:3000/dashboard')
        } else {
          setEmail('')
          setPassword('')
          localStorage.clear()
          setErrors(true)
        }
      })
  }
  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <form onSubmit={onSubmit}>
          <label htmlFor='username'>Username:</label>
          <input type='text' name='username' value={username} required onChange={(e)=>setUsername(e.target.value)}/>{' '}
          <br/>
          <label htmlFor='email'>Email address:</label> 
          <input name='email' type='email' value={email} required onChange={(e)=>setEmail(e.target.value)}/>{' '}
          <br/>
          <label htmlFor='password'>Password:</label> <br />
          <input name='password' type='password' value={password} required onChange={(e)=>setPassword(e.target.value)}/>{' '}
          <br/>
          <button type='submit' value='Login'>Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;