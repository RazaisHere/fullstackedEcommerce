const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Please login first" });
  }

  const token = authHeader.split(" ")[1];

  try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      if (token_decode.adminEmail !== process.env.ADMIN_EMAIL) {
          return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
      }
      next();
  } catch (error) {
      return res.status(401).json({ success: false, message: "Token verification failed" });
  }
};

module.exports = adminAuth;
