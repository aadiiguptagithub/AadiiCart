import express from "express";
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";

// Load environment variables first
dotenv.config();

// Debug environment variables
console.log('Environment check:');
console.log('Test_Key_ID:', process.env.Test_Key_ID ? 'Present' : 'Missing');
console.log('Test_Key_Secret:', process.env.Test_Key_Secret ? 'Present' : 'Missing');
let port = process.env.PORT || 8000;


let app = express();

// CORS configuration
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://localhost:5175", 
        "http://localhost:5176",
        "https://aadiicart-frontend.onrender.com",
        /\.onrender\.com$/
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


// Root route
app.get("/", (req, res) => {
    res.json({ 
        message: "Welcome to E-commerce API", 
        status: "Server is running successfully",
        endpoints: {
            registration: "POST /api/auth/registration",
            login: "POST /api/auth/login"
        }
    });
});

app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRouter );
app.use("/api/contact", contactRouter);
app.use("/api/order", orderRouter);
app.use("/api/invoice", invoiceRouter);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
    connectDb();
})
