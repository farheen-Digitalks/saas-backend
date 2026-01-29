import Company from "../models/company.js";

export const getAllCompany = async () => {
  try {
    return await Company.find();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyById = async (id) => {
  try {
    return await Company.findById(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyByEmail = async (email) => {
  try {
    return await Company.findOne({ email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};