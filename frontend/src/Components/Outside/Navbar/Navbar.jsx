import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Mess Management System text */}
                <div style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', color: '#000' }}>
                    Mnnit Mess Management System
                </div>

                {/* Button container aligned to the right */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link to="/contact" style={{ marginLeft: '10px' }}>
                        <button>Contact</button>
                    </Link>
                    <Link to="/about-us" style={{ marginLeft: '10px' }}>
                        <button>About Us</button>
                    </Link>
                    <Link to="/signup" style={{ marginLeft: '10px' }}>
                        <button>Sign Up</button>
                    </Link>
                    <Link to="/login" style={{ marginLeft: '10px' }}>
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
