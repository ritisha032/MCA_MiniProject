import { Router } from "express";
const router = Router();
import { forgotPassword, resetPassword } from "../controller/passwordController.js";

router.post("/forgot-password",forgotPassword);
router.post("/:userId/:userToken",resetPassword)


export default router;
