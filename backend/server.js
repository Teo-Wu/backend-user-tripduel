import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS for frontend (React on port 5173)
app.use(cors({
    origin: [
    "https://teo-wu.github.io",
    "http://localhost:5173", // Vite
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // for jwt protected info like profile

app.listen(5000, () => console.log("Server running on port 5000"));
