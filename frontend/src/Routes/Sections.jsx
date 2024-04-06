import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../Components/Outside/Login_SignUp/LoginPage';
import AdminPage from '../Components/Outside/Login_SignUp/AdminPage';
import StudentPage from '../Components/Outside/Login_SignUp/StudentPage';
import SignupPage from '../Components/Outside/Login_SignUp/SignupPage';
import './style.css'
import Landing from '../Components/Outside/Front Page/Landing';
import Contact from '../Components/Outside/Contact/Contact';
import Reset from '../Components/Outside/ResetPassword/Reset';

const Routers = () => {
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <>
    
    
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<Reset/>}/>
      </Routes>
    
    </>
  );
};

export default Routers;
