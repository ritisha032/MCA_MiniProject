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
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import mnnit from "../mnnit.png";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import Cookies from "js-cookie";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function StudentDashboard() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [studentName, setStudentName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isEmptyField, setIsEmptyField] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/profile/getUserDetails`
            );
            const userData = response.data.data;
            setImageUrl(userData.additionalDetails.image);

            // Check if any required field is empty
            const isEmpty = !userData.additionalDetails.gender ||
                            !userData.additionalDetails.contactNumber ||
                            !userData.additionalDetails.dateOfBirth ||
                            !userData.additionalDetails.image;
            setIsEmptyField(isEmpty);

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (auth && auth.user && auth.user.name) {
            setStudentName(auth.user.name);
        }
    }, [auth]);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        Cookies.remove("token");
        setAuth({
            user: null,
            token: ""
        });
        toast.success("LogOut Successful");
        navigate('/login');
    };

    return (
        <>
            {/* Adding a style tag to define CSS rules directly */}
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
                                <img
                                    src={imageUrl}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        border: "4px solid #153448",
                                    }}
                                />
                            </div>
                            <div className="p-2">
                                <NavLink to="profile" className="p-2">
                                    <Person2Icon style={{ color: '#f1c40f' }} /> Profile
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="edit-profile" className="p-2">
                                    <Person2Icon style={{ color: '#f1c40f' }} /> Edit Profile
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="messmenu" className="p-2">
                                    <FastfoodIcon style={{ color: '#f1c40f' }} /> Mess Menu
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="mycoupons" className="p-2">
                                    <ShoppingBagIcon style={{ color: '#f1c40f' }} /> My Coupons
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="buycoupon" className="p-2">
                                    <BookOnlineIcon style={{ color: '#f1c40f' }} /> Buy Coupons
                                </NavLink>
                            </div>
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
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Navbar expand="lg" className="bg-body-tertiary">
                            <Container>
                                <Navbar.Brand><b>Welcome, {studentName}</b></Navbar.Brand>
                                <Stack direction="horizontal" gap={3}>
                                    <img src={mnnit} style={{ height: "60px" }} alt="MNNIT" />
                                    <div className="p-1 ms-auto">
                                        <Button
                                            variant="outline-primary"
                                            onClick={handleLogout}
                                        >
                                            <LogoutIcon /> Log Out
                                        </Button>
                                    </div>
                                </Stack>
                            </Container>
                        </Navbar>
                        <Container>
                            {/* Display an alert if any required field is empty */}
                            {isEmptyField && (
                                <Alert variant="danger">
                                    Please update your profile information.
                                </Alert>
                            )}
                            <Outlet />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StudentDashboard;
