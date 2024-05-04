import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <Container>
                <Row>
                    <Col md={4}>
                        <p>&copy; {new Date().getFullYear()} MNNIT. All rights reserved.</p>
                    </Col>
                    <Col md={4}>
                        <p>Contact: <a href="mailto:info@example.com">info@example.com</a></p>
                    </Col>
                    <Col md={4}>
                        <p>
                            Follow us:
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> |
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> |
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#EEF7FF', // Dark background
    color: 'black', // White text
    padding: '10px 0', // Padding top and bottom
};

export default Footer;
