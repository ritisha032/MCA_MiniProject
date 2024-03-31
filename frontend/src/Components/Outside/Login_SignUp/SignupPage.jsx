import React, { useState } from 'react';
import Footer from '../Footer/Footer';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    hostel: '',
    file: null,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (formData.name && formData.email && formData.gender && formData.hostel && formData.file) {
      // Perform form submission or validation logic here
      console.log(formData);

      // Show success message
      setSuccessMessage('You have successfully signed up!');

      // Reset form data if needed
      setFormData({
        name: '',
        email: '',
        gender: '',
        hostel: '',
        file: null,
      });

      // Clear any previous error message
      setErrorMessage('');
    } else {
      // Show error message
      setErrorMessage('Please fill out all fields.');

      // Clear any previous success message
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit} className='form-container'>
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
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        {formData.gender && (
          <label>
            Hostel:
            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select hostel</option>
              {formData.gender === 'male' ? (
                <>
                  <option value="Raman_Hostel">Raman Hostel</option>
                  <option value="Tilak_Hostel">Tilak Hostel</option>
                  <option value="Tagore_Hostel">Tagore Hostel</option>
                  <option value="Tandon_Hostel">Tandon Hostel</option>
                  <option value="Malviya_Hostel">Malviya Hostel</option>
                </>
              ) : (
                <>
                  <option value="PG_Hostel">PG hostel</option>
                  <option value="hostelD">Hostel D</option>
                </>
              )}
            </select>
          </label>
        )}

        <label>
          Upload College ID-card:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>
        Already signed up? <a href="/login">Sign in</a>
      </p>
      <Footer/>
    </div>
  );
};

export default SignupPage;
