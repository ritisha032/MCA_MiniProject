import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });

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

    if (formData.username && formData.password && formData.role) {
       console.log("dvadvjbd");
      if (formData.role === 'Admin' && formData.username === adminCredentials.username && formData.password === adminCredentials.password) {
        onLogin(formData.role);
        navigate('/admin'); // Redirect to admin page
      } else if (formData.role === 'Student') {
        onLogin(formData.role);
        navigate('/student'); // Redirect to student page
      } else {
        alert('Invalid credentials. Please check your username, password, and role.');
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

      <label>
        Role:
        <select name="role" onChange={handleInputChange}>
          <option value="" disabled>Select role</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
        </select>
      </label>

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;
