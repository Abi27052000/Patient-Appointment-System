import express from "express";
import {
  registerUser,
  loginUser,
  // getUserProfile,
} from "../controllers/user_controller.js";
import userAuth from "../middlewares/user_auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", userAuth, getUserProfile);

export default router;
