import { Router } from "express";

import { protect, adminCheck } from "../middleware/authMiddleware.js";

import { addMess, deleteMess } from "../controller/messController.js";

const router = Router();

router.post("/addMess", addMess);
router.delete("/removeMess", protect, adminCheck, deleteMess);

export default router;
