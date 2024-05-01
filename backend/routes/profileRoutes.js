import { Router } from "express";
const router = Router();
import {protect} from "../middleware/authMiddleware.js";
import { deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture} from "../controller/profileController.js"

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", protect, deleteAccount)
router.put("/updateProfile", protect, updateProfile)
router.get("/getUserDetails", protect, getAllUserDetails)
// Get Enrolled Courses

router.put("/updateDisplayPicture", protect, updateDisplayPicture)

export default router;