import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connecDb.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

// app.post("/api/users", (req, res) => {
//   const user = req.body;
//   console.log("Received user:", user);
//   res.status(200).json({ message: "User received", user });
// });

import allRoutes from "./routes/index.js";

app.use("/api", allRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
