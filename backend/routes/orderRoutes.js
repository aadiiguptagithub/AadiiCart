import express from 'express';
import isAuth from '../midlleware/isAuth.js';
import { placeOrder, getUserOrders, AllOrders, updateOrderStatus } from '../controller/orderController.js';
import adminAuth from '../midlleware/adminAuth.js';
import { placeOrderRazorpay } from '../controller/orderController.js';
import { verifyRazorpay } from '../controller/orderController.js';

const orderRouter = express.Router();

//for user

orderRouter.post('/placeorder', isAuth, placeOrder);
orderRouter.post('/razorpay', isAuth, placeOrderRazorpay);
orderRouter.get('/userorders', isAuth, getUserOrders);
orderRouter.get('/verifyrazorpay', isAuth, verifyRazorpay);

//for admin 

orderRouter.get('/list',adminAuth, AllOrders);
orderRouter.post('/status',adminAuth, updateOrderStatus);


export default orderRouter;