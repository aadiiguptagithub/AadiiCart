import React, { useState, useEffect, useContext } from 'react'
import { authDataContext } from '../contex/AuthContex.jsx'
import { ShopContext } from '../contex/ShopContext.jsx'
import Invoice from '../component/Invoice.jsx'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { serverUrl, userData } = useContext(authDataContext)
  const { products } = useContext(ShopContext)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${serverUrl}/api/order/userorders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        
        const data = await response.json()
        setOrders(data.orders || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (userData) {
      fetchOrders()
    }
  }, [serverUrl, userData])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-lg text-white">Loading orders...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    )
  }

  const getProductById = (id) => {
    return products.find(product => product._id === id)
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-8 text-center">
          Your Orders
        </h1>
        
        {orders.length === 0 ? (
          <div className="bg-slate-800 rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-300 mb-4">You haven't placed any orders yet.</div>
            <a 
              href="/collection" 
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-slate-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-slate-700 px-6 py-4 border-b border-slate-600">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <span className="text-sm text-gray-400">Order ID:</span>
                      <span className="ml-2 text-white font-medium">{order._id.slice(-8)}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Date:</span>
                      <span className="ml-2 text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {order.status || 'Order Placed'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="divide-y divide-slate-600">
                    {Object.entries(order.items).map(([itemId, sizes]) => {
                      const product = getProductById(itemId)
                      if (!product) return null
                      
                      return Object.entries(sizes).map(([size, quantity]) => (
                        <div key={`${itemId}-${size}`} className="py-4 flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img 
                              className="h-16 w-16 object-cover rounded" 
                              src={product.image1 || 'https://via.placeholder.com/150'} 
                              alt={product.name} 
                            />
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="text-sm font-medium text-white">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              Size: {size} | Quantity: {quantity}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-white">
                            ₹{(product.price * quantity).toFixed(2)}
                          </div>
                        </div>
                      ))
                    })}
                  </div>
                </div>
                
                <div className="bg-slate-700 px-6 py-4 border-t border-slate-600">
                  <div className="flex justify-between text-base font-medium text-white">
                    <p>Total Amount</p>
                    <p>₹{order.amount}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-400">
                      Payment Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Shipping Address: {order.address.firstName} {order.address.lastName}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                    </p>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="mt-3 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm"
                    >
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {selectedOrder && (
          <Invoice 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        )}
      </div>
    </div>
  )
}

export default Orders
