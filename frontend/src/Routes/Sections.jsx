import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Components/Login_SignUp/LoginPage";
// import "./style.css";
import Landing from "../Components/Outside/Front Page/Landing";
import Contact from "../Components/Outside/Contact/Contact";
import AdminDashboard from "../Components/Dashboard/Admin Dashboard/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


import MessMenu from "../Components/Menu/MessMenu";
import MyCoupon from "../Components/Coupons/MyCoupon";
import BuyCoupon from "../Components/Coupons/BuyCoupon";
import UpdateMenu from "../Components/Menu/UpdateMenu";
import SignupPage from "../Components/Login_SignUp/SignupPage";
import StudentDash from "../Components/Dashboard/Student Dashboard/StudentDashboard";
import Complaint from "../Components/Dashboard/Student Dashboard/component/Complaint";
import FeedbackForm from "../Components/Dashboard/Student Dashboard/component/Feedback";
import ShowProfile from "../Components/Dashboard/Student Dashboard/component/ShowProfile";
import Hostels from "../Components/Dashboard/Admin Dashboard/component/Hostels";
import Feedback from "../Components/Dashboard/Admin Dashboard/component/Feedback/FeedbackAdmin";
import ComplaintAdmin from "../Components/Dashboard/Admin Dashboard/component/Complaint/ComplaintAdmin";
import UpdateProfile from "../Components/Dashboard/Admin Dashboard/component/Profile/UpdateProfile";
import ProfileAdmin from "../Components/Dashboard/Admin Dashboard/component/Profile/ProfileAdmin";
import Users from "../Components/Dashboard/Admin Dashboard/Users/Users";
import Adduser from "../Components/Dashboard/Admin Dashboard/Users/Adduser";
import ReadFeedbacks from "../Components/Dashboard/Admin Dashboard/component/Feedback/ReadFeedbacks";
import CompletedComplaints from "../Components/Dashboard/Admin Dashboard/component/Complaint/CompletedComplaint"
import Forgot from "../Components/Outside/ResetPassword/Forgot";
import Reset from "../Components/Outside/ResetPassword/Reset";

// import StudentDashboard from "../Components/Dashboard/Student Dashboard/StudentDashboard";
const Routers = () => {
  const [userRole, setUserRole] = useState("");
 
 
  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<Forgot/>}/>
        <Route path="/reset-password/:userId/:userToken" element={<Reset/>}/>
     
        <Route path="/dashboard" element={<PrivateRoute />}>
          {/* <Route path="student" element={<StudentDashboard/>} /> */}
          <Route path="student" element={<StudentDash />}>
            <Route path="" element={<ShowProfile />} />{" "}
            {/* Corrected closing angle bracket */}
            <Route path="messmenu" element={<MessMenu />} />{" "}
            {/* Corrected closing angle bracket */}
            <Route path="mycoupons" element={<MyCoupon />} />
            <Route path="buycoupon" element={<BuyCoupon />} />
            <Route path="complaint" element={<Complaint />} />
            <Route path="feedback" element={<FeedbackForm />} />
            <Route path="profile" element={<ShowProfile />} />
          </Route>
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}>
            <Route path="messmenu" element={<MessMenu />} />{" "}
            <Route path="" element={<ProfileAdmin />} />{" "}
            {/* Corrected closing angle bracket */}
            <Route path="changemenu" element={<UpdateMenu />} />
           
            {/* <Route path="hostels" element={<Hostels />} /> */}
            <Route path="complaint" element={<ComplaintAdmin />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="updateprofile" element={<UpdateProfile />} />
            <Route path="users" element={<Users/>}/>
            <Route path="adduser" element={<Adduser/>}/>
            <Route path="readfeedback" element={<ReadFeedbacks/>}/>
            <Route path="resolvedcomplaints" element={<CompletedComplaints/>}/>
            {/* <Route path="profile" element={<ProfileAdmin />} /> */}
            {/* <Route path="hostels" element={<Hostels />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
