import "./config/env.js"
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import { errorHandler } from "./middleware/errorHanling.js";

const app = express();

connectDb();

app.use(cors());

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api",productRoutes);
app.use("/api",checkoutRoutes);

app.use(errorHandler)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
