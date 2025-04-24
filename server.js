const express = require("express");
const {connectDb} = require("./db/connectDb");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
    // origin: process.env.CORS_ORIGIN, // your frontend URL
    origin: 'http://localhost:5173',
    credentials: true
  }));

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });  
  
app.use(express.json());

const AllRoutes = require("./routes/routers");

app.use("/api", AllRoutes);

connectDb();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});