import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from "../Outside/Footer/Footer";
import Navbar from '../Outside/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        selectedMess: '',
        roomNo: '',
    });
    const [messes, setMesses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isFooterVisible, setFooterVisible] = useState(false);
    const footerRef = useRef(null); // Reference for the footer element

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch messes from your API endpoint
        const fetchMesses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/mess/getMesses`);
                if (Array.isArray(response.data)) {
                    setMesses(response.data);
                } else {
                    toast.error('Invalid response data:', response.data);
                }
            } catch (error) {
                toast.error('Error fetching messes:', error);
            }
        };

        fetchMesses();
    }, []);

    useEffect(() => {
        // Create an intersection observer to watch for the footer's visibility
        const observer = new IntersectionObserver(
            ([entry]) => {
                setFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
        );

        // Start observing the footer reference element
        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        // Clean up the observer when the component unmounts
        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/user/sendotp`,
                formData
            );

            if (response.data.success) {
                // Navigate to OTP page passing form data as state
                navigate("/otp", { state: { formData } });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="whole-signup">
            <Navbar />
            <div className="signup-container" style={{marginTop:"10px"}}>
                <form onSubmit={handleSubmit} className="form-container" style={{width:"600px",marginLeft:"29%",animation: "fadeIn 0.5s ease-in"}}>
                    <h2>Sign Up</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your name"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your college email"
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your password"
                        />
                    </label>
                    <label>
                        Mess:
                        <select
                            name="selectedMess"
                            value={formData.selectedMess}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Mess</option>
                            {messes.map((mess) => (
                                <option key={mess.messId} value={mess.messName}>
                                    {mess.messName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Room Number:
                        <input
                            type="text"
                            name="roomNo"
                            value={formData.roomNo}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your room number"
                        />
                    </label>
                    <button type="submit">Submit</button>
                    <p>
                        Already signed up? <a href="/login">Sign in</a>
                    </p>
                </form>

                {errorMessage && (
                    <p className="error-message" style={{ color: 'red' }}>
                        {errorMessage}
                    </p>
                )}

                {/* Add footer reference */}
                <div ref={footerRef}></div>
            </div>

            {/* Conditionally render Footer based on isFooterVisible */}
            {isFooterVisible && <Footer />}
        </div>
    );
};

export default SignupPage;
