
const jwt =  require('jsonwebtoken');

const verifyUser = async (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.id;  
        console.log("User ID from token:", req.userId);
        next();     

    } catch (error) {

        console.log(error);
        res.status(401).json({ success: false, message: "Invalid token" });

    }
};

module.exports=verifyUser