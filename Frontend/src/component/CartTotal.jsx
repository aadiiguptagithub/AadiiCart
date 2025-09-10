import React, { useContext } from 'react'
import { ShopContext } from '../contex/ShopContext.jsx'
import { useNavigate } from 'react-router-dom'

function CartTotal() {
  const { getCartAmount } = useContext(ShopContext)
  const navigate = useNavigate()
  
  const subtotal = getCartAmount()
  const shippingFee = subtotal > 0 ? 40 : 0
  const total = subtotal + shippingFee

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-wider">
        CART TOTALS
      </h2>
      
      <div className="border border-gray-600 rounded-lg p-6 mb-8 bg-gray-800/30">
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-600">
            <span className="text-gray-300 text-lg">Subtotal</span>
            <span className="text-white text-lg font-semibold">₹ {subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-600">
            <span className="text-gray-300 text-lg">Shipping Fee</span>
            <span className="text-white text-lg font-semibold">₹ {shippingFee}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 pt-4">
            <span className="text-white text-xl font-bold">Total</span>
            <span className="text-white text-xl font-bold">₹ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/place-order')}
        disabled={subtotal === 0}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-teal-500/25 disabled:cursor-not-allowed"
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  )
}

export default CartTotal