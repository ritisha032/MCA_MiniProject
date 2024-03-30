import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  useEffect(() => {
    const background = document.querySelector('.background-image');
    if (background) {
      background.classList.add('fade-in');
    }
  }, []);


    const currentYear = new Date().getFullYear();
  

  return (
    <div className="background-image">
      <div className="welcome-text">Welcome</div>
      <div className="button-container">
        <Link to="/contact"><button className="button">Contact</button></Link>
        <Link to="/login"><button className="button">Login</button></Link>
      </div>
      {/* <h1>Landing Page</h1> */}
      <footer>
        <p>
          © {currentYear} MNNIT. All rights reserved.
          </p>
    </footer>
    </div>
  );
}

export default Landing;
