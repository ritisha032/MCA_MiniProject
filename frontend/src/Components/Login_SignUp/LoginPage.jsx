import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Outside/Footer/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

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
        `${process.env.REACT_APP_API}/api/user/login`,
        formData
      );
      console.log("res= ",res.data.token);
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        console.log(res.data.user.isAdmin);
        localStorage.setItem("auth", JSON.stringify(res.data));
        if (!(res.data.user.isAdmin)) {
          navigate('/dashboard/student');
        } else if (res.data.user.isAdmin) {
          navigate('/dashboard/admin');
        } else {
          // Handle other roles
          navigate('/');
        }
      } else {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.warning("Something went wrong");
    }
  };

  return (
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

      <button onClick={handleLogin}>Login</button>

      <p>
        <Link to="/forgot-password">Forgot Password or email?</Link>
      </p>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>

      <Footer />
    </div>
  );
};

export default LoginPage;
