import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // Import CSS file for styling
import Footer from '../Footer/Footer';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/password/forgot-password`, {
        email,
      });
      console.log("response= ",response.data);
      
      setMessage(response.data);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };
  
  return (
    <div className='for-wholepage'>
    
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleInputChange} />
          </label>
          <button type="submit">Forgot Password</button>
        </form>
        {/* Display message */}
        {message && (
          <div className={`alert ${message.includes('error') ? 'alert-danger' : 'alert-success'}`} role="alert">
            {message}
          </div>
        )}
        <p>
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default Forgot;
