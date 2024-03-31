import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import Footer from '../Footer/Footer';
import image from './image1.png'; // Import your image

const Landing = () => {
  useEffect(() => {
    const background = document.querySelector('.background-image');
    if (background) {
      background.classList.add('fade-in');
    }
  }, []);

  return (
    <div className="background-image">
      <div className="welcome-text">Welcome</div>
      <div className="image-container">
        <img src={image} alt="Your Image" className="landing-image" />
      </div>
      <div className="button-container">
        <Link to="/contact"><button className="button">Contact</button></Link>
        <Link to="/login"><button className="button">Login</button></Link>
      </div>
      <Footer/>
    </div>
  );
}

export default Landing;
