import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import StudentPage from './StudentPage';
import SignupPage from './SignupPage';
import './index.css'

const App = () => {
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
