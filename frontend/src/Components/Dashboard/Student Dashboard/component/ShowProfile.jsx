import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useAuth } from "../../../../context/auth";

function StudentProfile() {
    // Access the auth object from the context
    const { auth } = useAuth();

    const user = localStorage.getItem("auth");
    const parsedData = JSON.parse(user);

    // Define state variables to hold the student's name, hostel name, and room number
    const [studentName, setStudentName] = useState('');
    const [hostelName, setHostelName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');

    useEffect(() => {
        setStudentName(parsedData.user.name);
        setHostelName(parsedData.messName);
        setRoomNumber(parsedData.user.roomNo);
    }, []);

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    {/* Create a Bootstrap card */}
                    <Card>
                        <Card.Body>
                            {/* Display the student's name, hostel name, and room number */}
                            <Card.Title style={{ fontSize: '2rem', textAlign: 'center' }}>
                                Hello {studentName}
                            </Card.Title>
                            <Card.Text style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                                Hostel Name: {hostelName}
                            </Card.Text>
                            <Card.Text style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                                Room Number: {roomNumber}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentProfile;
