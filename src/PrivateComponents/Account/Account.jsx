import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';

function Account() {
    const{user, logoutUser}=useContext(AuthContext)
    const[editedUser, setEditedUser]=useState({})
    const handleInputChange = (e) =>{
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value
        })
    }
    const getUserToEdit = async () =>{
        try{
            const response = await fetch (`http://localhost:8000/api/user/${user.user_id}`)
            const parsedResponse = await response.json()
            setEditedUser({...parsedResponse})
        }catch(err){
            console.log(err)
        }
    }
    const submitEditedUser = async (e) =>{
        e.preventDefault();
        console.log(editedUser)
        //DELETE THIS VARIABLE 
        const response = await fetch (`http://localhost:8000/api/user/${user.user_id}/`,{
            method: "PUT",
            body: JSON.stringify(editedUser),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const parsedResponse = response.json()
        console.log(parsedResponse)
    }
    const deleteAccount = async () =>{
        try{
            const response = await fetch (`http://localhost:8000/api/user/${user.user_id}/`, {
                method: "DELETE"
        })
        }catch(err){
            console.log(err)
        }
        logoutUser();
    }
    useEffect(()=>{getUserToEdit()}, [])
    return  <div className="Account">
                <h1>Account Edit Form</h1>
                <form onSubmit={submitEditedUser}>
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" name="first_name" onChange={handleInputChange}></input>
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" name="last_name" onChange={handleInputChange}></input>
                    <label html="password">Password:</label>
                    <input type="password" name="password" onChange={handleInputChange}></input>
                    <input type="submit"></input>
                </form>
                <button onClick={deleteAccount}>Delete Account</button>
            </div>
}

export default Account;