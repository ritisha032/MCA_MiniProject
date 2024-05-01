import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

const Reset = () => {

  let navigate = useNavigate();
  const { userId, userToken } = useParams();
  console.log("üserId= ",userId,"userToken= ",userToken);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match", {
        autoClose: 5000,
        position: "top-right",
      });
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/password/${userId}/${userToken}`,
          {
            password: newPassword,
          }
        );
        console.log("response= ", response);
        toast.success(response.data.message, {
          autoClose: 5000,
          position: "top-right",
        });
        navigate("/login");
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ boxShadow: "4" }}>
          <CardContent sx={{ m: 3 }}>
            <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
              Reset Password
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                name="newpassword"
                id="newpassword"
                label="New Password"
                autoFocus
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Reset;
