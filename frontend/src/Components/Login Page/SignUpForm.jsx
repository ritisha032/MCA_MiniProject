// SignUpForm.jsx

import React, { useState } from 'react';

const SignUpForm = ({ setSignUpMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleSignUpClick = (e) => {
    e.preventDefault();

    // Perform signup logic here
    // For example, you can send a request to your server to handle user signup
    // Include the 'gender' in the signup data

    // After successful signup, you can switch to the sign-in mode
    setSignUpMode(false);

    // Optionally, you can also clear the form fields
    setUsername('');
    setEmail('');
    setPassword('');
    setGender('');
  };

  return (
    <form onSubmit={handleSignUpClick} className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label>Gender:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <input type="submit" className="btn" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        {/* ... (social media icons) */}
      </div>
    </form>
  );
};

export default SignUpForm;
