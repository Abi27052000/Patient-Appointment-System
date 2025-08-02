import jwt from "jsonwebtoken";

// User Authentication Middleware
const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res
        .status(403)
        .json({ error: "Access denied. User role required." });
    }

    // req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("User authentication error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default userAuth;
