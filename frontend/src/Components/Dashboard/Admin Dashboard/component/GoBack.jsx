import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous route in the history
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <Button variant="primary" onClick={handleGoBack}>
        Back
      </Button>
    </div>
  );
};

export default GoBack;
