import React from 'react';
import { Button, Table } from 'react-bootstrap';
import ReactRating from 'react-rating'; // Import react-rating

const Pending = ({ pendingFeedback, handleRatingChange, handleMarkAsReviewed }) => {
  return (
    <div className="tab-content">
      {/* Display pending feedback in a table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Time</th>
            <th>Rating</th> {/* New column for rating */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingFeedback.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.name}</td>
              <td>{feedback.rollNo}</td>
              <td
                style={{
                  width: '200px', // Fixed width
                  maxHeight: '100px', // Maximum height
                  overflow: 'auto', // Enable scrolling if content overflows
                  wordWrap: 'break-word', // Allow text to wrap within the cell
                }}
              >
                {feedback.feedback}
              </td>
              <td>{feedback.date}</td>
              <td>{feedback.time}</td>
              <td>
                {/* Emoji rating input */}
                <ReactRating
                  initialRating={feedback.rating || 0} // Default rating if not set
                  onChange={(newRating) => handleRatingChange(index, newRating)}
                  emptySymbol="😐" // Emoji for empty rating
                  fullSymbol="😊" // Emoji for full rating
                  fractions={2} // Allow half emojis
                />
              </td>
              <td>
                {/* Button for marking the feedback as reviewed */}
                <Button variant="success" onClick={() => handleMarkAsReviewed(index)}>
                  Mark as Reviewed
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Pending;
