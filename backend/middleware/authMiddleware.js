import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    // Extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    // console.log("token is", token);

    // If token is missing, return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      // console.log("token is ",token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded= ", decoded);
      req.user = decoded;
    } catch (err) {
      // Verification issue
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

export const adminCheck = async (req, res, next) => {
  try {
    // console.log("req.user.isAdmin= ",req.user.role);
    if (!req.user.role) {
      return res.status(401).json({ message: "Authorized only for admin" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
