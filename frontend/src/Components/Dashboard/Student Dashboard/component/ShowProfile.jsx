import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function StudentProfile() {
    // Define state variables to hold the student's name and room number
    const [studentName, setStudentName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');

    // Fetch the student's data from the backend
    useEffect(() => {
        // Fetch student data from the backend
        // Replace 'your-api-endpoint' with the actual API endpoint
        fetch('/api/student/profile')
            .then(response => response.json())
            .then(data => {
                // Update the state variables with the fetched data
                setStudentName(data.name);
                setRoomNumber(data.roomNumber);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    }, []); // The empty dependency array ensures the effect runs only once when the component mounts

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    {/* Create a Bootstrap card */}
                    <Card>
                        <Card.Body>
                            {/* Display the student's name and room number */}
                            <Card.Title style={{ fontSize: '2rem', textAlign: 'center' }}>
                                {studentName}
                            </Card.Title>
                            <Card.Text style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                                {roomNumber}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentProfile;
