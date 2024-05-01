import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from "../Outside/Footer/Footer";
import Navbar from '../Outside/Navbar/Navbar';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    selectedMess: '',
    roomNo: '', // New state for room number
  });
  const [messes, setMesses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch messes from your API endpoint
    const fetchMesses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/mess/getMesses`);
        if (Array.isArray(response.data)) {
          setMesses(response.data); // Assuming the response is an array of objects
        } else {
          toast.error('Invalid response data:', response.data);
        }
      } catch (error) {
        toast.error('Error fetching messes:', error);
      }
    };
  
    fetchMesses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/user/register`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="wholepage">
      {/* <Navbar/> */}
      <div className="signup-container">
        <form onSubmit={handleSubmit} className='form-container'>
          <h2>Sign Up</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder='Enter your name'
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder='Enter your college email'
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder='Enter your password'
            />
          </label>

          <label>
            Mess:
            <select
              name="selectedMess"
              value={formData.selectedMess}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Mess</option>
              {messes.map(mess => (
                <option key={mess.messId} value={mess.messName}>{mess.messName}</option>
              ))}
            </select>
          </label>

          <label>
            Room Number:
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleInputChange}
              required
              placeholder='Enter your room number'
            />
          </label>

          <button type="submit">Submit</button>
          <p>
            Already signed up? <a href="/login">Sign in</a>
          </p>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Footer />
      </div>
      {/* Add CSS in the component itself */}
      <style jsx>{`
        /* CSS for Signup Page */
        .signup-container {
          display: flex;
          flex-direction: column; /* Stack elements vertically */
          justify-content: center; /* Center the form in the middle */
          align-items: center; /* Center items within the container */
          min-height: 80vh; /* Reduced height for the container */
          padding: 20px; /* Adjust padding as needed */
        }
      
        .form-container {
          max-width: 500px; /* Restrict form width */
          width: 100%; /* Make form take up full width within its container */
          margin-bottom: 20px; /* Add space below the form */
        }
      
        input, select, button {
          width: 100%; /* Make inputs and button take up the full width */
          padding: 10px; /* Add padding for better usability */
          margin-bottom: 10px; /* Adjust spacing between elements */
        }
      
        button {
          background-color: #007bff; /* Bootstrap primary color */
          color: white; /* White text */
          border: none; /* No border */
        }
      
        .error-message {
          color: red; /* Error message color */
          margin-bottom: 10px; /* Add space below the error message */
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
