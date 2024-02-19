// SignInForm.jsx

import React, { useState } from 'react';

const SignInForm = ({ setSignUpMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInClick = (e) => {
    e.preventDefault();

    // Perform sign-in logic here
    // For example, you can send a request to your server to handle user sign-in

    // After successful sign-in, you may want to redirect the user or perform other actions

    // For the sake of the example, just switching to sign-up mode
    setSignUpMode(true);

    // Optionally, you can also clear the form fields
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSignInClick} className="sign-in-form">
      <h2 className="title">Sign in</h2>
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
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        {/* ... (social media icons) */}
      </div>
      <button type="button" className="btn transparent" onClick={() => setSignUpMode(true)} id="sign-up-btn">
        Sign up
      </button>
    </form>
  );
};

export default SignInForm;
