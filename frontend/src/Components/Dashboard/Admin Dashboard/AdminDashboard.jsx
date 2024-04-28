import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; 
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import Cookies from "js-cookie";

function AdminDashboard() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const user = localStorage.getItem("auth");
    const parsedData = JSON.parse(user);
    console.log("parsed data= ",parsedData);
    

    const handleLogout = () => {
        localStorage.removeItem("auth");
        Cookies.remove("token");
        setAuth({
            user: null,
            token: ""
        });
        toast.success("LogOut Successful")
        navigate('/login');
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
                                <NavLink to="" style={({ isActive }) => (isActive ? { color: "" } : {})}>
                                    <DashboardIcon style={{ color: '#f1c40f' }} />Dashboard
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="updateprofile" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <Person2Icon style={{ color: '#f1c40f' }} /> Edit Profile
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="messmenu" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <RestaurantMenuIcon style={{ color: '#f1c40f' }} /> Mess menu
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="changemenu" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <FastfoodIcon style={{ color: '#f1c40f' }} /> Update Menu
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
                            <div className="p-2">
                                <NavLink to="users" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <SupervisorAccountIcon style={{ color: '#f1c40f' }} /> Users
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="adduser" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <SupervisorAccountIcon style={{ color: '#f1c40f' }} /> Add User
                                </NavLink>
                            </div>
                            <div className="p-2">
                                <NavLink to="readfeedback" style={({ isActive }) => (isActive ? { color: "#ecf0f1" } : {})}>
                                    <SupervisorAccountIcon style={{ color: '#f1c40f' }} /> Read Feedback
                                </NavLink>
                            </div>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Navbar expand="lg" className="bg-body-tertiary">
                            <Container>
                                <Navbar.Brand href="#home">{parsedData.messName} Hostel Admin</Navbar.Brand>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="p-2 ms-auto">
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
                            <Outlet />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminDashboard;
