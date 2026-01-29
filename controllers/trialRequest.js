import TrialRequest from "../models/trialRequest.js";
import bcrypt from "bcryptjs";
import { generateTrialPassword } from "../utils/randomGenerator.js";
import { trialEmailTemplate } from "../constants/emailTemplate.js";
import { sendMail } from "../utils/sendMail.js";

export const createTrialRequest = async (req, res) => {
  try {
    const { name, email, company_name, company_email, message } = req.body;

    const password = generateTrialPassword(company_name);
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

    const emailSent = await sendMail({
      to: company_email,
      subject: "Your Trial Access Is Ready 🚀",
      html: trialEmailTemplate({
        name,
        email,
        password,
        loginUrl: "https://yourdomain.com/login",
      }),
    });

    if(emailSent){
      
    }

    res.status(201).json({
      success: true,
      message: "Trial request created successfully",
      trialId: trial._id,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create trial request",
    });
  }
};

export const getRequests = async (req, res) => {
  const requests = await TrialRequest.find();

  if (!requests) {
    throw new Error("Requests not found", 404);
  }

  res.status(200).json({
    sucess: true,
    message: "Trial request sent successfully",
    requests,
  });
};
