import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from "../Outside/Footer/Footer";

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
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching messes:', error);
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

      console.log("response= ",response);

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
    <div className='wholepage'>
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
    </div>
  );
};

export default SignupPage;
