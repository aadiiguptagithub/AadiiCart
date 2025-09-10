import express from 'express';
import { addProduct } from '../controller/productController.js';
import upload from '../midlleware/multer.js';
import adminAuth from '../midlleware/adminAuth.js';
import { removeProduct } from '../controller/productController.js';
import { listProduct } from '../controller/productController.js';



let productRoutes = express.Router();

productRoutes.post('/addproduct', upload.fields([
    {name:"image1", maxCount:1},
    {name:"image2", maxCount:1},
    {name:"image3", maxCount:1},
    {name:"image4", maxCount:1}
]), addProduct); 

productRoutes.get('/listproduct', listProduct);
productRoutes.delete('/removeproduct/:id',adminAuth, removeProduct);

export default productRoutes;   