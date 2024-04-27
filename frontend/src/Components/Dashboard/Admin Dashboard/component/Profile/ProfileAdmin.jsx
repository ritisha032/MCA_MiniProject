// src/components/ProfilePage.js

import React from 'react';
import { Container, Card } from 'react-bootstrap';

const ProfilePage = ({ profile }) => {
    return (
        <Container>
            <h1 className="my-4">Mess Manager Profile</h1>

            {profile ? (
                // Display profile information in a Bootstrap card
                <Card>
                    <Card.Body>
                        <Card.Title>Profile Information</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong> {profile.name} <br />
                            <strong>Email:</strong> {profile.email} <br />
                            <strong>Phone:</strong> {profile.phone} <br />
                            <strong>Address:</strong> {profile.address} <br />
                            {/* Add more fields as needed */}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>No profile data available.</p>
            )}
        </Container>
    );
};

export default ProfilePage;
