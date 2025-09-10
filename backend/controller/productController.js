import uploadOnCloudinary from "../config/cloudinary.js"; 
import ProductModel from "../model/productModel.js";

export const addProduct = async (req, res) => {
    try{
        let{name, description,price,category,subcategory,size,bestseller} = req.body;
        let image1 = await uploadOnCloudinary (req.files.image1[0].path);
        let image2 = await uploadOnCloudinary (req.files.image2[0].path);
        let image3 = await uploadOnCloudinary (req.files.image3[0].path);
        let image4 = await uploadOnCloudinary (req.files.image4[0].path);

        let productData = {
            name,
            description,
            price: Number (price),
            category,
            subcategory,
            size: JSON.parse(size),
            bestseller:  bestseller === 'true'? true : false,
            date: Date.now(),
            image1,
             image2, 
             image3, 
             image4
        }
        const product = await ProductModel.create(productData);
        res.status(201).json({message: "Product added successfully", product});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


export const listProduct = async (req, res) => {
    try { 
        const products = await ProductModel.find();
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Product removed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}