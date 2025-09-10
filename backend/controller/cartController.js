import User from '../model/userModel.js';

export const AddToCart = async(req ,res) => {
    try{
        const {itemId, size} = req.body;
        
        // Check if it's admin (email-based ID)
        if (req.user.email === process.env.ADMIN_EMAIL) {
            return res.status(403).json({message: "Admin cannot add items to cart"});
        }
        
        const userData = await User.findById(req.user.id);

        //check if user exists
        if (!userData){
            return res.status(404).json({message: "User not found"});
        }

        //ensure cartdata is initialized
        let cartData = userData.cardData || {};
        if (cartData[itemId]){  
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await User.findByIdAndUpdate(req.user.id, {cardData: cartData});
        res.status(200).json({message: "Item added to cart"});
    }catch(err){
        res.status(500).json({message: "Internal server error"});
        console.log(err); 
    }
}



export const UpdateCart = async(req ,res) => {
    try{
        const {itemId, size, quantity} = req.body;
        
        // Check if it's admin (email-based ID)
        if (req.user.email === process.env.ADMIN_EMAIL) {
            return res.status(403).json({message: "Admin cannot update cart"});
        }
        
        const userData = await User.findById(req.user.id)
        let cartData = userData.cardData || {};

        cartData[itemId][size] = quantity;
        await User.findByIdAndUpdate(req.user.id, {cardData: cartData});
        res.status(200).json({message: "Cart updated successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}
 

export const getUserCart = async(req ,res) => {
    try{
        // Check if it's admin (email-based ID)
        if (req.user.email === process.env.ADMIN_EMAIL) {
            return res.status(200).json({cart: {}});
        }
        
        const userData = await User.findById(req.user.id);
        let cartData = userData.cardData || {};
        res.status(200).json({cart: cartData});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }   
}

export const clearCart = async(req, res) => {
    try{
        // Check if it's admin (email-based ID)
        if (req.user.email === process.env.ADMIN_EMAIL) {
            return res.status(403).json({message: "Admin cannot clear cart"});
        }
        
        await User.findByIdAndUpdate(req.user.id, {cardData: {}});
        res.status(200).json({message: "Cart cleared successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}