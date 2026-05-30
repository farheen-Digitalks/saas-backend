import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    durationInDays: {
      type: Number,
      required: true
    },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },

    maxUsers: {
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

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Plan = mongoose.model("Plan", planSchema);
export default Plan;