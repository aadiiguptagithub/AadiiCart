import React from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'

function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <HiOutlineShoppingBag className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-800">AadiiCart</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              AadiiCart is your all-in-one online shopping destination, offering high-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">COMPANY</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-gray-800 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-gray-800 transition-colors">About us</a></li>
              <li><a href="/delivery" className="hover:text-gray-800 transition-colors">Delivery</a></li>
              <li><a href="/privacy" className="hover:text-gray-800 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">GET IN TOUCH</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>+91-6306399254</li>
              <li>contact@aadiicart.com</li>
              <li>+91-6306399254</li>
              <li>admin@aadiicart.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Copyright 2024© Aadiicart.com - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer