import express from "express";
import cors from "cors";
import { connectDB } from "./config/connecDb.js";

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // frontend
    credentials: true, // ⭐ required
  })
);
app.use(express.json());


// app.post("/api/users", (req, res) => {
//   const user = req.body;
//   console.log("Received user:", user);
//   res.status(200).json({ message: "User received", user });
// });

import allRoutes from "./routes/index.js";
app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("SaaS API running");
});

export default app;