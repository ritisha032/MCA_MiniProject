import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Unread = ({ unreadFeedback, handleMarkAsRead }) => {
  return (
    <div>
      <h3>Unread Feedback</h3>
      {unreadFeedback && unreadFeedback.map((feedback, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>{feedback.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Date: {feedback.date}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Time: {feedback.time}</Card.Subtitle>
            <Card.Text>{feedback.feedback}</Card.Text>
            <Button variant="primary" onClick={() => handleMarkAsRead(index)}>Mark as Read</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Unread;
