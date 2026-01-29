import {
  createPermission,
  deletePermission,
  getPermission,
  getPermissionById,
  updatePermission,
} from "../services/permission.js";

export const createPermissionHandler = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const permission = await createPermission({
      ...req.body,
      companyId,
    });
    return res.status(201).json({
      message: "Permission created successfully",
      permission,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating permission",
      error: error.message,
    });
  }
};

export const getPermissionsHandler = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const permissions = await getPermission(companyId);
    return res.status(200).json(permissions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPermissionByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const companyId = req.user.companyId;
    const permission = await getPermissionById(id, companyId);
    return res.status(200).json(permission);
  } catch (error) {
    return res.status(500).json({ message: "Permission not found" });
  }
};

export const updatePermissionHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const companyId = req.user.companyId;
    const permission = await updatePermission(id, companyId, req.body);
    if (permission) {
      return res
        .status(200)
        .json({ message: "Permission updated successfully", permission });
    } else {
      return res.status(404).json({ message: "Permission not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Permission not found" });
  }
};

export const deletePermissionHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const companyId = req.user.companyId;
    const permission = await deletePermission(id, companyId);
    if (permission) {
      return res
        .status(200)
        .json({ message: "Permission deleted successfully" });
    } else {
      return res.status(404).json({ message: "Permission not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
