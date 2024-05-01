import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../../../context/auth';

const FeedbackAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [auth, setAuth] = useAuth();
  const messId = useAuth()[0].user.messId;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/getFeedbacks/${messId}`);
        setReviews(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [messId]);

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
      <Row>
        {reviews.map((review, index) => (
          review.status === 'unread' && (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Header as="h5">{review.name}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Room Number:</strong> {review.roomNo}
                  </Card.Text>
                  <Card.Text>
                    <strong>Rating:</strong> {review.rating}
                  </Card.Text>
                  <Card.Text>
                    <strong>Feedback:</strong> {review.feedbackText}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleMarkAsRead(review._id)}>Mark as Read</Button>
                </Card.Body>
              </Card>
            </Col>
          )
        ))}
      </Row>
    </div>
  );
};

export default FeedbackAdmin;
