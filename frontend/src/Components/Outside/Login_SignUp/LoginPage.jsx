import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    // Replace this with your actual authentication logic
    const adminCredentials = {
      username: 'admin',
      password: 'admin123',
    };

    if (formData.username && formData.password) {
      if (formData.username === adminCredentials.username && formData.password === adminCredentials.password) {
        onLogin('Admin');
        navigate('/admin'); // Redirect to admin page
      } else {
        onLogin('Student');
        navigate('/student'); // Redirect to student page
      }
    } else {
      alert('Invalid credentials. Please fill out all fields.');
    }
  };

  return (
    <div className='login-container'>
      <h2>Login Page</h2>
      <label>
        Username:
        <input type="text" name="username" onChange={handleInputChange} />
      </label>

      <label>
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>

      <button onClick={handleLogin}>Login</button>

      <p>
        <Link to="/forgot-password">Forgot Password or email?</Link>
      </p>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>

      <Footer/>
    </div>
  );
};

export default LoginPage;
