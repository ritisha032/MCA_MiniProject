import React, { useState } from 'react';
import { Tabs, Tab, Container, Card, Row, Col, Button } from 'react-bootstrap';
import PendingComplaints from './PendingComplaint';
import CompletedComplaints from './CompletedComplaint';

const ComplaintAdmin = () => {
    // State to manage pending and completed complaints
    const [pendingComplaints, setPendingComplaints] = useState([
        { id: 1, name: 'John Doe', room: '101', text: 'Leaky faucet' },
        { id: 2, name: 'Jane Smith', room: '102', text: 'Broken heater' },
        { id: 3, name: 'Alice Brown', room: '103', text: 'Stuck door' },
    ]);

    const [completedComplaints, setCompletedComplaints] = useState([]);

    // Function to handle marking a complaint as reviewed
    const handleMarkAsReviewed = (complaint) => {
        // Remove the complaint from the pending list
        const updatedPendingComplaints = pendingComplaints.filter(
            (comp) => comp.id !== complaint.id
        );
        setPendingComplaints(updatedPendingComplaints);

        // Add the complaint to the completed list
        setCompletedComplaints([...completedComplaints, complaint]);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Complaint Page</h2>
            <Tabs defaultActiveKey="pending" className="mb-3" fill>
                {/* Pending Complaints Tab */}
                <Tab eventKey="pending" title="Pending Complaints">
                    <PendingComplaints
                        pendingComplaints={pendingComplaints}
                        handleMarkAsReviewed={handleMarkAsReviewed}
                    />
                </Tab>

                {/* Completed Complaints Tab */}
                <Tab eventKey="completed" title="Completed Complaints">
                    <CompletedComplaints completedComplaints={completedComplaints} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default ComplaintAdmin;
    