import TrialRequest from "../models/trialRequest.js";
import bcrypt from "bcryptjs";
import { generateTrialPassword } from "../utils/randomGenerator.js";
import { trialEmailTemplate } from "../constants/emailTemplate.js";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";

export const createTrialRequest = async (req, res) => {
  try {
    const { name, email, company_name, company_email, message } = req.body;

    const password = generateTrialPassword(company_name);
    console.log("password", password)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📦 Save trial request
    const trial = await TrialRequest.create({
      name,
      email,
      company_name,
      company_email,
      message,
      password: hashedPassword,
    });

    // const emailSent = await sendMail({
    //   to: company_email,
    //   subject: "Your Trial Access Is Ready 🚀",
    //   html: trialEmailTemplate({
    //     name,
    //     email,
    //     password,
    //     loginUrl: "http://localhost:3000/api/platformUser/login",
    //   }),
    // });

    // let emailsent = false;
    // if(emailSent){
    //   emailsent = true;
    // }

    res.status(201).json({
      success: true,
      message: "Trial request created successfully",
      trialId: trial._id,
      password
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRequests = async (req, res) => {
  const requests = await TrialRequest.find();

  if (!requests) {
    throw new Error("Requests not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Trial request found",
    requests,
  });
};

export const loginTrials = async (req, res) => {
  const { email, password } = req.body;

  const user = await TrialRequest.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: "Invalid password" });

  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      company_name: user.company_name,
      trial: true,
      isSuperAdmin: false,
    },
    process.env.JWT_SECRET_KEY,
  );

  res
    .cookie(
      "authUser",
      JSON.stringify({
        id: user._id,
        isSuperAdmin: false,
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
        company_name: user.company_name,
        trial: true,
        isSuperAdmin: false,
      },
      token,
    });
};
