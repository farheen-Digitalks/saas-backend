import bcrypt from "bcryptjs";
import PlatformUser from "../models/platformUser.js";

const createSuperAdmin = async () => {
  const exists = await PlatformUser.findOne({ isSuperAdmin: true });

  if (!exists) {
    const hashedPassword = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD,
      10,
    );

    await PlatformUser.create({
      name: "Platform Owner",
      email: process.env.SUPERADMIN_EMAIL,
      password: hashedPassword,
      isSuperAdmin: true,
    });

    console.log("✅ SuperAdmin created");
  } else {
    console.log("ℹ️ SuperAdmin already exists");
  }
};

export default createSuperAdmin;
