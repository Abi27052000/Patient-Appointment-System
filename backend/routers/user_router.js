import express from "express";
import {
  registerUser,
  loginUser,
  allDoctors,
  getDoctorsByQuery,
  getUser,
  updateUser,
} from "../controllers/user_controller.js";
import userAuth from "../middlewares/user_auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all-doctors", userAuth, allDoctors);
router.get("/doctors-by-query", userAuth, getDoctorsByQuery);
router.get("/get-user", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

export default router;
