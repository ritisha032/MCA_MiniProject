import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Person2Icon from '@mui/icons-material/Person2';
import ArchiveIcon from '@mui/icons-material/Archive';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/auth';
import axios from 'axios'; // Import axios to fetch user data
import mnnit from '../mnnit.png'; // Import MNNIT image

function AdminDashboard() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const user = localStorage.getItem('auth');
    const parsedData = JSON.parse(user);
    const [profileImageUrl, setProfileImageUrl] = useState(''); // State to hold profile image URL

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/profile/getUserDetails`
            );
            const userData = response.data.data;
            // Set profile image URL from the user data
            setProfileImageUrl(userData.additionalDetails.image);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('auth');
        Cookies.remove('token');
        setAuth({
            user: null,
            token: '',
        });
        toast.success('Log out Successful');
        navigate('/login');
    };

    return (
        <>
            {/* Adding a style block to define CSS rules directly */}
            <style>
                {`
                    /* Style for hover effect and increased font size */
                    .p-2:hover {
                        background-color: #2c3e50; /* Darker shade for hover */
                        color: white; /* Change text color for better visibility */
                        cursor: pointer; /* Indicates the element is clickable */
                        font-size: 1.1rem; /* Increases font size */
                        font-weight: bold; /* Optional: Make the text bold */
                    }
                `}
            </style>

            <Container fluid style={{ height: '100%' }}>
                <Row>
                    <Col style={{ backgroundColor: '#34495e', height: 'auto' }}>
                        <div className='vh-100 w-100 p-3'>
                            <div className='p-1 m-auto text-center'>
                                {/* Display the profile image */}
                                <img
                                    src={profileImageUrl}
                                    alt='Profile'
                                    className='rounded-circle'
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        border: '4px solid #153448', // Border color
                                    }}
                                />
                            </div>
                            <div className='p-2'>
                                <NavLink to='' className='p-2'>
                                    <DashboardIcon style={{ color: '#f1c40f' }} /> Profile
                                </NavLink>
                            </div>
                            {/* Additional links */}
                            <div className='p-2'>
                                <NavLink to='updateprofile' className='p-2'>
                                    <Person2Icon style={{ color: '#f1c40f' }} /> Edit Profile
                                </NavLink>
                            </div>
                            <div className='p-2'>
                                <NavLink to='messmenu' className='p-2'>
                                    <RestaurantMenuIcon style={{ color: '#f1c40f' }} /> Mess Menu
                                </NavLink>
                            </div>
                            <div className='p-2'>
                                <NavLink to='changemenu' className='p-2'>
                                    <FastfoodIcon style={{ color: '#f1c40f' }} /> Update Menu
                                </NavLink>
                            </div>
                            {/* ... other links */}
                            <div className="p-2">
                                <NavLink to="complaint" className="p-2">
                                    <ArchiveIcon style={{ color: '#f1c40f' }} /> Complaint
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="feedback" className="p-2">
                                    <FeedbackIcon style={{ color: '#f1c40f' }} /> Feedback
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="users" className="p-2">
                                    <SupervisorAccountIcon style={{ color: '#f1c40f' }} /> Users
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="adduser" className="p-2">
                                    <SupervisorAccountIcon style={{ color: '#f1c40f' }} /> Add User
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="readfeedback" className="p-2">
                                    <FeedbackIcon style={{ color: '#f1c40f' }} /> Read Feedback
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="resolvedcomplaints" className="p-2">
                                    <ArchiveIcon style={{ color: '#f1c40f' }} /> Resolved Complaints
                                </NavLink>
                            </div>
                        </div>
                        
                    </Col>
                    <Col xs={9}>
                        <Navbar expand='lg' className='bg-body-tertiary'>
                            <Container>
                                <Navbar.Brand href='#home'><b>{parsedData.messName} Hostel Admin</b></Navbar.Brand>
                                <Stack direction='horizontal' gap={3}>
                                    {/* Display the MNNIT image in the Navbar */}
                                    <img
                                        src={mnnit}
                                        alt='MNNIT Logo'
                                        style={{
                                            height: '60px',
                                        }}
                                    />
                                    <div className='p-1 ms-auto'>
                                        <Button
                                            variant='outline-primary'
                                            onClick={handleLogout}
                                        >
                                            <LogoutIcon /> Log Out
                                        </Button>
                                    </div>
                                </Stack>
                            </Container>
                        </Navbar>
                        <Container>
                            <Outlet />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminDashboard;
