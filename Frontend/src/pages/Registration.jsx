import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authDataContext } from '../contex/AuthContex.jsx'
import { auth, provider, signInWithPopup } from '../utils/Firebase.js'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'

const Registration = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { serverUrl, login } = useContext(authDataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch(`${serverUrl}/api/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }
      
      login(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      const response = await fetch(`${serverUrl}/api/auth/googleLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: user.displayName, 
          email: user.email 
        }),
        credentials: 'include'
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Google login failed')
      }
      
      login(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Registration Page
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">Welcome to AadiiCart, Place your order</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 animate-pulse">
              {error}
            </div>
          )}
          
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 sm:py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25 mb-6"
          >
            <FaGoogle className="text-lg" />
            <span className="font-medium">Registration with Google</span>
          </button>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400 font-medium">OR</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
              <input
                type="text"
                placeholder="UserName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 sm:py-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-gray-500"
              />
            </div>
            
            <div className="group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 sm:py-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-gray-500"
              />
            </div>
            
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 sm:py-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-gray-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 sm:py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25 mt-6"
            >
              Create Account
            </button>
          </form>
          
          <div className="text-center mt-6 text-sm sm:text-base">
            <span className="text-gray-400">You have any account? </span>
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
