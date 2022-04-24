import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoutes from './PrivateComponents/PrivateRoutes';
import NavBar from './NavBarComponent/Nav';
import Login from './LoginComponent/LoginComponent';
import About from './About/About';
import Register from './RegisterComponent/RegisterComponent';
import Account from './PrivateComponents/Account/Account';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        {/* WRAP ALL COMPONENTS YOU WANT TO USE AUTHPROVIDER VALUE IN AUTHPROVIDER TAGS */}
        <AuthProvider>
          <header className="app-header">
            <h1 id="app-title">Foster Journey</h1>
            <img id="footprints-image" src={process.env.PUBLIC_URL + 'img/footprints.png'}/>
          </header>
          <Routes>
            <Route path="/" element={<About/>} exact/>
            {/* <Route path="/login" element={<Login/>} exact/> */}
            <Route path="/register" element={<Register/>} exact/>
            <Route path="/account" element={<Account/>} exact/>
            <Route path='*' element={<PrivateRoutes/>} exact/>
          </Routes>
          {/* <NavBar/> */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
