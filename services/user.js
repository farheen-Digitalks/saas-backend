import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  const { email, password, role } = data;

  const pass = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, pass);

  const user = User.create({
    email: email,
    password: hashedPass,
    role: role,
  });

  return user;
};

export const getUsers = async () => {
  return await User.find();
};

export const getUser = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (id) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
