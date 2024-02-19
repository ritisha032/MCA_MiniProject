import React from 'react';


const RightPanel = ({ setSignUpMode }) => {
  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div className="panel right-panel">
      <div className="content">
        <h3>One of us ?</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
        <button className="btn transparent" onClick={handleSignInClick}>Sign in</button>
      </div>
      <img src="img/register.svg" className="image" alt="" />
    </div>
  );
};

export default RightPanel;
