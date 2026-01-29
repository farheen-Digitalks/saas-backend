import mongoose from "mongoose";

const trialRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
    },
    company_email: {
      type: String,
      required: true
    },
    password: { type: String },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const TrialRequest = mongoose.model("TrialRequest", trialRequestSchema);
export default TrialRequest;
