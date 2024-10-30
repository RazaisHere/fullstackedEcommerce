const express = require("express");
const productRouter = express.Router();
const upload = require('../middleware/multer');
const adminAuth = require("../middleware/adminAuth");
const { addProduct, listProduct, removeProduct, singleProduct } = require("../controllers/productController");

// Protect add, remove, and single routes with adminAuth middleware
productRouter.post("/add", adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", adminAuth, removeProduct);
// productRouter.post("/single", adminAuth, singleProduct);

module.exports = productRouter;
