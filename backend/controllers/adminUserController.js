
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const getAllUser=async(req,res)=>{
    try {
        const users = await userModel.find({});
        res.json({
            success: true,
            message: "Users Listed Successfully",
            Users: users
          });
    } catch (error) {
        res.json({
            success: false,
            message: "Error Occured",
        })
    }
}
const removeUser=async(req,res)=>{
  try {
    const {id}=req.body;
    await userModel.findByIdAndDelete(id);
    res.json({
        success:true,
        message:"User Removed"
    })
  } catch (error) {
    res.json({
        success:false,
        message:"Error Occured"
    })
  }
}



const adduser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user with the hashed password
      const user = await userModel.create({ firstname, lastname, email, password: hashedPassword });
      await user.save();

      res.json({
        success: true,
        message: "User Added Successfully",
        user,
      });
    } else {
      res.json({
        success: false,
        message: "User Already Exists",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {getAllUser,removeUser,adduser};