// OtpComponent.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const { formData } = location.state;
  console.log(formData);
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/user/register`, {
        ...formData,
        otp: otp
      });
      console.log("response= ",response);

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

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            required
            placeholder='Enter OTP'
          />
        </label>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default OTP;
