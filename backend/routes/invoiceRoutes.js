import express from 'express';
import isAuth from '../midlleware/isAuth.js';
import Order from '../model/orderModel.js';
import { generateSimpleInvoice } from '../utils/invoiceGenerator.js';

const invoiceRouter = express.Router();

invoiceRouter.get('/generate/:orderId', isAuth, async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        
        if (!order || order.userId !== req.user.id) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        const invoice = generateSimpleInvoice(order);
        res.status(200).json({ success: true, invoice });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to generate invoice' });
    }
});

export default invoiceRouter;