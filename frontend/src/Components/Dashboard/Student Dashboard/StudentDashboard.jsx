import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Person2Icon from '@mui/icons-material/Person2';
import ArchiveIcon from '@mui/icons-material/Archive';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import Cookies from "js-cookie";

function StudentDashboard() {
    const navigate = useNavigate();  // Initialize useNavigate hook
    const [auth, setAuth] = useAuth();
    const [studentName, setStudentName] = useState("");

    // Fetch the student's name from auth state
    useEffect(() => {
        if (auth && auth.user && auth.user.name) {
            setStudentName(auth.user.name);
        }
    }, [auth]);

    // Function to handle logout button click
    const handleLogout = () => {
        // Perform any additional logout logic if needed, e.g., clearing session data
        localStorage.removeItem("auth");
        Cookies.remove("token");
        setAuth({
            user: null,
            token: ""
        });
        toast.success("LogOut Successful");
        navigate('/login'); // Navigate to the login page
    };

    return (
        <>
            <Container fluid style={{ height: '100%' }}>
                <Row>
                    <Col style={{ backgroundColor: '#34495e', height: 'auto' }}>
                        <div className='vh-100 w-100 p-3'>
                            <div className='p-2 m-auto text-center'>
                                <AccountCircleIcon style={{ color: 'white', fontSize: '100px' }} />
                            </div>
                            <div className="p-2">
                                <NavLink to="profile" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <Person2Icon style={{ color: '#f1c40f' }} /> Profile
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="edit-profile" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <Person2Icon style={{ color: '#f1c40f' }} /> Edit Profile
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="messmenu" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <FastfoodIcon style={{ color: '#f1c40f' }} /> Mess Menu
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="mycoupons" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <ShoppingBagIcon style={{ color: '#f1c40f' }} /> My Coupons
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="buycoupon" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <BookOnlineIcon style={{ color: '#f1c40f' }} /> Buy Coupons
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="complaint" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <ArchiveIcon style={{ color: '#f1c40f' }} /> Complaint
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="feedback" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <FeedbackIcon style={{ color: '#f1c40f' }} /> Feedback
                                </NavLink>
                            </div>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Navbar expand="lg" className="bg-body-tertiary">
                            <Container>
                                {/* Displaying student's name */}
                                <Navbar.Brand>Welcome, {studentName}</Navbar.Brand>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="p-2 ms-auto">
                                        <Button
                                            variant="outline-primary"
                                            onClick={handleLogout} // Attach the handleLogout function to the button
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

export default StudentDashboard;
