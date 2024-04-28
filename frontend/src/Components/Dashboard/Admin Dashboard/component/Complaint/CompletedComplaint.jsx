import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../../../../../context/auth";
const CompletedComplaint = () => {
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const messId=useAuth()[0].user.messId;


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
  }, []);

  return (
    <div>
      <h2>Resolved Complaints</h2>
      {resolvedComplaints.map(complaint => (
        <div key={complaint._id}>
          {/* Render the details of the resolved complaint */}
          <p>Name: {complaint.name}</p>
          <p>Room Number: {complaint.roomNumber}</p>
          <p>Complaint Type: {complaint.complaintType}</p>
          <p>Complaint Text: {complaint.complaintText}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CompletedComplaint;
