//CONTEXT ALLOWS SHARING OF INFORMATION THROUGHOUT THE APP INSTEAD OF HAVING TO PASS ITEMS DOWN AS PROPS
import {createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';

const AuthContext = createContext()

export default AuthContext

//THIS IS THE PROVIDER FUNCTION (PROVIDES INFORMATION TO THE CHILD COMPONENTS)
//VALUE IS THE PROPERTY WE WANT AVAIALABLE THROUGHOUT THE APP
export const AuthProvider=({children})=>{    
    const[user, setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    //JSON.PARSE OPPOSITE OF STRINGIFY (RETURNS OBJECT) -- THIS LINE OF CODE WAS A NIGHTMARE!!!
    const[authTokens, setAuthTokens]=useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const[loading, setLoading]=useState(true)
    //BEGIN USER LOGIN
    const loginUser= async(e)=>{
        e.preventDefault()
        try{
          const response = await fetch('http://localhost:8000/api/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'username': e.target.username.value,
              'password': e.target.password.value
            })
        })
        const data = await response.json()
        if(response.status === 200){
          setAuthTokens(data)
          setUser(jwt_decode(data.access))
          localStorage.setItem('authTokens', JSON.stringify(data))
        }
        else{
          alert('Something went wrong with the login api call')
          //TODO: ERROR HANDLING
        }
      }catch(err){
        console.log(err)
        //TODO: ERROR HANDLING
      }}

      //BEGIN LOGOUT FUNCTION
      const logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
      }

      //BEGIN REFRESH
      const updateToken= async () =>{
        console.log('updating token')
        try{
          const response = await fetch('http://localhost:8000/api/auth/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
          })
          const data = await response.json()
          if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
          }
          else{
            logoutUser();
            //TODO: FIGURE OUT MESSAGE TO USER IF THIS BOMBS
          }
        }catch(err){
          console.log(err)
          //TODO: ERROR HANDLING
        }
      }

      //TO CALL REFRESH FUNCTION BEFORE 5MIN UP
      useEffect(()=>{
        const fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return()=>clearInterval(interval)
      },[authTokens, loading])
    
    //THIS VARIABLE PASSES THE INFORMATION TO USE WITH USECONTEXT (VARIABLES ON TOP/FUNCTIONS ON THE BOTTOM)
    const contextData={
        user:user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        )
}