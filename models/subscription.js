import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "active", "expired", "cancelled"],
      default: "pending",
    },

    autoRenew: {
      type: Boolean,
      default: false,
    },

    paymentProvider: {
      type: String,
      enum: ["razorpay", "stripe", "manual"],
      default: "manual",
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "failed"],
      default: "unpaid"
    },

    amount: {
      type: Number,
      required: true
    },

    modules: [{
      type: String
    }]

  },
  { timestamps: true },
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
