import Order from "../model/orderModel.js";
import razorpay from 'razorpay';
import dotenv from 'dotenv';
import User from '../model/userModel.js';

// Ensure environment variables are loaded
dotenv.config();

let razorpayInstance;
try {
  if (process.env.Test_Key_ID && process.env.Test_Key_Secret) {
    razorpayInstance = new razorpay({
      key_id: process.env.Test_Key_ID,
      key_secret: process.env.Test_Key_Secret,
    });
    console.log('Razorpay initialized successfully');
  } else {
    console.log('Razorpay keys not found in environment variables');
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error.message);
}

const currency = 'inr';


//for user


export const placeOrder = async (req, res) => {
    try {
        const { address, items, amount, paymentMethod } = req.body;
        const userId = req.user.id;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod,
            payment: paymentMethod === 'cod' ? false : true
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        res.status(200).json({
            success: true,
            message: "Order placed successfully!",
            orderId: newOrder._id
        });

    } catch (error) {
        console.error('Order placement error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to place order. Please try again."
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders."
        });
    }
};




//for admin



export const AllOrders = async (req, res) => {
    try {   
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders."
        });
    }
}    



export const placeOrderRazorpay = async (req, res) => {
    try {
        if (!razorpayInstance) {
            return res.status(500).json({
                success: false,
                message: "Razorpay not configured. Please contact admin."
            });
        }

        const { address, items, amount, paymentMethod } = req.body;
        const userId = req.user.id;
        const orderData = {
            userId,
            amount,
            items,
            address,
            paymentMethod: 'razorpay',
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to create Razorpay order."
                });
            }
            res.status(200).json({
                success: true,
                message: "Order placed successfully!",
                orderId: newOrder._id,
                razorpayOrder: order
            });
        });

    } catch (error) {
        console.error('Order placement error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to place order. Please try again."
        });
    }
};  

        




export const updateOrderStatus = async (req, res) => {
    try {   
        const {orderId, status} = req.body;

        await Order.findByIdAndUpdate(orderId, {status});

        res.status(200).json({
            success: true,
            message: "Order status updated successfully!"
        });

    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update order status."
        });
    }
};



export const verifyRazorpay = async (req, res) => {
    try {
        if (!razorpayInstance) {
            return res.status(500).json({
                success: false,
                message: "Razorpay not configured."
            });
        }

        const { payment_id, order_id, signature } = req.query;
        
        const orderInfo = await razorpayInstance.orders.fetch(order_id);
        if (orderInfo && orderInfo.status === 'paid') {
            const updatedOrder = await Order.findByIdAndUpdate(orderInfo.receipt, { 
                payment: true,
                razorpayPaymentId: payment_id,
                razorpayOrderId: order_id
            }, { new: true });
            
            // Generate invoice after successful payment
            try {
                const invoice = await generateInvoice(updatedOrder);
                res.status(200).json({
                    success: true, 
                    message: "Payment verified and order placed successfully!",
                    invoiceUrl: invoice.short_url
                });
            } catch (invoiceError) {
                console.error('Invoice generation error:', invoiceError);
                res.status(200).json({success: true, message: "Payment verified and order placed successfully!"});
            }
        } else {
            res.status(400).json({success: false, message: "Payment not verified."});
        }
    } catch (error) {
        console.error('Razorpay verification error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to verify payment."
        });
    }
};

const generateInvoice = async (order) => {
    if (!razorpayInstance) throw new Error('Razorpay not configured');
    
    const invoiceData = {
        type: 'invoice',
        description: `Invoice for Order #${order._id}`,
        partial_payment: false,
        customer: {
            name: `${order.address.firstName} ${order.address.lastName}`,
            email: order.address.email,
            contact: order.address.phone
        },
        line_items: [{
            name: 'Order Total',
            description: `Order #${order._id}`,
            amount: order.amount * 100,
            currency: 'INR',
            quantity: 1
        }],
        sms_notify: 0,
        email_notify: 1,
        currency: 'INR',
        expire_by: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
    };
    
    return await razorpayInstance.invoices.create(invoiceData);
};


    