import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateComponents/PrivateRoutes';
import NavBar from './NavBarComponent/Nav';
import Login from './LoginComponent/LoginComponent';
import Register from './RegisterComponent/RegisterComponent';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/login" element={<Login/>} exact/>
          <Route path="/register" element={<Register/>} exact/>
          <Route path='/' element={<PrivateRoutes/>} exact/>
        </Routes>
      </Router>

      
      {/* <h1>Foster Journey</h1>
      <h2>About:</h2>
      <p>Foster journey is an online journal designed to help foster youth keep track of the placements they have visited throughout their individual journeys. Users can create entries for each placement they can later refer back to while trying to track their own personal history through the care system which can often be a difficult task given the vast number of locations, caregivers and short-duration stays they may encounter.</p>
 */}
    </div>
  );
}

export default App;
