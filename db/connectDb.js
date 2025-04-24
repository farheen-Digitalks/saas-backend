const mongoose = require("mongoose");
require('dotenv').config();

let connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
            // const port = process.env.PORT || 3001;
            console.log("Database connected successfully");
    }catch(error){
        console.log("Connection errro occured :", error);
    }
}

module.exports = {connectDb} ;