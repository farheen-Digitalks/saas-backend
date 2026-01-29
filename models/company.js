import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    plan: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
