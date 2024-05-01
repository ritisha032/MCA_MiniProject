import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="display-1">404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary mt-4">Go back to Home</Link>
        </div>
    );
};

export default NotFound;
