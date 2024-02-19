// App.js

import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './index.css';

const App = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <SignInForm setSignUpMode={setSignUpMode} />
          <SignUpForm setSignUpMode={setSignUpMode} />
        </div>
      </div>
      <div className="panels-container">
      <LeftPanel setSignUpMode={setSignUpMode} />
      <RightPanel setSignUpMode={setSignUpMode} />
      </div>
    </div>
  );
};

export default App;
