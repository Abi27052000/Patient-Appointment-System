import doctorModel from "../models/doctor_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Doctor Login
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find doctor by email
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { email: doctor.email, role: "doctor" },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: "Doctor login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
        role: "doctor",
      },
    });
  } catch (error) {
    console.error("Error during doctor login:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// // Get Doctor Profile
// export const getDoctorProfile = async (req, res) => {
//   try {
//     const doctorId = req.userId;
//     const doctor = await doctorModel.findById(doctorId).select("-password");

//     if (!doctor) {
//       return res.status(404).json({ error: "Doctor not found" });
//     }

//     return res.status(200).json({
//       doctor: {
//         id: doctor._id,
//         name: doctor.name,
//         email: doctor.email,
//         image: doctor.image,
//         speciality: doctor.speciality,
//         experience: doctor.experience,
//         about: doctor.about,
//         available: doctor.available,
//         fees: doctor.fees,
//         address: doctor.address,
//         role: "doctor",
//       },
//     });
//   } catch (error) {
//     console.error("Error getting doctor profile:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// // Update Doctor Availability
// export const updateDoctorAvailability = async (req, res) => {
//   try {
//     const doctorId = req.userId;
//     const { available } = req.body;

//     const doctor = await doctorModel
//       .findByIdAndUpdate(doctorId, { available }, { new: true })
//       .select("-password");

//     if (!doctor) {
//       return res.status(404).json({ error: "Doctor not found" });
//     }

//     return res.status(200).json({
//       message: "Availability updated successfully",
//       doctor,
//     });
//   } catch (error) {
//     console.error("Error updating doctor availability:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };
