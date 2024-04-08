import React, { useState } from 'react';
import './nav-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // Import the faRightFromBracket icon

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="navbar">
      <h1 className="cool-font">Admin</h1>
      <div className="profile-dropdown" onClick={toggleLogout}>
        <FontAwesomeIcon
          icon={faRightFromBracket} // Use the faRightFromBracket icon
          className={`profile-icon ${showLogout ? 'dark' : ''}`}
        />
        {showLogout && (
          <div className="dropdown-content">
            {/* Your logout dropdown content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
