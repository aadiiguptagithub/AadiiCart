import React, { useState, useContext } from 'react'
import { ShopContext } from '../contex/ShopContext.jsx'
import { authDataContext } from '../contex/AuthContex.jsx'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function PlaceOrder() {
  const { getCartAmount, cartItem, products, clearCart } = useContext(ShopContext)
  const { serverUrl, userData } = useContext(authDataContext)
  const navigate = useNavigate()
  
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const initPay = (order) => {
    if (!window.Razorpay) {
      toast.error('Razorpay SDK not loaded');
      return;
    }

    const options = {
      key: 'rzp_test_RFEBvbIAJbfSd4',
      amount: order.amount,
      currency: order.currency || 'INR',
      name: "AadiiCart",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.get(`${serverUrl}/api/order/verifyrazorpay?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}`, { withCredentials: true });
          if (data.success) {
            toast.success("Payment Successful");
            await clearCart();
            navigate('/orders');
          } else {
            toast.error("Payment Failed");
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: "#0d9488"
      },
      modal: {
        ondismiss: function() {
          toast.error("Payment Cancelled");
        }
      }
    };
    
    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      toast.error('Payment gateway error. Please try again.');
    }
  }


        
     










  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!userData) {
      toast.error('Please login to place order')
      navigate('/login')
      return
    }

    if (getCartAmount() === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsSubmitting(true)
    
    try {
      const orderData = {
        address: formData,
        items: cartItem,
        amount: getCartAmount() + 40,
        paymentMethod
      }

      if (paymentMethod === 'razorpay') {
        const resultRazorpay = await axios.post(`${serverUrl}/api/order/razorpay`, orderData, { withCredentials: true });
        if (resultRazorpay.data.success) {
          initPay(resultRazorpay.data.razorpayOrder);
        } else {
          toast.error('Failed to create Razorpay order');
        }
      } else {
        const response = await fetch(`${serverUrl}/api/order/placeorder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData),
          credentials: 'include'
        })

        const result = await response.json()

        if (response.ok) {
          toast.success('Order placed successfully!')
          await clearCart()
          navigate('/orders')
        } else {
          toast.error(result.message || 'Failed to place order')
        }
      }
    } catch (error) {
      console.error('Order error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const subtotal = getCartAmount()
  const shippingFee = 40
  const total = subtotal + shippingFee

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Side - Delivery Information */}
          <div className="pr-0 lg:pr-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-10 tracking-wider">DELIVERY INFORMATION</h2>
            
            <div className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />

              {/* Street */}
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Pincode & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Right Side - Cart Totals & Payment */}
          <div className="space-y-12 pl-0 lg:pl-8">
            {/* Cart Totals */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 tracking-wider">CART TOTALS</h2>
              <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-8">
                <div className="space-y-6">
                  <div className="flex justify-between text-gray-300 text-lg">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-lg">
                    <span>Shipping Fee</span>
                    <span>₹ {shippingFee}</span>
                  </div>
                  <hr className="border-slate-600 my-4" />
                  <div className="flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span>₹ {total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 tracking-wider">PAYMENT METHOD</h2>
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    Razorpay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    CASH ON DELIVERY
                  </button>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || getCartAmount() === 0}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 text-white py-5 px-8 rounded-lg font-bold text-xl tracking-wider transition-all duration-300 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder