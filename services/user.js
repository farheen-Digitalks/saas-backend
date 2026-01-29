import User from "../models/platformUser.js";
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  const { name, email, password, role } = data;

  const pass = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, pass);

  const user = User.create({
    name: name,
    email: email,
    password: hashedPass,
    role: role,
    companyId: data.companyId,
  });

  return user;
};

export const getUsers = async (id) => {
  return await User.find({ companyId: id });
};

export const getUserByEmail = async (email, companyId) => {
  return await User.findOne({ email, companyId });
};

export const getUser = async (id, companyId) => {
  return await User.findOne({ _id: id, companyId });
};

export const updateUser = async (id, data, companyId) => {
  return await User.findByIdAndUpdate({ _id: id, companyId }, data, { new: true });
};

export const deleteUser = async (id, companyId) => {
  return await User.findOneAndDelete({ _id: id, companyId });
};
