import React, { createContext, useState, useContext } from 'react'

export const UserContext = createContext()

function UserContex({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [wishlist, setWishlist] = useState([])

    const addToCart = (product, size = 'M', quantity = 1) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item._id === product._id && item.size === size)
            if (existingItem) {
                return prev.map(item =>
                    item._id === product._id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, { ...product, size, quantity }]
        })
    }

    const removeFromCart = (productId, size) => {
        setCartItems(prev => prev.filter(item => !(item._id === productId && item.size === size)))
    }

    const updateCartQuantity = (productId, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, size)
            return
        }
        setCartItems(prev =>
            prev.map(item =>
                item._id === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item._id === product._id)
            if (exists) {
                return prev.filter(item => item._id !== product._id)
            }
            return [...prev, product]
        })
    }

    const value = {
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getCartTotal,
        getCartCount,
        toggleWishlist
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContex