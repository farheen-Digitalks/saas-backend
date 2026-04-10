import PlatformUser from "../models/platformUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
