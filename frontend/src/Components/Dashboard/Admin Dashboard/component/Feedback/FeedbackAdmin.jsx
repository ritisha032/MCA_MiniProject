import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Pending from './Pending';
import Completed from './Completed';

const Feedback = () => {
  // Sample pending feedback data
  const [pendingFeedback, setPendingFeedback] = useState([
    {
      name: 'John Doe',
      rollNo: '12345',
      feedback: 'Great class, more practical examples.fnskjbn;dskjbskjbGreat class, more practical examples.fnskjbn;dskjbskjbGreat class, more practical examples.fnskjbn;dskjbskjbGreat class, more practical examples.fnskjbn;dskjbskjb fnb h kjsbvkjdfsb but could use more practical examples.fnskjbn;dskjbskjb fnb h kjsbvkjdfsbk;jsbkjsdb kj kj jdnvjsdnbkjs ',
      date: '2024-04-25',
      time: '10:00 AM',
      rating: 0,
    },
    {
      name: 'Jane Smith',
      rollNo: '67890',
      feedback: 'The course was well-structured and informative.',
      date: '2024-04-26',
      time: '02:00 PM',
      rating: 0,
    },
    // Add more feedback entries as needed
  ]);

  // Sample completed feedback data
  const [completedFeedback, setCompletedFeedback] = useState([
    {
      name: 'Alice Johnson',
      rollNo: '11223',
      feedback: 'Excellent course, learned a lot!',
      dateReviewed: '2024-04-25',
      timeReviewed: '11:00 AM',
      rating: 5,
    },
    {
      name: 'Bob Williams',
      rollNo: '33445',
      feedback: 'Very informative and well-paced.',
      dateReviewed: '2024-04-26',
      timeReviewed: '03:00 PM',
      rating: 4.5,
    },
    // Add more feedback entries as needed
  ]);

  // Function to handle rating changes in pending feedback
  const handleRatingChange = (index, newRating) => {
    const updatedFeedback = [...pendingFeedback];
    updatedFeedback[index].rating = newRating;
    setPendingFeedback(updatedFeedback);
  };

  // Function to handle marking pending feedback as reviewed
  const handleMarkAsReviewed = (index) => {
    // Move feedback from pending to completed
    const feedbackToMark = pendingFeedback[index];
    const updatedPendingFeedback = pendingFeedback.filter((_, i) => i !== index);
    setPendingFeedback(updatedPendingFeedback);

    const updatedCompletedFeedback = [
      ...completedFeedback,
      {
        ...feedbackToMark,
        dateReviewed: new Date().toLocaleDateString(),
        timeReviewed: new Date().toLocaleTimeString(),
      },
    ];
    setCompletedFeedback(updatedCompletedFeedback);
  };

  return (
    <div>
      <h2>Feedback Page</h2>
      <Tabs defaultActiveKey="pendingFeedback" id="feedback-tabs">
        <Tab eventKey="pendingFeedback" title="Pending Feedback">
          <Pending pendingFeedback={pendingFeedback} handleRatingChange={handleRatingChange} handleMarkAsReviewed={handleMarkAsReviewed} />
        </Tab>
        <Tab eventKey="completedFeedback" title="Completed Feedback">
          <Completed completedFeedback={completedFeedback} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Feedback;
