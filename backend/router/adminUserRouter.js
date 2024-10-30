const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const {getAllUser,removeUser, adduser} = require("../controllers/adminUserController");
const adminUserRouter = express.Router();

adminUserRouter.get("/",adminAuth,getAllUser);
adminUserRouter.post("/remove",adminAuth,removeUser);
adminUserRouter.post("/adduser",adduser)
module.exports=adminUserRouter