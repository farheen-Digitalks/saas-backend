import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = process.env.JWT_SECRET_KEY;
  let expiresIn = "1h";
  if (user.role === "admin") {
    expiresIn = "30d";
  }
  if (user.role === "seller") {
    expiresIn = "7d";
  }
  if (user.role === "buyer") {
    expiresIn = "60m";
  }
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, token, {
    expiresIn,
  });
};

export const verifyToken = (token) => {
  const TOKEN = process.env.JWT_SECRET_KEY;
  return jwt.verify(token, TOKEN);
};
