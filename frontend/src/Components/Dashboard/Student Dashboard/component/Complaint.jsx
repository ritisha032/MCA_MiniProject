import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'; // Import Axios
import { useAuth } from '../../../../context/auth'; // Import useAuth hook

function Complaint() {
    // Get user data from useAuth hook
    const { user } = useAuth()[0];

    // Define state variables for form fields
    const [complaintType, setComplaintType] = useState('');
    const [complaintText, setComplaintText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Prepare form data including user's name and room number
        const formData = {
            name: user.name,
            roomNumber: user.roomNo,
            complaintType: complaintType,
            complaintText: complaintText,
            messId: user.messId // Include messId in form data
        };

        try {
            // Make Axios POST request to API endpoint
            const response = await axios.post(`${process.env.REACT_APP_API}/api/user/complaint`, formData);
            
            console.log("response= ", response);
            // If successful, set submission state to true
            setIsSubmitted(true);

            // Reset form fields after successful submission (optional)
            setComplaintType('');
            setComplaintText('');
        } catch (error) {
            // Handle error, show error message, etc.
            console.error('Error submitting complaint:', error);
        }
    };

    return (
        <Container>
            <h3>Complaint Box</h3>
            {isSubmitted && (
                <Alert variant="success" onClose={() => setIsSubmitted(false)} dismissible>
                    Complaint submitted successfully!
                </Alert>
            )}
            <Form onSubmit={handleFormSubmit}>
                {/* Form inputs */}
                {/* Name input */}
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.name}
                        readOnly // Make the field non-editable
                    />
                </Form.Group>

                {/* Room number input */}
                <Form.Group controlId="formRoomNumber" className="mb-3">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={user.roomNo}
                        readOnly // Make the field non-editable
                    />
                </Form.Group>

                {/* Complaint type select */}
                <Form.Group controlId="formComplaintType" className="mb-3">
                    <Form.Label>Type of Complaint</Form.Label>
                    <Form.Select
                        value={complaintType}
                        onChange={(e) => setComplaintType(e.target.value)}
                        required
                    >
                        <option value="">Select a type</option>
                        <option value="food">Food Related</option>
                        <option value="staff">Staff Related</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </Form.Group>

                {/* Complaint text input */}
                <Form.Group controlId="formComplaintText" className="mb-3">
                    <Form.Label>Complaint</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Write your complaint here"
                        value={complaintText}
                        onChange={(e) => setComplaintText(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Send button */}
                <Button variant="primary" type="submit">
                    Send Complaint
                </Button>
            </Form>
        </Container>
    );
}

export default Complaint;
