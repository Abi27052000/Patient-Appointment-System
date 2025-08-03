import express from "express";
import {
  addDoctor,
  adminLogin,
  doctorAvailability,
  fetchAllDoctors,
} from "../controllers/admin_controller.js";

import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/admin_auth.js";

const router = express.Router();

router.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);
router.post("/login", adminLogin);
router.get("/all-doctors", adminAuth, fetchAllDoctors);
router.put("/doctor-availability", adminAuth, doctorAvailability);

export default router;
