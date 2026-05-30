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
      required: true,
    },
    password: { type: String },
    message: {
      type: String,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      default: null,
    },
    trial_period: { type: Number, default: 7 },
    status: {
      type: String,
      enum: ["trial", "converted", "cancelled"],
      default: "trial",
    },
  },
  { timestamps: true },
);

const TrialRequest = mongoose.model("TrialRequest", trialRequestSchema);
export default TrialRequest;
