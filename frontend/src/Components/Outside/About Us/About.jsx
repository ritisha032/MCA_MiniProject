import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    // Define inline styles for layout and components
    const aboutPageStyle = {
        display: 'flex',
        flexDirection: 'column',
        // Remove minHeight to avoid forcing full viewport height
    };

    const cardStyle = {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginBottom: '20px',
    };

    const cardButtonStyle = {
        backgroundColor: 'blue',
        color: 'white',
    };

    return (
        <div style={aboutPageStyle}>
            <Navbar />
            <Container className="mt-5" style={{ padding: '20px' }}>
                <h1>About Us</h1>
                <p>Welcome to MNNIT's Mess Management. Our goal is to provide students with healthy, nutritious, and affordable meals. We take pride in offering a variety of options to cater to different tastes and dietary requirements.</p>
                <p>At MNNIT, we strive to maintain a high standard of hygiene and quality in our mess facilities. Our dedicated team works diligently to ensure that meals are prepared fresh and served with care. We value student feedback and continuously improve our services based on suggestions and recommendations.</p>
                <p>We understand the importance of a well-balanced diet for students' well-being and academic performance. That's why we work hard to create a comfortable dining experience that meets the needs of all students.</p>

                {/* Contact cards */}
                <h2 className="mt-5">Contact Us</h2>
                <Row>
                    <Col md={4}>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Ritisha Singh</Card.Title>
                                <Card.Text>
                                    Position: Mess Manager
                                </Card.Text>
                                <Card.Text>
                                    Email: ritisha@example.com
                                </Card.Text>
                                {/* Add a mailto link to the Contact button */}
                                <Button href="mailto:ritisha@example.com" style={cardButtonStyle}>
                                    Contact
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Rohith T R</Card.Title>
                                <Card.Text>
                                    Position: Assistant Manager
                                </Card.Text>
                                <Card.Text>
                                    Email: rohith@example.com
                                </Card.Text>
                                {/* Add a mailto link to the Contact button */}
                                <Button href="mailto:rohith@example.com" style={cardButtonStyle}>
                                    Contact
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Pulkit Rajput</Card.Title>
                                <Card.Text>
                                    Position: Chef
                                </Card.Text>
                                <Card.Text>
                                    Email: pulkit@example.com
                                </Card.Text>
                                {/* Add a mailto link to the Contact button */}
                                <Button href="mailto:pulkit@example.com" style={cardButtonStyle}>
                                    Contact
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            {/* Place Footer directly after content */}
            {/* <Footer /> */}
        </div>
    );
};

export default About;
