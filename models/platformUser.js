import mongoose from "mongoose";

const platformUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    isSuperAdmin: { type: Boolean, default: false },
    phone: { type: String },
    age: { type: Number },
    gender: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
  },
  {
    timestamps: true,
  },
);

const PlatformUser = mongoose.model("platformUser", platformUserSchema);
export default PlatformUser;
