import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import CSS file for styling

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Regular expression for email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the email format is valid
    if (validateEmail(email)) {
      // Simulate sending a password reset link
      setMessage(`Password reset link has been sent to ${email}`);
      // Clear the email input
      setEmail('');
    } else {
      // If the email format is invalid, display an error message
      setMessage('Please enter a valid email address');
    }
  };

  return (
    <div className='wholepage'>   
        <div className="forgot-password-container">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={handleInputChange} />
            </label>
            <button type="submit">Reset Password</button>
          </form>
          {/* Display Bootstrap alert if message is not empty */}
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          <p>
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
    </div>
  );
};

export default Reset;
