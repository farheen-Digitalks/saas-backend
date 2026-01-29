import mongoose from "mongoose";
import createSuperAdmin from "../seeder/superadmin.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected successfully");
    await createSuperAdmin();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
