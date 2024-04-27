import React from 'react';
import { Table } from 'react-bootstrap';
import ReactRating from 'react-rating'; // Import react-rating

const Completed = ({ completedFeedback }) => {
  return (
    <div className="tab-content">
      {/* Display completed feedback in a table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Feedback</th>
            <th>Date Reviewed</th>
            <th>Time Reviewed</th>
            <th>Rating</th> {/* New column for rating */}
          </tr>
        </thead>
        <tbody>
          {completedFeedback.map((feedback, index) => (
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
              <td>{feedback.dateReviewed}</td>
              <td>{feedback.timeReviewed}</td>
              <td>
                {/* Display the rating using stars */}
                <ReactRating
                  readonly // Disable rating for completed feedback
                  initialRating={feedback.rating || 0} // Display the rating
                  emptySymbol="☆" // Empty star symbol
                  fullSymbol="★" // Full star symbol
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Completed;
