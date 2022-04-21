import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom'


function Account(props) {
    const[updatedFirstName, setUpdatedFirstName] = useState('')
    const[updatedLastName, setUpdatedLastName] = useState('')
    const[updatesPass, setUpdatedPass] = useState('')
    return  <div className="Account">
                <h1>Account Edit Form</h1>
                <form>
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" name="first_name" onChange={(e)=>{setUpdatedFirstName(e.target.value)}}></input>
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" name="last_name" onChange={(e)=>{setUpdatedLastName(e.target.value)}}></input>
                    <label html="password">Password:</label>
                    <input type="password" name="password" onChange={(e)=>{setUpdatedPass(e.target.value)}}></input>
                    <input type="submit"></input>
                </form>
            </div>
}

export default Account;