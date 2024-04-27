import { Router } from "express";

import { protect, adminCheck } from "../middleware/authMiddleware.js";

import { addMess, deleteMess, getMess } from "../controller/messController.js";

const router = Router();

router.post("/addMess",protect,adminCheck,addMess);
router.delete("/removeMess", protect, adminCheck, deleteMess);
router.get("/getMesses",getMess);

export default router;
