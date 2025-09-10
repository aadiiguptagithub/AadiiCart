import express from 'express';
import { AddToCart, getUserCart, UpdateCart, clearCart } from '../controller/cartController.js';
import isAuth from '../midlleware/isAuth.js';

const cartRouter = express.Router();

cartRouter.post('/add', isAuth, AddToCart);
cartRouter.get('/get', isAuth, getUserCart);
cartRouter.post('/update', isAuth, UpdateCart);
cartRouter.post('/clear', isAuth, clearCart);




export default cartRouter;