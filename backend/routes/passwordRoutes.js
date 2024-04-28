import { Router } from "express";
const router = Router();
import { forgotPassword } from "../controller/passwordController.js";

router.post("/forgot-password",forgotPassword);


export default router;
