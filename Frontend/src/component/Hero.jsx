import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa'

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const slides = [
    {
      id: 1,
      title: "Explore Our Best",
      subtitle: "Collection",
      cta: "Shop Now!",
      description: "Discover premium fashion that defines your style",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
      bgColor: "from-slate-900 via-slate-800 to-slate-900"
    },
    {
      id: 2,
      title: "New Fashion",
      subtitle: "Trends 2024",
      cta: "Discover Now!",
      description: "Stay ahead with the latest fashion trends",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop",
      bgColor: "from-indigo-900 via-purple-800 to-indigo-900"
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Best Prices",
      cta: "Shop Today!",
      description: "Luxury fashion at unbeatable prices",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop",
      bgColor: "from-emerald-900 via-teal-800 to-emerald-900"
    }
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])
  
  const handleSlideChange = (newSlide) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(typeof newSlide === 'function' ? newSlide(currentSlide) : newSlide)
    setTimeout(() => setIsAnimating(false), 800)
  }
  
  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % slides.length)
  }
  
  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length)
  }
  
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
      </div>
      
      {slides.map((slide, index) => {
        const isActive = index === currentSlide
        const isPrev = index === (currentSlide - 1 + slides.length) % slides.length
        const isNext = index === (currentSlide + 1) % slides.length
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              isActive ? 'opacity-100 scale-100' : 
              isPrev ? 'opacity-0 scale-95 -translate-x-full' :
              isNext ? 'opacity-0 scale-95 translate-x-full' :
              'opacity-0 scale-90'
            }`}
          >
            <div className={`h-full bg-gradient-to-br ${slide.bgColor} relative overflow-hidden`}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-teal-400 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-400 rounded-full opacity-10 animate-bounce"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400 rounded-full opacity-10 animate-ping"></div>
              </div>
              
              <div className="container mx-auto px-4 lg:px-8 h-full pt-24 md:pt-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                  {/* Content */}
                  <div className={`text-white space-y-4 lg:space-y-6 order-2 lg:order-1 transform transition-all duration-1000 delay-300 ${
                    isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                  }`}>
                    <div className="space-y-3">
                      <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                          {slide.title}
                        </span>
                        <span className="block mt-1 text-white">
                          {slide.subtitle}
                        </span>
                        <span className="block text-xl md:text-2xl lg:text-4xl xl:text-5xl mt-2 text-orange-400">
                          {slide.cta}
                        </span>
                      </h1>
                      <p className="text-sm md:text-base lg:text-lg text-gray-300 max-w-md">
                        {slide.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pb-20 md:pb-0">
                      <button className="group bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-full font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
                        Shop Collection
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-5 py-2.5 lg:px-6 lg:py-3 rounded-full font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105">
                        View Catalog
                      </button>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className={`order-1 lg:order-2 flex justify-center transform transition-all duration-1000 delay-500 ${
                    isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                  }`}>
                    <div className="relative group">
                      <div className="absolute -inset-3 bg-gradient-to-r from-teal-400 to-orange-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 z-20 group disabled:opacity-50"
      >
        <FaChevronLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
      </button>
      
      <button 
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 z-20 group disabled:opacity-50"
      >
        <FaChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-8 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            disabled={isAnimating}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? 'w-12 h-4 bg-orange-500 shadow-lg shadow-orange-500/50' 
                : 'w-4 h-4 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-gradient-to-r from-teal-400 to-orange-400 transition-all duration-6000 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

export default Hero