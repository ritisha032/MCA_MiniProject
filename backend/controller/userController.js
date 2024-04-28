import asyncHandler from "express-async-handler";
import UserModel from "../models/user.js";
import mailSender from "../utils/email/mailSender.js";
import Token from "../models/token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ComplaintModel from "../models/complaint.js";
import mess from "../models/mess.js";
import feedbackModel from "../models/feedback.js";
const clientURL = process.env.CLIENT_URL;
import { resetTemplate } from "../utils/email/template/resetPassword.js";
//import { Resend } from "resend";
const registerUser = async (req, res) => {
  try {
    const { name, email, password,selectedMess, roomNo } = req.body;

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
    const Mess = await mess.findOne({ messName: selectedMess });

    if (!Mess) {
      return res.status(400).json({
        success: false,
        message: "Invalid messName",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUserDetails = {
      name,
      email,
      password,
      messId: Mess.messId, // Assign the found mess ID
      roomNo
    };

    const createdUser = await UserModel.create(newUserDetails);

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
        messId: createdUser.messId, // Use mess ID instead of messId
        roomNo: createdUser.roomNo // Include roomNo in the response
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
    let user = await UserModel.findOne({ email });

    // Check if a user with entered email exists and check if entered password
    // matches the stored user password
    if (user && (await user.matchPasswords(password))) {
      // Find the mess document based on the user's messId
      const messId=user.messId;
      const Mess = await mess.findOne({messId}); // Use findById to find document by ID
      const messName=Mess ? Mess.messName : 'Unknown Mess';
      const payload = {
        id: user._id,
        email: user.email,
        role: user.isAdmin,
        roomNo: user.roomNo,
        messId: user.messId,
        messName: Mess ? Mess.messName : 'Unknown Mess', // Get the mess name from the mess document
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



const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("email= ", email);
  const user = await UserModel.findOne({ email });

  const resend = new Resend(process.env.RESEND_KEY);

  if (!user) {
    res.status(401);
    throw new Error("User doesn't exist");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = generateToken(user._id);
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(resetToken, Number(salt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}new-password?token=${resetToken}&id=${user._id}`;
  console.log("link= ", link);
  // sendEmail(
  //   user.email,
  //   'Password Reset Request',
  //   {
  //     name : user.name,
  //     link,
  //   },
  //   resetTemplate(user.name,link)
  // );
  try {
    //send mail containing the url
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${link}`
    );
    //return response
    return res.json({
      success: true,
      message: "Email sent successfully, please check email and change pwd",
    });
  } catch (error) {
    console.log(error);
  }
  return res.json({ link });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { userId, token, password } = req.body;
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    res.status(401);
    throw new Error("Invalid or expired password reset token");
  }

  // console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    res.status(401);
    throw new Error("Invalid or expired password reset token");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, Number(salt));

  await UserModel.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await UserModel.findById({ _id: userId });

  await passwordResetToken.deleteOne();
  return res.status(200).json({ message: "Password reset was successful" });
});

const addComplaint=async(req,res)=>{
  try {
    const { name, roomNumber, complaintType, complaintText } = req.body;
  //  console.log("req ki body = ",req.body);
    const newComplaint = new ComplaintModel({ name, roomNumber, complaintType, complaintText });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
const addFeedback=async(req,res)=>{
  try {
    // Extract feedback data from request body
    const { name, email, roomNumber, rating, feedbackText, messId } = req.body;

    // Create a new feedback document
    const newFeedback = new feedbackModel({
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
export { registerUser, authenticateUser, requestPasswordReset, resetPassword,addComplaint,addFeedback};
