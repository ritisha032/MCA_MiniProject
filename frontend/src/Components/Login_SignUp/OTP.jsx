import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Outside/Footer/Footer';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const { formData } = location.state;
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/user/register`, {
        ...formData,
        otp: otp,
      });

      console.log(response.data);

      if (response.data.success) {
        toast.success("Signup successful");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  // Define inline styles for the card
  const cardStyles = {
    backgroundColor: 'rgb(255 255 255 / 50%)', // White color with 70% opacity
    borderRadius: '8px', // Optional: adds rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: adds a subtle shadow
    padding: '16px', // Adds padding to the card
  };

  return (
    <div className='whole'>

        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-6">
              <div className="card" style={cardStyles}>
                <h2 className="text-center mb-4">OTP Verification</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="otp">OTP:</label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                      placeholder="Enter OTP"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default OTP;
