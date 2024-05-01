import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the background image
import backgroundImage from './ab.jpg';
import image from './images.jpg';

const teamMembers = [
    {
        name: 'Ritisha Singh',
        description: 'MCA 2nd year',
        contact: '+1 123 456 7890',
        email: 'ritisha@gmail.com',
        profilePic: `${image}`, // Random profile picture URL
    },
    {
        name: 'Rohith T R',
        description: 'MCA 2nd year',
        contact: '+1 123 456 7890',
        email: 'rohith@gmail.com',
        profilePic: `${image}`, // Random profile picture URL
    },
    {
        name: 'Pulkit Rajput',
        description: 'MCA 2nd year',
        contact: '+1 123 456 7890',
        email: 'pulkit@gmail.com',
        profilePic: `${image}`, // Random profile picture URL
    },
    
    // Add more team members here...
];

function AboutUs() {
    // Define inline styles for the container
    const containerStyle = {
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '10px', // Adjust padding as needed
        
    };

    const whole={
        height: '100vh',
        width: '100vw',
    }

    return (
        <div className='wholepage'>
        
                <div className="container mt-5" style={containerStyle}>
                    <h2 className="mb-4">About Us</h2>
                    <div className="row">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={member.profilePic} className="card-img-top" alt={`${member.name}'s profile`} />
                                    <div className="card-body">
                                        <h5 className="card-title">{member.name}</h5>
                                        <p className="card-text">{member.description}</p>
                                        <p className="card-text"><strong>Contact:</strong> {member.contact}</p>
                                        <p className="card-text"><strong>Email:</strong> <a href={`mailto:${member.email}`}>{member.email}</a></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}

export default AboutUs;
