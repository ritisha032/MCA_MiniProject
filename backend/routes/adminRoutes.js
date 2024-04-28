import { Router } from "express";
import { deleteUser, getUsers, setMealCostTime, setMenu } from "../controller/adminController.js";
import {protect,adminCheck} from "../middleware/authMiddleware.js";
import { totalMealCount } from "../controller/couponController.js";

const router = Router();

router.post("/setmenu",protect,adminCheck,setMenu);
router.post("/setmeal",protect,adminCheck,setMealCostTime);
router.get("/totalmeal", protect,adminCheck,totalMealCount);
router.get("/:messName",protect,adminCheck,getUsers);
router.delete("/:userId",protect,adminCheck,deleteUser);




export default router;