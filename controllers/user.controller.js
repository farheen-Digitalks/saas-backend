const Users = require("../model/user.model");

exports.createUsers = async (req, res) => {
    console.log("Incoming data:", req.body);  // This should show your frontend payload

    try {
        const user = new Users(req.body);
        await user.save();
        res.status(200).json({ status : "success"}, user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = async(req, res) => {
    try{
        const user = await Users.find();
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
};

exports.getUserById = async(req, res) => {
    try{
        const user = await Users.findById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({ message : "User not found" });
        }
    }catch(error){
        res.status(400).json({ message : error.message });
    }
};

exports.updateUserById = async(req, res) => {
    try{
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
        });
        if(user){
            res.status(200).json({ message : "User updated successfully" });
        }else{
            res.status(404).json({ message : "User not found "});
        }
    }catch(error){
        res.status(500).json({ message : error.messgae });
    }
};

exports.deleteUserById = async(req, res) => {
    try{
        const user = await Users.findByIdAndDelete(req.params.id);
        if(user){
            res.status(200).json({ messgae : "User deleted successfully" });
        }else{
            res.status(404).json({ message : "User not found" });
        }
    }catch(error){
        res.status(400).json({ message : error.message });
    }
};