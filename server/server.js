import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authController.js";

dotenv.config();

const app = express();

connectDb();

app.use(cors());

app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
