import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../../../context/auth';

const FeedbackAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [auth, setAuth] = useAuth();
  const messId = useAuth()[0].user.messId;
  console.log("mess id= ",messId);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/getFeedbacks/${messId}`);
        console.log("feedback response= ",response);
        setReviews(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [messId]); // Include messId in the dependency array to fetch data whenever it changes

  const handleMarkAsRead = async (feedbackId) => {
    try {
      // Make a request to update the status of the feedback to 'read'
      await axios.put(`${process.env.REACT_APP_API}/api/admin/updateFeedback/${feedbackId}`, { status: 'read' });

      // Update the reviews state to remove the feedback with the specified feedbackId
      setReviews(reviews.filter(review => review._id !== feedbackId));
    } catch (error) {
      console.error('Error marking feedback as read:', error);
    }
  };

  return (
    <div>
      <h2>Feedback Admin</h2>
      {reviews.map((review, index) => (
        review.status === 'unread' && (
          <div key={index}>
            <h3>{review.name}</h3>
            <p>Rating: {review.rating}</p>
            <p>Feedback: {review.feedbackText}</p>
            <Button variant="primary" onClick={() => handleMarkAsRead(review._id)}>Mark as Read</Button>
            {/* Render other review details as needed */}
          </div>
        )
      ))}
    </div>
  );
};

export default FeedbackAdmin;
