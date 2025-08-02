import userModel from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { email: email, role: "user" },
      process.env.JWT_SECRET
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { email: user.email, role: "user" },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// // Get User Profile
// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await userModel.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json({
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         image: user.image,
//         address: user.address,
//         gender: user.gender,
//         dob: user.dob,
//         phone: user.phone,
//         role: "user",
//       },
//     });
//   } catch (error) {
//     console.error("Error getting user profile:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };
