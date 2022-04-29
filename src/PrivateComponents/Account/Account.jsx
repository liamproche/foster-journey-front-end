import { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext';
import NavBar from "../../NavBarComponent/Nav";

function Account() {
    const{ user, logoutUser, updateToken } = useContext(AuthContext)
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
        updateToken();
        console.log(user)
        console.log(editedUser)
        try{
            const response = await fetch (`http://localhost:8000/api/user/${user.user_id}/`,{
                method: "PUT",
                body: JSON.stringify(editedUser),
                headers:{
                    "Content-Type":"application/json" 
                }
            })
            const parsedResponse = response.json()
        }catch(err){
            console.log(err)
        }
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
                <NavBar/>
                <div id="edit-form-container">
                    <Form id="edit-form" className="rounded p-4 p-sm-3" onSubmit={submitEditedUser}>
                        <h2 className="form-header" key="register-header">Edit Account</h2>
                        <div className="name-input-container">
                            <Form.Group className="name-input">
                                <Form.Label className="user-input" name="first-name">First Name</Form.Label>
                                <Form.Control className="user-input" type="text" placeholder="Enter first name" name="first_name" minLength={1} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="name-input">
                                <Form.Label className="user-input">Last Name</Form.Label>
                                <Form.Control className="user-input" type="text" placeholder="Enter last name" name="last_name" minLength={1} onChange={handleInputChange}/>
                            </Form.Group>
                        </div>
                        <div className="password-input-container">
                            <Form.Group className="mb-3 pass-input">
                            {/* <Form.Label className="form-label">Password</Form.Label>
                                <Form.Control className="user-input" type="password" placeholder='Enter Password' name="password"onChange={handleInputChange} minLength="8" required/> */}
                            </Form.Group>
                        </div>
                        <Button className="form-button" type="submit">Submit Edits</Button>
                        <Button id="delete-account-button" className="form-button">Delete Account</Button>
                    </Form>
                </div> 
            </div>
}

export default Account;