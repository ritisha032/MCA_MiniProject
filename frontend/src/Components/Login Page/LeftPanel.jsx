import React from 'react';

const LeftPanel = ({ setSignUpMode }) => {
  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  return (
    <div className="panel left-panel">
      <div className="content">
        <h3>New here ?</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
        <button className="btn transparent" onClick={handleSignUpClick}>Sign up</button>
      </div>
      <img src="img/log.svg" className="image" alt="" />
    </div>
  );
};

export default LeftPanel;
