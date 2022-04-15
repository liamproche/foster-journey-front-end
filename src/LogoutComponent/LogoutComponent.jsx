import React, { useState, useEffect, Fragment } from 'react'

function Logout(){
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token') == null){
      window.location.replace('http://localhost:3000/login')
    } 
    else{
      setLoading(false)
    }
  }, [])

  const handleLogout=(e)=>{
    e.preventDefault()

    fetch('http://127.0.0.1:8000/auth/refresh/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.clear()
        window.location.replace('http://localhost:3000/login')
      })
  }
  return(
    <div>
      {loading === false && (
        <Fragment>
          <h1>Are you sure you want to logout?</h1>
          <button onClick={handleLogout}>Logout</button>
        </Fragment>
      )}
    </div>
  );
};

export default Logout;