import { Router } from "express";
import { deleteUser, getFeedbacks,updateFeedback, getUsers, setMealCostTime, setMenu, updateComplaint, getComplaints } from "../controller/adminController.js";
import {protect,adminCheck} from "../middleware/authMiddleware.js";
import { totalMealCount } from "../controller/couponController.js";

const router = Router();

router.post("/setmenu",protect,adminCheck,setMenu);
router.post("/setmeal",protect,adminCheck,setMealCostTime);
router.get("/totalmeal", protect,adminCheck,totalMealCount);
router.get("/:messName",protect,adminCheck,getUsers);
router.get("/getFeedbacks/:messId",protect,adminCheck,getFeedbacks);
router.put("/updateFeedback/:userId",protect,adminCheck,updateFeedback)
router.delete("/:userId",protect,adminCheck,deleteUser);
router.get("/getComplaints/:messId",protect,adminCheck,getComplaints);
router.put("/updateComplaint/:complaintId",protect,adminCheck,updateComplaint);




export default router;