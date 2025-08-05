import userModel from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import doctorModel from "../models/doctor_model.js";

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

// Fetch All Doctors
export const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().sort({ date: -1 });
    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Fetch Doctors by Query
// This function allows filtering doctors by _id or speciality

export const getDoctorsByQuery = async (req, res) => {
  try {
    const { _id, speciality } = req.query;

    // Build dynamic filter object
    const filter = {};
    if (_id) {
      filter._id = _id;
    }
    if (speciality) {
      filter.speciality = speciality;
    }

    const doctors = await doctorModel.find(filter).sort({ date: -1 });

    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors by query:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Fetch a User

export const getUser = async (req, res) => {
  try {
    const email = jwt.verify(req.token, process.env.JWT_SECRET).email;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

//update user
export const updateUser = async (req, res) => {
  const { name, email, address, gender, dob, phone, password } = req.body;
  const image = req.file;

  try {
    // Field validation
    if (!name || !email || !address || !gender || !dob || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Prepare update object
    const updateData = { name, address, gender, dob, phone };

    // Handle image upload to Cloudinary
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "doctors",
      });

      updateData.image = result.secure_url;

      // Remove local file after upload
      await fs.promises.unlink(image.path);
    }

    // Update user and return updated doc
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
      token: jwt.sign(
        { email: updatedUser.email, role: "user" },
        process.env.JWT_SECRET
      ),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
