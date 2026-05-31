import User from "../models/user.js";

export const checkPermission = (moduleName, actionName) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
      path: "role",
      populate: { path: "permissions" },
    });

    if (user.isAdmin) {
      return next();
    }

    const permission = user.role.permissions.find(
      (p) => p.module === moduleName,
    );

    if (!permission || !permission.actions[actionName]) {
      return res.status(403).json({
        message: `You are not authorized to access the module ${moduleName} to ${actionName}`,
      });
    }

    next();
  };
};
