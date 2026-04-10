import bcrypt from "bcryptjs";
import Company from "../models/company.js";
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
