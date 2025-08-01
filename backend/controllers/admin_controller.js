// controllers/doctorController.js
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import doctorModel from "../models/doctor_model.js";
import bcrypt from "bcryptjs";
import validator from "validator";

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
      address,
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
