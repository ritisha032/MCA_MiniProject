import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Adduser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    selectedMess: '',
    roomNo: '',
    phoneNo: '',
    address: '',
  });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch mess name from local storage
    const auth = JSON.parse(localStorage.getItem('auth'));
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
        // Clear the form after successful submission
        setFormData({
          name: '',
          email: '',
          password: '',
          selectedMess: '',
          roomNo: '',
          phoneNo: '',
          address: '',
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4">
            <div className="card-header">
              <h2 className="card-title">Add User</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter user name"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter user email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter user password"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Mess:</label>
                  <input
                    type="text"
                    name="selectedMess"
                    value={formData.selectedMess}
                    onChange={handleInputChange}
                    readOnly // Make the messName field uneditable
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Room Number:</label>
                  <input
                    type="text"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter user room number"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter user phone number"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter user address"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
