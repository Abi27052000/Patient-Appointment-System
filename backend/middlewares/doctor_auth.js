import jwt from "jsonwebtoken";

// Doctor Authentication Middleware
const doctorAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "doctor") {
      return res
        .status(403)
        .json({ error: "Access denied. Doctor role required." });
    }

    // req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Doctor authentication error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default doctorAuth;
