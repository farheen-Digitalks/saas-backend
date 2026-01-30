import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, 
    },

    price: {
      type: Number,
      required: true, 
    },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },

    maxEmployees: {
      type: Number, 
      default: null,
    },

    modules: [
      {
        type: String,
      },
    ],

    features: [
      {
        type: String, // "Email notifications", "Reports", etc.
      },
    ],

    isTrialAvailable: {
      type: Boolean,
      default: false,
    },

    trialDays: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Plan", planSchema);
