import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../../../../context/auth";

const ComplaintAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const user = useAuth()[0].user; // Assuming useAuth() returns [user, setUser]

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/getComplaints/${user.messId}`);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      }
    };

    if (user && user.messId) {
      fetchComplaints();
    }
  }, [user]);

  const markAsResolved = async (complaintId) => {
    try {
     const response= await axios.put(`${process.env.REACT_APP_API}/api/admin/updateComplaint/${complaintId}`, { status: 'resolved' });
     const updatedComplaints = complaints.filter(complaint => complaint._id !== complaintId);
    setComplaints(updatedComplaints);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Complaints Admin</h2>
      {complaints.map(complaint => (
        <div key={complaint._id}>
          <p>
            <strong>Name:</strong> {complaint.name}<br />
            <strong>Room No:</strong> {complaint.roomNumber}<br />
            <strong>Type:</strong> {complaint.complaintType}<br />
            <strong>Complaint:</strong> {complaint.complaintText}
          </p>
          {complaint.status === 'unresolved' && (
            <button onClick={() => markAsResolved(complaint._id)}>Mark as Resolved</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintAdmin;
