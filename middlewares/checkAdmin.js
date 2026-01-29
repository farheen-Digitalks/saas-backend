// export const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ msg: "Only admin is authorized to create user." });
//   }
//   next();
// };

export const isAdmin = (req, res, next) => {
  if (!req.user.isSuperAdmin) {
    return res
      .status(403)
      .json({ msg: "Only admin is authorized to view requests." });
  }
  next();
};

