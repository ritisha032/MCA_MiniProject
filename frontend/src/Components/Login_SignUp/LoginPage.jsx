import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Outside/Footer/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Container } from "@mui/material";
import "./index.css"; // Import the CSS file
import { Button } from "react-bootstrap";
import Navbar from "../Outside/Navbar/Navbar";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}api/user/login`,
                formData
            );
            console.log("res= ", res.data.token);
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                console.log(res.data.user.isAdmin);
                localStorage.setItem("auth", JSON.stringify(res.data));
                if (!res.data.user.isAdmin) {
                    navigate("/dashboard/student");
                } else if (res.data.user.isAdmin) {
                    navigate("/dashboard/admin");
                } else {
                    // Handle other roles
                    navigate("/");
                }
            } else {
                console.log("res ka data= ", res);
                toast.warning(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.warning("Something went wrong");
        }
    };

    // Add the fade effect using useEffect
    useEffect(() => {
        const wholeElement = document.querySelector(".whole");
        setTimeout(() => {
            wholeElement.classList.add("show");
        }, 100); // 100ms delay before adding the 'show' class
    }, []);

    return (
        <div className="whole">
            <Navbar />
            <div className="login-container">
                <h2>Login Page</h2>
                <label>
                    Email:
                    <input type="text" name="email" onChange={handleInputChange} />
                </label>

                <label>
                    Password:
                    <input type="password" name="password" onChange={handleInputChange} />
                </label>

                <Button variant="primary" onClick={handleLogin}>Login</Button>

                <p>
                    <Link to="/forgot-password">Forgot Password or email?</Link>
                </p>

                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default LoginPage;
