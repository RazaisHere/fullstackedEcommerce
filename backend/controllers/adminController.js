const jwt = require("jsonwebtoken");
require('dotenv').config();
const adminLogin = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  console.log("Admin Email:", adminEmail, "Admin Password:", adminPassword);

  if (adminEmail === process.env.ADMIN_EMAIL && adminPassword === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ adminEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
};


module.exports = { adminLogin };
