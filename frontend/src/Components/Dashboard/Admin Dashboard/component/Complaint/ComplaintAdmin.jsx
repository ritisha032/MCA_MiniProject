import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../../../../context/auth";
import { Row, Col, Card, Button } from 'react-bootstrap';

const ComplaintAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const user = useAuth()[0].user;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/getComplaints/${user.messId}`);
        // Filter only unresolved complaints
        const unresolvedComplaints = response.data.complaints.filter(complaint => complaint.status === 'unresolved');
        setComplaints(unresolvedComplaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        // Handle error (e.g., show error message)
      }
    };
    

    if (user && user.messId) {
      fetchComplaints();
    }
  }, [user]);

  const markAsResolved = async (complaintId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/api/admin/updateComplaint/${complaintId}`, { status: 'resolved' });
      // Update the state to remove the resolved complaint
      setComplaints(complaints.filter(complaint => complaint._id !== complaintId));
    } catch (error) {
      console.error('Error marking complaint as resolved:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Complaints Admin</h2>
      
      <Row>
        {complaints.map((complaint) => (
          <Col md={4} key={complaint._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{complaint.name}</Card.Title>
                <Card.Text>
                  <strong>Room No:</strong> {complaint.roomNumber}<br />
                  <strong>Type:</strong> {complaint.complaintType}<br />
                  <strong>Complaint:</strong> {complaint.complaintText}
                </Card.Text>
                {complaint.status === 'unresolved' && (
                  <Button variant="success" onClick={() => markAsResolved(complaint._id)}>
                    Mark as Resolved
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ComplaintAdmin;
