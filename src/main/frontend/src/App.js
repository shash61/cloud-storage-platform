import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AuthContainer from './components/auth/AuthContainer';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/notfound/NotFound';
import SignUp from './components/signup/SignUp';




function App() {
  

 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*"  element={<NotFound/>}/>
        <Route path="/" element={<Home/>}>
        <Route path='auth' element={<AuthContainer/>} />
        </Route>
      </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
