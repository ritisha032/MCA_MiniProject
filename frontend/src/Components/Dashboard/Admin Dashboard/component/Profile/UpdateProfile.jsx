// src/components/MessManagerProfile.js

import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const MessManagerProfile = () => {
    // State to hold the form inputs and profile information
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [profileInfo, setProfileInfo] = useState(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Update profile information with form data
        setProfileInfo(formData);
        // Reset the form fields
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: ''
        });
    };

    return (
        <Container>
            <h1 className="my-4">Mess Manager Profile</h1>
            {/* Form for mess manager profile */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                    />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {/* Display profile information if available */}
            {profileInfo && (
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>Profile Information</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong> {profileInfo.name} <br />
                            <strong>Email:</strong> {profileInfo.email} <br />
                            <strong>Phone:</strong> {profileInfo.phone} <br />
                            <strong>Address:</strong> {profileInfo.address}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default MessManagerProfile;
