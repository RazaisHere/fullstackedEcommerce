const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const validator = require("validator");

//creating token 

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//Route for User login
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userModel.findOne({ email });
//         if (!user) return res.status(404).json({ success:false, message: "User not found" })
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({success:false, message: "Invalid password" })
//         const token = createToken(user._id);
//         res.json({
//             success: true,
//             token
//         })
//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }


// }
// Route for User login
// Route for User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }
        
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            userId: user._id  // Return userId in the response
        });
    } catch (error) {
        res.json({
            success: false, 
            message: error.message
        });
    }
};


//Route For user Register
const signupUser = async (req, res) => {
    try {
        const { firstname,lastname, email, password,confirmpassword } = req.body;
        if(password!==confirmpassword){
            return res.status(400).json({message:"password and confirm password should be same"})
        }
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            if (!validator.isEmail(email)) {
                return res.json({
                    success: false,
                    message: "Please enter a valid email"
                });
            }
            if (password.length < 8) {
                return res.json({
                    success: false,
                    message: "Please enter a strong password"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                firstname,
                lastname,
                email,
                password: hashedPassword
            })
            const savedUser = await newUser.save();
            const token = createToken(savedUser._id)
            res.json({
                success: true,
                token
            })


        }
        else {
            return res.status(400).json({ message: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating user"
        });

    }
}


module.exports = { loginUser, signupUser }