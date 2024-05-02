import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto";
import mailSender from "../utils/mailSender.js";
import { resetTemplate } from "../utils/email/template/resetPassword.js";

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body; // Extract email from req.body
        console.log(email);

        if (!email) {
            return res.status(400).send("Email is required");
        }

        const userObject = await User.findOne({ email });
        if (!userObject) {
            return res.status(400).send("User with the given email doesn't exist");
        }

        let token = await Token.findOne({ userId: userObject._id }); // Use userObject instead of user
        if (!token) {
            token = await new Token({
                userId: userObject._id, // Use userObject instead of user
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `Link to reset password:`+ `${process.env.CLIENT_URL}/reset-password/${userObject._id}/${token.token}`;
        const response=await mailSender(userObject.email, "Password reset",link); // Use userObject.email instead of user.email
        console.log(response);
        res.send("Password reset link sent to your email account");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}
const resetPassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).json({success:false,message:"Invalid link or expired"});

        // Find the latest token for the user
        const token = await Token.findOne({
            userId: user._id,
        }).sort({ createdAt: -1 });

        if (!token || token.token !== req.params.userToken) {
            return res.status(400).json({success:false,message:"Invalid link or expired"});
        }

        // Hash the new password
       
        // Save the new password
        user.password = req.body.password;
        await user.save();

        // Delete the token
       // await token.delete();

        res.status(201).json({success:true,message:"Password reset successfully"});

    } catch (error) {
        res.status(500).send({success:false,message:"An error occurred"});
        console.error(error);
    }
}

export { forgotPassword,resetPassword};
