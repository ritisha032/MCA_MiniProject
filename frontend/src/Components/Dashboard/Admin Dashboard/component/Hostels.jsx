import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import MessMenu from '../../../Menu/MessMenu';
import GoBack from './GoBack';
// import MessMenu from '';

const hostels = [
    {
      id: 1,
      name: 'Hostel A',
      description: 'A cozy hostel with modern amenities.',
    },
    {
      id: 2,
      name: 'Hostel B',
      description: 'A vibrant hostel in the heart of the city.',
    },
    {
      id: 3,
      name: 'Hostel C',
      description: 'A budget-friendly hostel with friendly staff.',
    },
  ];
  
  function App() {
    // Define state for selected hostel
    const [selectedHostel, setSelectedHostel] = useState(null);
  
    // Handle hostel box click
    const handleBoxClick = (hostel) => {
      // Set the selected hostel in the state
      setSelectedHostel(hostel);
    };
  
    // If a hostel is selected, render the MessMenu component for the selected hostel
    if (selectedHostel) {
      return (
        <Container>
            <GoBack/>
          <MessMenu hostel={selectedHostel} />
        </Container>
      );
    }
  
    // Otherwise, render the list of hostels
    return (
      <Container>
        <Row>
          {hostels.map((hostel) => (
            <Col key={hostel.id} md={4}>
              <Card onClick={() => handleBoxClick(hostel)} className="mb-4">
                <Card.Body>
                  <Card.Title>{hostel.name}</Card.Title>
                  <Card.Text>{hostel.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
  
  export default App;