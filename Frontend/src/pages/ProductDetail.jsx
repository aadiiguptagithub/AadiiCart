import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../contex/ShopContext.jsx'
import { authDataContext } from '../contex/AuthContex.jsx'
import { FaStar } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'

function ProductDetail() {
  const { id } = useParams()
  const { products, loading, addToCart, addingToCart } = useContext(ShopContext)
  const { serverUrl } = useContext(authDataContext)
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [activeTab, setActiveTab] = useState('description')
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p._id === id)
      setProduct(foundProduct)
      if (foundProduct) {
        fetchReviews(foundProduct._id)
      }
    }
  }, [id, products])

  const fetchReviews = async (productId) => {
    // Reviews API not implemented yet
    setReviews([])
    setReviewsLoading(false)
  }

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  const images = [product.image, product.image1, product.image2, product.image3].filter(Boolean)
  const sizes = ['S', 'M', 'L', 'XL']
  
  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4)

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
      
      <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnail Images */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-colors ${
                    selectedImage === index ? 'border-cyan-400' : 'border-gray-600'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {product.name.toUpperCase()}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-300 ml-2">(124)</span>
              </div>
              
              {/* Price */}
              <div className="text-3xl font-bold text-white mb-6">
                ₹ {product.price?.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Best quality and daily use Product and Stylish, breathable cotton shirt with a modern slim fit. 
                Easy to wash, super comfortable, and designed for effortless style.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Select Size</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded border-2 transition-colors ${
                      selectedSize === size
                        ? 'border-cyan-400 bg-cyan-400 text-gray-900'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  toast.error('Please select a size first!');
                  return;
                }
                addToCart(product._id, selectedSize);
              }}
              disabled={addingToCart}
              className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-teal-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {addingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                'Add To Cart'
              )}
            </button>

            {/* Product Info */}
            <div className="border-t border-gray-700 pt-6 space-y-2">
              <p className="text-gray-300 text-sm">100% Original Product.</p>
              <p className="text-gray-300 text-sm">Cash on delivery is available on this product</p>
              <p className="text-gray-300 text-sm">Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>

        {/* Description and Reviews Section */}
        <div className="mt-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-700">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'description'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed">
                  {product.description || 
                    "Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on AadiiCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function."}
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="border border-gray-700 rounded-lg p-6">
                {reviewsLoading ? (
                  <div className="text-center text-gray-400">Loading reviews...</div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-300 ml-2 font-medium">{review.userName}</span>
                          <span className="text-gray-500 ml-2 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    No reviews yet. Be the first to review this product!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-wider">
            RELATED PRODUCTS
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => {
                  setProduct(relatedProduct)
                  setSelectedImage(0)
                  setSelectedSize('M')
                  window.scrollTo(0, 0)
                }}
              >
                <div className="bg-white rounded-lg mb-3 h-40 flex items-center justify-center overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-white font-medium text-sm mb-2 truncate">
                  {relatedProduct.name}
                </h3>
                <p className="text-cyan-400 font-bold">
                  ₹ {relatedProduct.price?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetail