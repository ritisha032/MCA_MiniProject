import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../../../Outside/Footer/Footer';

const Adduser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    selectedMess: '',
    roomNo: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch mess name from local storage
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      setFormData({ ...formData, selectedMess: auth.messName });
    }
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
        // Navigate to the "dashboard/admin/users" page after successful user addition
        navigate('/dashboard/admin/users');
        // Optionally, you can clear the form after successful submission
        setFormData({
          name: '',
          email: '',
          password: '',
          selectedMess: '',
          roomNo: '',
        });
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
          <h2>Add User</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder='Enter user name'
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
              placeholder='Enter user email'
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
              placeholder='Enter user password'
            />
          </label>

          <label>
            Mess:
            <input
              type="text"
              name="selectedMess"
              value={formData.selectedMess}
              onChange={handleInputChange}
              readOnly // Make the messName field uneditable
            />
          </label>

          <label>
            Room Number:
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleInputChange}
              required
              placeholder='Enter user room number'
            />
          </label>

          <button type="submit">Add User</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Footer />
      </div>
    </div>
  );
};

export default Adduser;
