const mongoose = require("mongoose")
require('dotenv').config();
const connectDB = async()=>{
    
await mongoose.connect(`${process.env.MONGODB_URI}/e-comm`)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("Mongo"))
}

module.exports=connectDB;