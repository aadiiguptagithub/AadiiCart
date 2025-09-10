import React, { useContext } from 'react'
import { ShopContext } from '../contex/ShopContext.jsx'
import { UserContext } from '../contex/UserContex.jsx'
import Card from './Card.jsx'

function LatestCollection() {
  const { getLatestProducts, loading } = useContext(ShopContext)
  const { addToCart } = useContext(UserContext)
  const products = getLatestProducts(4)
  
  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-800/60 p-4 animate-pulse">
                <div className="bg-slate-700 h-64 rounded-xl mb-4"></div>
                <div className="bg-slate-700 h-4 rounded mb-2"></div>
                <div className="bg-slate-700 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-16 lg:py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-slate-100">LATEST </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400">COLLECTIONS</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-300">
            Step Into Style – New Collection Dropping This Season!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Optional: View All */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-full bg-slate-800 text-slate-100 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-colors">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  )
}

export default LatestCollection