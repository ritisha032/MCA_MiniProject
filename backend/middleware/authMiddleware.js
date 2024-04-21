import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const protect = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    console.log("token is", token);

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "TOken is missing",
      });
    }

    //verify the token
    try 
    {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      //verification - issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

export const adminCheck = async (req, res, next) => {
  try {
    console.log("req.user.isAdmin= ",req.user.role);
    if (!req.user.role) {
      return res.json({ message: "Authorized only for admin" }).status(401);
    }
    next();
  } catch (error) {
    return res.json({ message: "Not authorized, token failed" }).status(401);
  }
};