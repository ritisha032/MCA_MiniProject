import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../../../../context/auth";

const CompletedComplaint = () => {
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const messId = useAuth()[0].user.messId;

  useEffect(() => {
    const fetchResolvedComplaints = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/getComplaints/${messId}`);
        const complaints = response.data.complaints;
        const resolvedComplaints = complaints.filter(complaint => complaint.status === 'resolved');
        setResolvedComplaints(resolvedComplaints);
      } catch (error) {
        console.error('Error fetching resolved complaints:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchResolvedComplaints();
  }, [messId]);

  return (
    <div className="container">
      <h2 className="my-4">Resolved Complaints</h2>
      {resolvedComplaints.map(complaint => (
        <div key={complaint._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title"><strong>Name:</strong> {complaint.name}</h5>
            <p className="card-text"><strong>Room Number:</strong> {complaint.roomNumber}</p>
            <p className="card-text"><strong>Complaint Type:</strong> {complaint.complaintType}</p>
            <p className="card-text"><strong>Complaint Text:</strong> {complaint.complaintText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedComplaint;
