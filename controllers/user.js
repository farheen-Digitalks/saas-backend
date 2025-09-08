import User from "../models/user.js";
import bcrypt from "bcryptjs";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../services/user.js";
import { generateToken } from "../utils/jwt.js";

export const createUserHandler = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ message: "User exist with this email" });
    }

    const user = await createUser(req.body);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const getUsersHandler = async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" });
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
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
    const user = await deleteUser(req.params.id);
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      id: user._id,
      email: user.email,
      password: user.password,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
