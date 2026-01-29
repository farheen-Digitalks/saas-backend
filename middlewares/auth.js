import { verifyToken } from "../utils/jwt.js";


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

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
