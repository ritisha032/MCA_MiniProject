import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Mess Management System text */}
                <div style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Jersey 25, sans-serif', color: '#000' }} class="jersey-25-regular">
    Mnnit Mess Management System
</div>


                {/* Button container aligned to the right */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                   
                    <Link to="/" style={{ marginLeft: '10px' }}>
                        <button>Home</button>
                    </Link>
                    <Link to="/about-us" style={{ marginLeft: '10px' }}>
                        <button>About Us</button>
                    </Link>
                    <Link to="/login" style={{ marginLeft: '10px' }}>
                        <button>Login</button>
                    </Link>
                    <Link to="/signup" style={{ marginLeft: '10px' }}>
                        <button>Sign Up</button>
                    </Link>
                    
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
