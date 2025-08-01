import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const adminToken = req.headers.admint;

    oken;
    console.log("Admin token:", adminToken);
    if (!adminToken) {
      console.log("No admin token provided");
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const jwt_decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (jwt_decoded !== adminEmail + adminPassword) {
      return res.status(403).json({ error: "Forbidden access" });
    }

    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default adminAuth;
