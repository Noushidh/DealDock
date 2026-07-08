import "./config/env.js"
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"

const app = express();

connectDb();

app.use(cors());

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api",productRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
