import permission from "../models/permission.js";

export const createPermission = async (data) => {
    return await permission.create(data);
}

export const getPermission = async (companyId) => {
    return await permission.find({ companyId });
}

export const getPermissionById = async (id, companyId) => {
    return await permission.findById({ _id: id, companyId});
}

export const updatePermission = async (id, companyId, data) => {
    return await permission.findByIdAndUpdate({ _id: id, companyId }, data, { new: true });
}

export const deletePermission = async (id, companyId) => {
    return await permission.findByIdAndDelete({ _id: id, companyId });
}