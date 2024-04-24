import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


function Complaint() {
    // Define state variables for form fields
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [complaintText, setComplaintText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Perform form submission logic here
        // For example, you could send the form data to a server
        setIsSubmitted(true);

        // Reset form fields after submission (optional)
        setName('');
        setRoomNumber('');
        setComplaintType('');
        setComplaintText('');
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
