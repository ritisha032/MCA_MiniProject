import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'; // Import axios for making HTTP requests
import { useAuth } from "../../../../context/auth";

function FeedbackForm() {
  const user = useAuth()[0].user; // Destructure user directly from auth

  const [rating, setRating] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Send data to backend API
      const response=await axios.post(`${process.env.REACT_APP_API}/api/user/addFeedback`, {
        name: user.name,
        email: user.email,
        roomNumber: user.roomNo,
        rating: parseInt(rating), // Convert rating to integer
        feedbackText: feedbackText,
        messId: user.messId // Fetch messId from user object
      });

      // Reset form fields after successful submission
      setRating('');
      setFeedbackText('');
      setIsSubmitted(true); // Show success message
    } catch (error) {
      // Handle error if submission fails
      console.error('Error submitting feedback:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <Container fluid style={{ height: '100%' }}>
      <h3>Feedback Form</h3>
      {isSubmitted && (
        <Alert variant="success" onClose={() => setIsSubmitted(false)} dismissible>
          Feedback submitted successfully!
        </Alert>
      )}
      <Form onSubmit={handleFormSubmit}>
        {/* Name input */}
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={user.name} readOnly />
        </Form.Group>

        {/* Email input */}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user.email} readOnly />
        </Form.Group>

        {/* Room number input */}
        <Form.Group controlId="formRoomNumber" className="mb-3">
          <Form.Label>Room Number</Form.Label>
          <Form.Control type="text" value={user.roomNo} readOnly />
        </Form.Group>

        {/* Rating select */}
        <Form.Group controlId="formRating" className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select value={rating} onChange={(e) => setRating(e.target.value)} required>
            <option value="">Select a rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </Form.Select>
        </Form.Group>

        {/* Feedback text input */}
        <Form.Group controlId="formFeedbackText" className="mb-3">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write your feedback here"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            required
          />
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit">
          Submit Feedback
        </Button>
      </Form>
    </Container>
  );
}

export default FeedbackForm;
