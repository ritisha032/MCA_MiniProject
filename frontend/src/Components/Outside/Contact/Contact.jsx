import React, { useState, useEffect } from 'react';
import './style.css'; // Import CSS file for styling
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (submitted) {
      // Show alert
      alert('Thanks for contacting!');
      // Redirect to home page after showing alert
      navigate('/');
    }
  }, [submitted, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, for example send the data to a server
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Set submitted to true to trigger useEffect
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <Footer />
    </div>
  );
}

export default Contact;
