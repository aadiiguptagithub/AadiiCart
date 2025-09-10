import React from 'react'
import NewLetterBox from '../component/NewLetterBox.jsx'

function About() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
            ABOUT US
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Product Image */}
          <div className="relative">
            <div className="bg-gray-200 rounded-lg p-8 relative overflow-hidden">
              {/* Clothing Items */}
              <div className="flex justify-center items-end space-x-2 mb-8">
                <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=120&fit=crop" alt="Brown Dress" className="w-16 h-20 object-cover rounded" />
                <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=120&fit=crop" alt="Gray Hoodie" className="w-16 h-20 object-cover rounded" />
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=120&fit=crop" alt="White Shirt" className="w-16 h-20 object-cover rounded" />
              </div>
              
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-gray-800">30%</span>
                <span className="text-xs font-semibold text-gray-600">OFF</span>
              </div>
              
              {/* Brand Info */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">AADIICART</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Slim fit cotton shirt, breathable<br/>
                  stylish, comfortable and<br/>
                  available in various colors
                </p>
                
                <div className="bg-gray-700 text-white rounded-lg p-3 inline-block">
                  <p className="font-semibold text-sm">SUITABLE FOR</p>
                  <p className="font-semibold text-sm">ALL BABIES</p>
                  <p className="text-xs text-gray-300 mt-1">www.aadiicart.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-300 leading-relaxed mb-4">
                AadiiCart born for smart, seamless shopping—created to deliver quality products, 
                trending styles, and everyday essentials in one place. With reliable service, fast delivery, 
                and great value, AadiiCart makes your online shopping experience simple, satisfying, 
                and stress-free.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Modern shoppers—combining style, convenience, and affordability. Whether it's 
                fashion, essentials, or trends, we bring everything you need to one trusted platform 
                with fast delivery, easy returns, and a customer-first shopping experience you'll love.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to redefine online shopping by delivering quality, affordability, and 
                convenience. AadiiCart connects customers with trusted products and brands, offering a 
                seamless, customer-focused experience that saves time, effort, and fits every 
                lifestyle and need.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider">
              WHY CHOOSE US
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality Assurance */}
            <div className="border border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-4">Quality Assurance</h3>
              <p className="text-gray-300 leading-relaxed">
                We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
              </p>
            </div>
            
            {/* Convenience */}
            <div className="border border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-4">Convenience</h3>
              <p className="text-gray-300 leading-relaxed">
                Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
              </p>
            </div>
            
            {/* Exceptional Customer Service */}
            <div className="border border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-4">Exceptional Customer Service</h3>
              <p className="text-gray-300 leading-relaxed">
                Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <NewLetterBox />
    </div>
  )
}

export default About