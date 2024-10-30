const express = require("express");
const { addToCart, updateCart, getUserCart } = require("../controllers/cartController");
const verifyUser = require("../middleware/auth");

const cartRouter = express.Router();
cartRouter.post("/addToCart", verifyUser, addToCart);
cartRouter.post("/updatecart", verifyUser, updateCart);
cartRouter.post("/getcart", verifyUser, getUserCart);

module.exports = cartRouter;