import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

function LoginComponent(){
  const {loginUser, user, incorrectCredentials} = useContext(AuthContext)
  return !user?
      <div>
        <div id="login-form-container" className="color-overlay d-flex justify-content-center aligin-items-center">
          <Form id="login-form" className="rounded p-4 p-sm-3" onSubmit={loginUser}>
          <h2 className="form-header" key="login-header">Login</h2>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control className="user-input" type="username" placeholder='Enter Username' name="username"/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control className="user-input" type="password" placeholder='Enter Password' name="password"/>
            </Form.Group>
            <div className="error-message-container">
            {incorrectCredentials?
                <p className="error-message">Username or password is incorrect</p>:
                <p></p>
                }
            </div>
            <Button className="form-button" varient="primary" type="submit">Login</Button>
            <Link id="create-account-link" className="nav-link" to="/register" key="create-account-link">Create Account</Link>
          </Form>
        </div>

      </div>
        :
        <Navigate to="/placements"/>

};

export default LoginComponent;