import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Company from "../models/company.js";
import User from "../models/platformUser.js";
import { getCompanyByEmail } from "../services/company.js";
import {
  getPlatformUserByEmail,
  updatePlatformUser,
} from "../services/platformUser.js";
import PlatformUser from "../models/platformUser.js";

export const register = async (req, res) => {
  try {
    const { companyName, companyEmail, name, email, password, role } = req.body;

    const existingCompany = await getCompanyByEmail(companyEmail);
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company with this email already exists" });
    }

    const existingUser = await getPlatformUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await PlatformUser.create({
      // companyId: company._id,
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (admin) {
      const company = await Company.create({
        name: companyName,
        email: companyEmail,
        plan: "FREE",
      });

      const updateUser = await updatePlatformUser(admin._id, {
        companyId: company._id,
      });

      res.status(200).json({
        message: "Registration successful of company and admin user",
        admin,
        updateUser,
        company,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await PlatformUser.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: "Invalid password" });

  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      companyId: user.companyId,
      role: user.role,
      isSuperAdmin: user.isSuperAdmin,
    },
    process.env.JWT_SECRET_KEY,
  );

  res
    .cookie(
      "authUser",
      JSON.stringify({
        id: user._id,
        isSuperAdmin: user.isSuperAdmin,
      }),
      {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      },
    )
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json({
      message: "Login successful",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        companyId: user.companyId,
        role: user.role,
        isSuperAdmin: user.isSuperAdmin,
      },
      token,
    });
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .clearCookie("authUser", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};
