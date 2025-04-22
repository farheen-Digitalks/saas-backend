const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", UserController.createUsers);
router.get("/get", UserController.getAllUsers);
router.get("/getById/id", UserController.getUserById);
router.patch("/update/:id", UserController.updateUserById);
router.delete("/delete/:id", UserController.deleteUserById);

module.exports = router;