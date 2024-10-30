const mongoose = require("mongoose");

const orderModel = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    items: { type: Array, required:true },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Order Placed"
    },
    paymentMethod:{
        type:String,
        required:true
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Number,
        required:true
    }


})
module.exports = mongoose.model("Order", orderModel);