import React, { useState, useEffect, Fragment } from 'react'

function Dashboard(){
    const [userEmail, setUserEmail] = useState('')
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      if (localStorage.getItem('token') == null){
        window.location.replace('http://localhost:3000/login');
      } 
      else{
        //this is where I need to setup a route on the backend to send only user placements
        fetch('http://localhost:8000/api/users/auth/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setUserEmail(data.email);
            setLoading(false);
          })
      }
    }, [])  
    return(
      <div>
        {loading === false && (
          <Fragment>
            <h1>Dashboard</h1>
            <h2>Hello {userEmail}!</h2>
          </Fragment>
        )}
      </div>
    )
  }
  
  export default Dashboard