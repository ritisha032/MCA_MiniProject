import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto";
import mailSender from "../utils/mailSender.js";

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

        const link = `${process.env.BASE_URL}/password-reset/${userObject._id}/${token.token}`;
        await mailSender(userObject.email, "Password reset", link); // Use userObject.email instead of user.email

        res.send("Password reset link sent to your email account");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}

export { forgotPassword };
