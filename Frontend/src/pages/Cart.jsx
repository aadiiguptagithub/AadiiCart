import React, { useContext, useState } from 'react'
import { ShopContext } from '../contex/ShopContext.jsx'
import CartTotal from '../component/CartTotal.jsx'
import { FaTrash, FaTimes } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'

function Cart() {
  const { products, cartItem, updateQualtity, removeFromCart, cartLoading } = useContext(ShopContext)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  
  const handleDeleteClick = (itemId, size, productName) => {
    setItemToDelete({ itemId, size, productName })
    setShowConfirmDialog(true)
  }
  
  const confirmDelete = async () => {
    if (itemToDelete) {
      await removeFromCart(itemToDelete.itemId, itemToDelete.size)
      setShowConfirmDialog(false)
      setItemToDelete(null)
    }
  }
  
  const cancelDelete = () => {
    setShowConfirmDialog(false)
    setItemToDelete(null)
  }

  const cartData = []
  for (const itemId in cartItem) {
    for (const size in cartItem[itemId]) {
      if (cartItem[itemId][size] > 0) {
        cartData.push({
          _id: itemId,
          size: size,
          quantity: cartItem[itemId][size]
        })
      }
    }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#374151',
            color: '#fff',
            border: '1px solid #4B5563'
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff'
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wider mb-4">
            YOUR CART
          </h1>
        </div>

        {cartData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">Your cart is empty</div>
            <p className="text-gray-500 mb-8">Add some products to get started</p>
            <button 
              onClick={() => window.location.href = '/collection'}
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartData.map((item, index) => {
                const productData = products.find(product => product._id === item._id)
                if (!productData) return null

                return (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 bg-white rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img 
                          src={productData.image || productData.image1} 
                          alt={productData.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
                              {productData.name}
                            </h3>
                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-teal-400 text-lg font-bold">
                                ₹ {productData.price?.toLocaleString()}
                              </span>
                              <div className="bg-gray-700 border border-gray-600 px-3 py-1 rounded-lg">
                                <span className="text-gray-300 font-medium">{item.size}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quantity and Actions */}
                          <div className="flex items-center gap-4">
                            {/* Quantity Input */}
                            <div className="flex items-center">
                              <input 
                                type="number" 
                                min="1" 
                                value={item.quantity}
                                disabled={cartLoading}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1
                                  if (newQuantity > 0) {
                                    updateQualtity(item._id, item.size, newQuantity)
                                  }
                                }}
                                className="w-16 sm:w-20 bg-gray-700 border border-gray-600 text-white text-center py-2 px-3 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                            </div>
                            
                            {/* Delete Button */}
                            <button 
                              onClick={() => handleDeleteClick(item._id, item.size, productData.name)}
                              disabled={cartLoading}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {cartLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                              ) : (
                                <FaTrash className="text-lg" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Item Total */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                          <span className="text-gray-400">Item Total:</span>
                          <span className="text-white font-bold text-lg">
                            ₹ {(productData.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Cart Total */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartTotal />
              </div>
            </div>
          </div>
        )}
        
        {/* Loading Overlay */}
        {cartLoading && !showConfirmDialog && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 border border-gray-700">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              <span className="text-white font-semibold">Updating cart...</span>
            </div>
          </div>
        )}
        
        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Confirm Delete</h3>
                <button 
                  onClick={cancelDelete}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">
                Are you sure you want to remove <span className="font-semibold text-white">{itemToDelete?.productName}</span> from your cart?
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={cancelDelete}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={cartLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {cartLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Removing...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Cart