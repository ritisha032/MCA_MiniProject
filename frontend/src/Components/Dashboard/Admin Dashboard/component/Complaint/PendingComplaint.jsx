import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const PendingComplaints = ({ pendingComplaints, handleMarkAsReviewed }) => {
    return (
        <Container>
            {pendingComplaints.map((complaint) => (
                <Card key={complaint.id} className="mb-3 shadow-sm">
                    <Card.Header className="bg-primary text-white">
                        <Row>
                            <Col><strong>Name:</strong> {complaint.name}</Col>
                            <Col><strong>Room:</strong> {complaint.room}</Col>
                            <Col><strong>Type:</strong> {complaint.type}</Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text><strong>Complaint:</strong> {complaint.text}</Card.Text>
                        <Button 
                            variant="success" 
                            onClick={() => handleMarkAsReviewed(complaint)}
                            className="float-end"
                        >
                            Mark as Reviewed
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default PendingComplaints;
