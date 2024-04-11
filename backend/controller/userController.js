import asyncHandler from "express-async-handler";
import UserModel from "../models/user.js";
import mailSender from "../utils/email/mailSender.js";
import Token from "../models/token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const clientURL = process.env.CLIENT_URL;
import { resetTemplate } from "../utils/email/template/resetPassword.js";
//import { Resend } from "resend";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    //  console.log(req.body);

    if (!name || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please Enter All the User Fields",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .json({
          success: false,
          message: "User Already Exists",
        })
        .status(204);
    }

    const newUserDetails = { name, email, password, isAdmin };

    const createdUser = await UserModel.create(newUserDetails);
    //   console.log("created user= ",createdUser);

    if (!createdUser) {
      return res
        .json({
          success: false,
          message: "User Not Found",
        })
        .status(204);
    }

    return res
      .json({
        success: true,
        message: "Sign up successful",
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser._id),
        expiryTime: Date.now() + 15 * 24 * 60 * 60 * 1000, // Expire session after 15 days
      })
      .status(200);
  } catch (err) {
    console.error(err);

    return res
      .json({
        success: false,
        message: "User registration failed",
      })
      .status(500);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

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
      const payload = {
        id: user._id,
        email: user.email,
        role: user.isAdmin,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user = user.toObject();

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res
        .cookie("token", token, options)
        .json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
        .status(200);
    } else {
      return res.status(401).json({
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

export { registerUser, authenticateUser, requestPasswordReset, resetPassword };