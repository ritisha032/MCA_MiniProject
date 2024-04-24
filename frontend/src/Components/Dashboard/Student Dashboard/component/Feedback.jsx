import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


function FeedbackForm() {
    // Define state variables for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [rating, setRating] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Perform form submission logic here
        // For example, you could send the form data to a server

        // Reset form fields after submission (optional)
        setName('');
        setEmail('');
        setRoomNumber('');
        setRating('');
        setFeedbackText('');

        setIsSubmitted(true);

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
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Email input */}
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Room number input */}
                <Form.Group controlId="formRoomNumber" className="mb-3">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your room number"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Rating select */}
                <Form.Group controlId="formRating" className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    >
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
