import { getuser, getuserById } from "../services/platformUser.js";

export const getPlatformUsersHandler = async (req, res) => {
  try {
    // console.log("Req user", req.user);
    // const companyId = req.user.companyId;
    // const user = await getuser(companyId);
    // return res.status(200).json(user);
    return res.status(200).json(req.paginatedResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const id = req.params.id;
    const user = await getuserById(id, companyId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};
