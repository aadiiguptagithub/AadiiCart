import React, { createContext, useState, useEffect, useContext } from 'react'
import { authDataContext } from './AuthContex.jsx'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const ShopContext = createContext()

function ShopContextProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const { serverUrl, userData } = useContext(authDataContext)
    const [cartItem, setCartItem] = useState({})
    const [cartLoading, setCartLoading] = useState(false)
    const [addingToCart, setAddingToCart] = useState(false)

    const demoProducts = [
        {
            _id: '1',
            name: 'T-Shirt for Men',
            price: 1000,
            image1: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
            category: 'Men',
            subcategory: 'TopWear',
            date: Date.now() - 86400000
        },
        {
            _id: '2',
            name: 'Shirt for men',
            price: 1000,
            image1: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
            category: 'Men',
            subcategory: 'TopWear',
            date: Date.now() - 172800000
        },
        {
            _id: '3',
            name: 'Shirt for Men',
            price: 1500,
            image1: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
            category: 'Men',
            subcategory: 'TopWear',
            date: Date.now() - 259200000
        },
        {
            _id: '4',
            name: 'Dress for Women',
            price: 2000,
            image1: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
            category: 'Women',
            subcategory: 'TopWear',
            date: Date.now() - 345600000
        },
        {
            _id: '5',
            name: 'Kids T-Shirt',
            price: 800,
            image1: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop',
            category: 'Kids',
            subcategory: 'TopWear',
            date: Date.now() - 432000000
        },
        {
            _id: '6',
            name: 'Winter Jacket',
            price: 3000,
            image1: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
            category: 'Men',
            subcategory: 'WinterWear',
            date: Date.now() - 518400000
        }
    ]

    useEffect(() => {
        fetchProducts()
    }, [serverUrl])

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/product/listproduct`, {
                method: 'GET',
                credentials: 'include'
            })
            
            if (response.ok) {
                const data = await response.json()
                setProducts(data.products || demoProducts)
            } else {
                setProducts(demoProducts)
            }
        } catch (err) {
            console.log('API Error:', err)
            setProducts(demoProducts)
        } finally {
            setLoading(false)
        }
    }

    const getLatestProducts = (count = 10) => {
        return products
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, count)
    }

    const getBestSellers = (count = 5) => {
        return products
            .sort((a, b) => b.price - a.price)
            .slice(0, count)
    }

    const searchProducts = (query) => {
        if (!query.trim()) return products
        return products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(query.toLowerCase())
        )
    }

    const getProductsByCategory = (category) => {
        return products.filter(product => product.category === category)
    }

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error("Please select a size");
            return;
        }
        
        setAddingToCart(true);
        let cartData = structuredClone(cartItem);
        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);
        
        if(userData){
            try{
                let result = await axios.post(serverUrl + '/api/cart/add', {itemId, size}, {withCredentials: true});
                toast.success(result.data.message || "Item added to cart successfully!");
            }catch(err){
                console.log(err);
                if (err.response?.status === 403) {
                    toast.error("Admin cannot add items to cart. Please login as a regular user.");
                } else {
                    toast.error(err.response?.data?.message || "Error adding to cart");
                }
            }
        } else {
            toast.success("Item added to cart!");
        }
        setAddingToCart(false);
    }

    const getUserCart = async() => {
        try{
            let result = await axios.get(serverUrl + '/api/cart/get', {withCredentials: true});
            setCartItem(result.data.cart || {});
        }catch(err){
            console.log(err);
        }
    }

    const updateQualtity = async(itemId, size, quantity) => {
        setCartLoading(true);
        let cartData = structuredClone(cartItem);
        if (cartData[itemId] && cartData[itemId][size]){
            cartData[itemId][size] = quantity;
            setCartItem(cartData);
            if(userData){
                try{
                    let result = await axios.post(serverUrl + '/api/cart/update', {itemId, size, quantity}, {withCredentials: true});
                    toast.success(result.data.message || "Cart updated successfully!");
                }catch(err){
                    console.log(err);
                    toast.error(err.response?.data?.message || "Error updating cart");
                }
            } else {
                toast.success("Cart updated!");
            }
        }
        setCartLoading(false);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItem){
            for(const size in cartItem[itemId]){
                try{
                    if(cartItem[itemId][size] > 0){
                        totalCount += cartItem[itemId][size];
                    }
                }catch(err){
                    // Handle error silently
                }
            }
        }
        return totalCount;
    }


    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItem){
            let itemInfo = products.find(product => product._id === itemId);
            if (itemInfo) {
                for(const size in cartItem[itemId]){
                    try{
                        if(cartItem[itemId][size] > 0){
                            totalAmount += cartItem[itemId][size] * itemInfo.price;
                        }
                    }catch(err){
                        console.log(err);
                    }
                }
            }
        }
        return totalAmount;
    }

    const removeFromCart = async (itemId, size) => {
        setCartLoading(true);
        let cartData = structuredClone(cartItem);
        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
            setCartItem(cartData);
            
            if(userData){
                try{
                    let result = await axios.post(serverUrl + '/api/cart/update', {itemId, size, quantity: 0}, {withCredentials: true});
                    toast.success("Item removed from cart!");
                }catch(err){
                    console.log(err);
                    toast.error(err.response?.data?.message || "Error removing item");
                }
            } else {
                toast.success("Item removed from cart!");
            }
        }
        setCartLoading(false);
    }

    const clearCart = async () => {
        setCartItem({});
        if(userData){
            try{
                await axios.post(serverUrl + '/api/cart/clear', {}, {withCredentials: true});
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {
        if (userData) {
            getUserCart();
        }
    }, [userData])

    const value = {
        products,
        loading,
        searchQuery,
        setSearchQuery,
        getLatestProducts,
        getBestSellers,
        searchProducts,
        getProductsByCategory,
        fetchProducts,
        cartItem,
        addToCart,
        getCartCount,
        setCartItem,
        updateQualtity,
        getUserCart,
        getCartAmount,
        removeFromCart,
        clearCart,
        cartLoading,
        addingToCart
            
    }



    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider