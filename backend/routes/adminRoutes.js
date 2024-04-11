import { Router } from "express";
import { setMealCostTime, setMenu } from "../controller/adminController.js";
import {protect,adminCheck} from "../middleware/authMiddleware.js";
import { totalMealCount } from "../controller/couponController.js";

const router = Router();

router.post("/setmenu",protect,adminCheck,setMenu);
router.post("/setmeal",protect,adminCheck,setMealCostTime);
router.get("/totalmeal", protect,adminCheck,totalMealCount);

router.get("/admin-auth",protect,adminCheck,(req,res)=>{
    res.status(200).send({ok:true});
});

router.get("/user-auth",protect,(req,res)=>{
    res.status(200).send({ok:true});
});


export default router;