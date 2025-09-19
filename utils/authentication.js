import { verifyToken } from "./jwt.js";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).json({ message: "Authentication token required" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(404).json({ message: "Invalid token" });
    }

    const userId = decoded.id;
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
