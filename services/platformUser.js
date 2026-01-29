import PlatformUser from "../models/platformUser.js";

export const getuser = async (companyId) => {
  return await PlatformUser.find({ companyId: companyId });
};

export const getuserById = async (id, companyId) => {
  return await PlatformUser.findById({ _id: id, companyId: companyId });
};

export const getPlatformUserByEmail = async (email, companyId) => {
  return await PlatformUser.findOne({ email, companyId });
};

export const updatePlatformUser = async (id, updateData) => {
  return await PlatformUser.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
};
