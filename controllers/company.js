import { getAllCompany, getCompanyByEmail, getCompanyById } from "../services/company";

export const getCompanies = async (req, res) => {
  try {
    const companies = await getAllCompany();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await getCompanyById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyByemail = async (req, res) => {
  try {
    const email = req.body.email;
    const company = await getCompanyByEmail(email);
    if (!company) {
      return res.status(404).json({ message: "Company with this email not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
