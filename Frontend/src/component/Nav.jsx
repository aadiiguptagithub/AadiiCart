import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authDataContext } from '../contex/AuthContex.jsx'
import { ShopContext } from '../contex/ShopContext.jsx'
import { FaSearch, FaShoppingCart, FaUser, FaTimes, FaBars } from 'react-icons/fa'
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineHome } from 'react-icons/hi'

function Nav() {
  const { userData, logout } = useContext(authDataContext)
  const { searchQuery, setSearchQuery, getCartCount } = useContext(ShopContext)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false) 
  const location = useLocation()
  const navigate = useNavigate()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white/90 backdrop-blur-lg border-b border-gray-200/50 py-4 fixed top-0 left-0 w-full z-[100] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <HiOutlineShoppingBag className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">AadiiCart</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-3">
            <Link to="/" className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive('/') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg' : 'bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 hover:shadow-md'
            }`}>HOME</Link>
            <Link to="/collection" className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive('/collection') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg' : 'bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 hover:shadow-md'
            }`}>COLLECTIONS</Link>
            <Link to="/about" className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive('/about') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg' : 'bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 hover:shadow-md'
            }`}>ABOUT</Link>
            <Link to="/contact" className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive('/contact') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg' : 'bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 hover:shadow-md'
            }`}>CONTACT</Link>
          </div>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/collection?search=true')}
              className="p-3 hover:bg-gray-200/80 rounded-full transition-all duration-300 transform hover:scale-110 group"
            >
              <FaSearch className="text-gray-600 text-lg group-hover:text-teal-500 transition-colors" />
            </button>
            
            {userData ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg font-semibold"
                >
                  {userData.name?.charAt(0).toUpperCase() || 'A'}
                </button>
                
                {showProfile && (
                  <div className="absolute right-0 top-14 bg-white/90 backdrop-blur-lg text-gray-800 rounded-xl shadow-2xl py-3 w-40 z-50 border border-gray-200/50">
                    <Link to="/orders" className="block px-5 py-3 hover:bg-gray-100/80 transition-colors font-medium" onClick={() => setShowProfile(false)}>Orders</Link>
                    <Link to="/about" className="block px-5 py-3 hover:bg-gray-100/80 transition-colors font-medium" onClick={() => setShowProfile(false)}>About</Link>
                    <button onClick={() => { logout(); setShowProfile(false) }} className="block w-full text-left px-5 py-3 hover:bg-red-50 hover:text-red-600 transition-colors font-medium">LogOut</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="p-3 hover:bg-gray-200/80 rounded-full transition-all duration-300 transform hover:scale-110 group">
                <FaUser className="text-gray-600 text-lg group-hover:text-teal-500 transition-colors" />
              </Link>
            )}
            
            <div className="relative group cursor-pointer" onClick={() => navigate('/cart')}>
              <div className="p-3 hover:bg-gray-200/80 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaShoppingCart className="text-gray-600 text-xl group-hover:text-teal-500 transition-colors" />
              </div>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">{getCartCount()}</span>
            </div>
          </div>
        </div>
        

      </nav>
      
      {/* Mobile Navbar */}
      <nav className="md:hidden bg-white/90 backdrop-blur-lg border-b border-gray-200/50 py-4 px-4 flex justify-between items-center fixed top-0 left-0 w-full z-[100] shadow-lg">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <HiOutlineShoppingBag className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">AadiiCart</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-gray-200/80 rounded-lg transition-all duration-300 transform hover:scale-110"
          >
            <FaSearch className="text-gray-600 text-lg" />
          </button>
          
          {userData ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg font-semibold text-sm"
              >
                {userData.name?.charAt(0).toUpperCase() || 'A'}
              </button>
              
              {showProfile && (
                <div className="absolute right-0 top-12 bg-white/90 backdrop-blur-lg text-gray-800 rounded-xl shadow-2xl py-3 w-40 z-50 border border-gray-200/50">
                  <Link to="/orders" className="block px-5 py-3 hover:bg-gray-100/80 transition-colors font-medium" onClick={() => setShowProfile(false)}>Orders</Link>
                  <Link to="/about" className="block px-5 py-3 hover:bg-gray-100/80 transition-colors font-medium" onClick={() => setShowProfile(false)}>About</Link>
                  <button onClick={() => { logout(); setShowProfile(false) }} className="block w-full text-left px-5 py-3 hover:bg-red-50 hover:text-red-600 transition-colors font-medium">LogOut</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="p-2 hover:bg-gray-200/80 rounded-lg transition-all duration-300 transform hover:scale-110">
              <FaUser className="text-gray-600 text-lg" />
            </Link>
          )}
          
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <div className="p-2 hover:bg-gray-200/80 rounded-lg transition-all duration-300 transform hover:scale-110">
              <FaShoppingCart className="text-gray-600 text-lg" />
            </div>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">{getCartCount()}</span>
          </div>
          
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 hover:bg-gray-200/80 rounded-lg transition-all duration-300 transform hover:scale-110"
          >
            {showMobileMenu ? <FaTimes className="text-gray-600 text-lg" /> : <FaBars className="text-gray-600 text-lg" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40 pt-20">
          <div className="bg-white/95 backdrop-blur-lg p-6 m-4 rounded-xl shadow-2xl">
            <div className="space-y-4">
              <Link 
                to="/" 
                className={`block px-4 py-3 rounded-lg text-center font-semibold transition-all ${
                  isActive('/') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                HOME
              </Link>
              <Link 
                to="/collection" 
                className={`block px-4 py-3 rounded-lg text-center font-semibold transition-all ${
                  isActive('/collection') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                COLLECTIONS
              </Link>
              <Link 
                to="/about" 
                className={`block px-4 py-3 rounded-lg text-center font-semibold transition-all ${
                  isActive('/about') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                ABOUT
              </Link>
              <Link 
                to="/contact" 
                className={`block px-4 py-3 rounded-lg text-center font-semibold transition-all ${
                  isActive('/contact') ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      )}
      

      
      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40 pt-20">
          <div className="bg-white/95 backdrop-blur-lg p-4 m-4 rounded-xl shadow-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Here"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                autoFocus
              />
              <button 
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Click outside to close dropdowns */}
      {(showProfile || showSearch || showMobileMenu) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => { setShowProfile(false); setShowSearch(false); setShowMobileMenu(false) }}
        ></div>
      )}
    </>
  )
}

export default Nav
