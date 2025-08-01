import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import doctorModel from "../models/doctor_model.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

// Add a new doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      about,
      fees,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const parsedAddress = JSON.parse(req.body.address);

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

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ error: "Doctor already exists" });
    }

    // Ensure file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "doctors",
    });

    // Remove local file
    fs.unlinkSync(req.file.path);

    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    if (!hashedPassword) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    if (!result) {
      return res.status(500).json({ error: "Error uploading image" });
    }

    // Create doctor in DB
    const doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      speciality,
      experience,
      about,
      fees,
      address: parsedAddress,
      image: result.secure_url,
      date: Date.now(),
    });

    await doctor.save();

    return res
      .status(201)
      .json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Admin Login
export const adminLogin = (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const { email, password } = req.body;

  try {
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(email + adminPassword, process.env.JWT_SECRET, {});
      return res.status(200).json({ message: "Admin login successful", token });
    } else {
      return res.status(403).json({ error: "Unauthorized access" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
