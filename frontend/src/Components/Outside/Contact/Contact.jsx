import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Contact() {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // State for submission status
    const [submitted, setSubmitted] = useState(false);

    // Use navigate hook
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to a server
        console.log(formData);
        setSubmitted(true);
        // Reset form data
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    // Use effect to navigate to /home after 4 seconds of successful submission
    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                navigate('/home');
            }, 2000); // 4 seconds delay

            // Cleanup function to clear the timer if needed
            return () => clearTimeout(timer);
        }
    }, [submitted, navigate]);

    return (
        <Container
            fluid
            className="contact-bg"
            style={{
                backgroundImage: 'url("/path/to/contactuspage.jpg")', // Path to background image
                backgroundSize: 'cover', // Resize image to cover the container
                padding: '50px 0' // Add padding for space
            }}
        >
            <Container className="bg-white p-5 rounded shadow">
                <Row className="justify-content-center mb-4">
                    <Col md={8} className="text-center">
                        <h2>Contact Us</h2>
                        <p className="text-muted">
                            We'd love to hear from you! Fill out the form below to get in touch.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}>
                        {submitted && (
                            <Alert variant="success">
                                Thanks for contacting us! We'll get back to you soon.
                            </Alert>
                        )}
                        <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                            {/* Name field */}
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                />
                            </Form.Group>

                            {/* Email field */}
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </Form.Group>

                            {/* Message field */}
                            <Form.Group controlId="message" className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your message"
                                />
                            </Form.Group>

                            {/* Submit button */}
                            <Button variant="primary" type="submit" className="w-100">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Contact;
