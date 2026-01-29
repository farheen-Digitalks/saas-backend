import User from "../models/platformUser.js";
import bcrypt from "bcryptjs";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../services/user.js";
import { generateToken } from "../utils/jwt.js";

export const createUserHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ message: "User exists with this email" });
    }

    const user = await createUser({
      name,
      email,
      password,
      role,
      companyId: req.user.companyId, // 🔥 FROM JWT
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};


export const getUsersHandler = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const users = await getUsers(companyId);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const id = req.params.id;
    const user = await getUser(id, companyId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const companyId = req.user.companyId;
    const user = await updateUser(id, req.body, companyId, req.body);
    if (user) {
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const companyId = req.user.companyId;
    const user = await deleteUser(id, companyId);
    if (user) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      id: user._id,
      email: user.email,
      password: user.password,
      role: user.role,
      token: token,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
