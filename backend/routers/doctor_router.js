import express from "express";
import {
  loginDoctor,
  // getDoctorProfile,
  // updateDoctorAvailability,
} from "../controllers/doctor_controller.js";
import doctorAuth from "../middlewares/doctor_auth.js";

const router = express.Router();

router.post("/login", loginDoctor);
// router.get("/profile", doctorAuth, getDoctorProfile);
// router.put("/availability", doctorAuth, updateDoctorAvailability);

export default router;
