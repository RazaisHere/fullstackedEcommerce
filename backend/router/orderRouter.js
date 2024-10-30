const express = require("express");
const orderRouter = express.Router();
const {verifyStripe, placeOrderCOD, placeOrderStripe, getAllOrders, updateStatus, userOrders } = require("../controllers/orderController");
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');

// Admin features
orderRouter.get("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// User features
orderRouter.post("/placeOrder", auth, placeOrderCOD);
orderRouter.post("/placeOrderStripe", auth, placeOrderStripe);
orderRouter.get("/userorders", auth, userOrders);
//verify payment
orderRouter.post("/verifyPayment", auth, verifyStripe);
module.exports = orderRouter; 
