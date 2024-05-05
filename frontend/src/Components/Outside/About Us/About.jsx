import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    const [isFooterVisible, setFooterVisible] = useState(false);
    const footerRef = useRef(null);

    // Card button style
    const cardButtonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
    };

    // Set up an intersection observer to detect when the user reaches the bottom of the page
    useEffect(() => {
        const handleScroll = () => {
            const observerOptions = {
                root: null, // Observe in the context of the browser viewport
                rootMargin: '0px',
                threshold: 1.0, // Only trigger when 100% of the target is in the viewport
            };

            // Create a new IntersectionObserver instance
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setFooterVisible(true);
                    } else {
                        setFooterVisible(false);
                    }
                });
            }, observerOptions);

            // Observe the footer reference element
            observer.observe(footerRef.current);

            // Clean up the observer when the component unmounts
            return () => {
                observer.disconnect();
            };
        };

        // Attach the observer when the component mounts
        handleScroll();
    }, []);

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Navbar />
            <Container className="mt-5" style={{ padding: '20px' }}>
                <h1>About Us</h1>
                <p>
                    Welcome to MNNIT's Mess Management. Our goal is to provide students with healthy, nutritious, and affordable meals. We take pride in offering a variety of options to cater to different tastes and dietary requirements.
                </p>
                <p>
                    At MNNIT, we strive to maintain a high standard of hygiene and quality in our mess facilities. Our dedicated team works diligently to ensure that meals are prepared fresh and served with care. We value student feedback and continuously improve our services based on suggestions and recommendations.
                </p>
                <p>
                    We understand the importance of a well-balanced diet for students' well-being and academic performance. That's why we work hard to create a comfortable dining experience that meets the needs of all students.
                </p>

                {/* Contact cards */}
                <h2 className="mt-5">Contact Us</h2>
                <Row>
                    <Col md={4}>
                        <Card style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
                            <Card.Body>
                                <Card.Title>Ritisha Singh</Card.Title>
                                <Card.Text>Position: Mess Manager</Card.Text>
                                <Card.Text>Email: ritisha@example.com</Card.Text>
                                <Button href="mailto:ritisha@example.com" style={cardButtonStyle}>Contact</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
                            <Card.Body>
                                <Card.Title>Rohith T R</Card.Title>
                                <Card.Text>Position: Assistant Manager</Card.Text>
                                <Card.Text>Email: rohith@example.com</Card.Text>
                                <Button href="mailto:rohith@example.com" style={cardButtonStyle}>Contact</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
                            <Card.Body>
                                <Card.Title>Pulkit Rajput</Card.Title>
                                <Card.Text>Position: Chef</Card.Text>
                                <Card.Text>Email: pulkit@example.com</Card.Text>
                                <Button href="mailto:pulkit@example.com" style={cardButtonStyle}>Contact</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Add footer reference */}
                <div ref={footerRef}></div>
            </Container>

            {/* Conditionally render Footer based on isFooterVisible */}
            {isFooterVisible && <Footer />}
        </div>
    );
};

export default About;
