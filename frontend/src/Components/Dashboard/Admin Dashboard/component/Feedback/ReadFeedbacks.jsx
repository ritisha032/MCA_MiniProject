// Your component code with added console logs
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ReactRating from "react-rating";
import axios from "axios";
import { useAuth } from "../../../../../context/auth";

const ReadFeedbacks = () => {
  const [completedFeedback, setCompletedFeedback] = useState([]);
  const auth = useAuth();
  const messId = useAuth()[0].user.messId;
  console.log("mess id= ",messId);
  

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/admin/getFeedbacks/${messId}`
        );
        console.log(response.data.feedbacks);
        setCompletedFeedback(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [messId]);

  // Filter completed feedbacks to display only those marked as read
  const readFeedbacks = completedFeedback.filter(
    (feedback) => feedback.status === "read"
  );

  console.log("Read Feedbacks:", readFeedbacks); // Log read feedbacks for debugging

  return (
    <div className="tab-content">
      {/* Display completed feedback in a table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Room No</th>
            <th>Feedback</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {readFeedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.name}</td>
              <td>{feedback.roomNumber}</td>{" "}
              {/* Use 'roomNumber' instead of 'roomNo' */}
              <td
                style={{
                  width: "200px",
                  maxHeight: "100px",
                  overflow: "auto",
                  wordWrap: "break-word",
                }}
              >
                {feedback.feedbackText}{" "}
                {/* Use 'feedbackText' instead of 'feedback' */}
              </td>
              <td>
                {/* Log initialRating for debugging */}
                {console.log("Rating:", feedback.rating)}
                <ReactRating
                  readonly
                  initialRating={feedback.rating || 0}
                  emptySymbol="☆"
                  fullSymbol="★"
                />
                {feedback.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReadFeedbacks;
