import role from "../models/role.js";

export const createRole = async (data) => {
  return await role.create(data);
};

export const getRoles = async (companyId) => {
  return await role.find({ companyId });
};

export const getRoleById = async (id, companyId) => {
  return await role.findById({ _id: id, companyId });
};

export const updateRole = async (id, companyId, data) => {
  return await role.findByIdAndUpdate({ _id: id, companyId }, data, { new: true });
};

export const deleteRole = async (id, companyId) => {
  return await role.findByIdAndDelete({ _id: id, companyId });
};
