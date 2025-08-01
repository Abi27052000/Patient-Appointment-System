import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routers/admin_router.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRouter);

connectDb();
// connectCloudinary();

app.get("/", (req, res) => {
  res.send("Welcome to the Patient Appointment System API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Home URL: http://localhost:${PORT}`);
});
