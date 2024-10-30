const OrderModel = require('../models/OrderModel');
const orderModel = require('../models/OrderModel');
const userModel = require('../models/userModel');

require('dotenv').config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const currency = "PKR";
const deliveryCharges = 100;

// Cash on Delivery
const placeOrderCOD = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const order = await orderModel.create(orderData);
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const placeOrderStripe = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const order = await orderModel.create(orderData);

        const lineItems = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        lineItems.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error('Error placing order with Stripe:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const verifyStripe=async(req,res)=>{
    const {orderId,success}=req.body;
    const userId = req.userId;
    try {
        if(success==="true"){
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({
                success: true
            })
            
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false
                })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Display all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Fetch user-specific orders
const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({
            success: true,
            message: "Status updated successfully",
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { verifyStripe,placeOrderCOD, placeOrderStripe, getAllOrders, updateStatus, userOrders };
