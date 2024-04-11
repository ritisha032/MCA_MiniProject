import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Components/Outside/Login_SignUp/LoginPage";
import SignupPage from "../Components/Outside/Login_SignUp/SignupPage";
import "./style.css";
import Landing from "../Components/Outside/Front Page/Landing";
import Contact from "../Components/Outside/Contact/Contact";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Reset from "../Components/Outside/ResetPassword/Reset";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import AdminPage from "../Components/Outside/Login_SignUp/AdminPage";
import StudentPage from "../Components/Outside/Login_SignUp/StudentPage";
import MessMenu from "../Components/MessMenu";
import UpdateMenu from "../Components/UpdateMenu";
const Routers = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();
  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<Reset />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="student" element={<StudentPage />} />
       
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard/>}></Route>
          <Route path="admin/messmenu" element={<MessMenu/>} /> {/* Corrected closing angle bracket */}
          <Route path="admin/changemenu" element={<UpdateMenu/>}/>
        </Route>
         
       

       
      </Routes>
    </>
  );
};

export default Routers;
