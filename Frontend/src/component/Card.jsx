import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ product, onAddToCart, className = "" }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/product/${product._id}`)
  }

  return (
    <div 
      className={`bg-slate-800/60 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl group cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="bg-white rounded-xl m-4 h-64 flex items-center justify-center overflow-hidden">
        <img
          src={product.image1 || product.image}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="px-5 pb-5">
        <h3 className="text-slate-100 text-lg font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-200 text-xl font-bold">
            ₹ {product.price?.toLocaleString()}
          </span>
          
          {/* Category Badge */}
          <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
            {product.category}
          </span>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card