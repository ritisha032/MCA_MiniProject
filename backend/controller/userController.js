import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import mailSender from "../utils/mailSender.js";
import Token from "../models/token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Complaint from "../models/complaint.js";
import Mess from "../models/mess.js";
import Feedback from "../models/feedback.js";
import Profile from "../models/profile.js";
const clientURL = process.env.CLIENT_URL;

const registerUser = async (req, res) => {
  try {
    const { name, email, password, selectedMess, roomNo } = req.body;

    // Email format validation
    const emailRegex = /@mnnit\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email must be in @mnnit.ac.in format",
      });
    }

    if (!name || !email || !password || !selectedMess || !roomNo) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fields",
      });
    }

    // Find the mess document based on the provided selectedMess
    const messDocument = await Mess.findOne({ messName: selectedMess });

    if (!messDocument) {
      return res.status(400).json({
        success: false,
        message: "Invalid messName",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
		});

    const newUserDetails = {
      name,
      email,
      password,
      messId: messDocument.messId,
      roomNo,
      additionalDetails:profileDetails._id
    };

    const createdUser = await User.create(newUserDetails);

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "User creation failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        messId: createdUser.messId,
        roomNo: createdUser.roomNo,
        profile:createdUser.additionalDetails
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default registerUser;

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid request params for user login",
      });
    }

    // Find a user with the entered email
    let user = await User.findOne({ email });

    // Check if a user with entered email exists and check if entered password
    // matches the stored user password
    if (user && (await user.matchPasswords(password))) {
      // Find the mess document based on the user's messId
      const messId = user.messId;
      const messDocument = await Mess.findOne({ messId });
      const messName = messDocument ? messDocument.messName : 'Unknown Mess';
      const payload = {
        id: user._id,
        email: user.email,
        role: user.isAdmin,
        roomNo: user.roomNo,
        messId: user.messId,
        messName: messDocument ? messDocument.messName : 'Unknown Mess',
      };

      // Generate JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // Omit sensitive information from user object
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      // Set cookie with token
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // Send response with token and user data
      res.cookie("token", token, options)
        .json({
          success: true,
          token,
          user,
          messName,
          message: `User Login Success`,
        });
    } else {
      return res.status(201).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be logged in",
    });
  }
};


const addComplaint = async (req, res) => {
  try {
    const { name, roomNumber, complaintType, complaintText, messId } = req.body;

    // Assuming status defaults to "unresolved" and is not provided in the request body

    const newComplaint = new Complaint({
      name,
      roomNumber,
      complaintType,
      complaintText,
      messId,
    });

    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

const addFeedback = async (req, res) => {
  try {
    // Extract feedback data from request body
    const { name, email, roomNumber, rating, feedbackText, messId } = req.body;

    // Create a new feedback document
    const newFeedback = new Feedback({
      name,
      email,
      roomNumber,
      rating,
      feedbackText,
      messId
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Respond with success message
    res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding feedback:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback' });
  }
}
export { registerUser, authenticateUser,addComplaint, addFeedback };
