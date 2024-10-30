const express= require("express");
const cors= require("cors")
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");
const userRouter = require("./router/userRoute");
const cartRouter = require("./router/cartRouter")
const adminRouter = require("./router/adminRouter")
const productRouter = require("./router/productRouter");
const connectCloudinary = require("./config/cloudinary");
const adminUserRouter = require("./router/adminUserRouter");
const orderRouter = require("./router/orderRouter");
dotenv.config();
const app = express();
const port = process.env.port || 5000;

//config cloudinary
connectCloudinary()
//middlewares

app.use(express.json());
app.use(cors())
// app.use(cors({
//     origin: (origin, callback) => {
//         const allowedOrigins = ["http://192.168.18.16:3000", "http://192.168.18.16:5173"];
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, origin);
//         } else {
//             callback(new Error('CORS policy: No access'));
//         }
//     },
//     credentials: true // Again, optional depending on your needs
// }));

 // Adjust to match your frontend's IP

//connecting DB
connectDB()
//Routes
app.use("/api/users",userRouter)
app.use("/api/cart",cartRouter)
app.use("/admin/",adminRouter)
app.use("/admin/products",productRouter)
app.use("/admin/users",adminUserRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

