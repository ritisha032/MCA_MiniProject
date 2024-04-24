import React, { useState } from 'react';
import Footer from '../Outside/Footer/Footer';
import { toast } from "react-toastify";
import axios from 'axios'; // Import axios here
import { useNavigate } from "react-router-dom";
import './index.css'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/user/register`,
        formData// Pass formData directly
      );

     
      if(response.data.success)
      {
          toast.success(response.data.message);
          navigate("/login");
      }
      else
      {
        toast.error(response.data.message);
      }
       
      }
     catch (error) {
      // If there's an error, display a toast with the error message
      
        toast.error('Something went wrong. Please try again later.');
      
    }
  };
  

  return (
    <div className='wholepage'>

        <div className="signup-container">
          {/* <h2 style={{color:'white ',fontSize:'40px'}}>Signup Page</h2> */}
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

            <button type="submit">Submit</button>
            <p>
            Already signed up? <a href="/login">Sign in</a>
          </p>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          
          <Footer/>
        </div>
    </div>
  );
};

export default SignupPage;
