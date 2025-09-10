import React, { useState, useEffect, useContext } from 'react'
import { authDataContext } from '../context/AuthContex'
import { adminDataContext } from '../context/AdminContex'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { FiPackage, FiTruck, FiCheck, FiClock, FiEdit3, FiSearch, FiFilter, FiShoppingBag, FiUser, FiCreditCard, FiImage } from 'react-icons/fi'

function Orders() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updating, setUpdating] = useState({})
  const [products, setProducts] = useState([])
  
  const { serverUrl } = useContext(authDataContext)
  const { adminData } = useContext(adminDataContext)

  const statusOptions = [
    { value: 'Order Placed', label: 'Order Placed', color: 'bg-blue-600 text-white', icon: FiClock },
    { value: 'Processing', label: 'Processing', color: 'bg-yellow-600 text-white', icon: FiPackage },
    { value: 'Shipped', label: 'Shipped', color: 'bg-purple-600 text-white', icon: FiTruck },
    { value: 'Delivered', label: 'Delivered', color: 'bg-green-600 text-white', icon: FiCheck }
  ]

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/product/listproduct`, {
        withCredentials: true
      })
      if (response.data.products) {
        setProducts(response.data.products)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${serverUrl}/api/order/list`, {
        withCredentials: true
      })
      
      if (response.data.success) {
        setOrders(response.data.orders)
        setFilteredOrders(response.data.orders)
        toast.success('Orders loaded successfully')
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders')
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err.message)
      toast.error(err.response?.data?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdating(prev => ({ ...prev, [orderId]: true }))
      
      const response = await axios.post(`${serverUrl}/api/order/status`, {
        orderId,
        status: newStatus
      }, {
        withCredentials: true
      })

      if (response.data.success) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        )
        
        setFilteredOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        )
        
        toast.success('Order status updated successfully')
      } else {
        throw new Error(response.data.message || 'Failed to update status')
      }
    } catch (err) {
      console.error('Error updating order status:', err)
      toast.error(err.response?.data?.message || 'Failed to update order status')
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }))
    }
  }

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${order.address.firstName} ${order.address.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [searchTerm, statusFilter, orders])

  useEffect(() => {
    if (adminData) {
      fetchProducts()
      fetchOrders()
    }
  }, [adminData, serverUrl])

  const getProductById = (id) => {
    return products.find(product => product._id === id)
  }

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(option => option.value === status)
    return statusOption ? statusOption.color : 'bg-gray-600 text-white'
  }

  const getStatusIcon = (status) => {
    const statusOption = statusOptions.find(option => option.value === status)
    const IconComponent = statusOption ? statusOption.icon : FiClock
    return <IconComponent className="w-4 h-4" />
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  const getTotalItems = (items) => {
    return Object.values(items).reduce((total, sizes) => {
      return total + Object.values(sizes).reduce((sizeTotal, quantity) => sizeTotal + quantity, 0)
    }, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-[70px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading orders...</p>
        </div>
      </div>
    )
  }

  if (error && !adminData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-[70px]">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">Access Denied</div>
          <p className="text-gray-400">You need admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-[70px]">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FiShoppingBag className="text-teal-500 text-4xl mr-3" />
            <h1 className="text-3xl font-bold text-white">Orders Management</h1>
          </div>
          <p className="text-gray-400">Manage and track all customer orders</p>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Order ID, User ID, or Customer Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={fetchOrders}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{orders.length}</div>
              <div className="text-sm text-gray-400">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {orders.filter(order => order.status === 'Processing').length}
              </div>
              <div className="text-sm text-gray-400">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {orders.filter(order => order.status === 'Shipped').length}
              </div>
              <div className="text-sm text-gray-400">Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {orders.filter(order => order.status === 'Delivered').length}
              </div>
              <div className="text-sm text-gray-400">Delivered</div>
            </div>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-12 text-center">
            <FiPackage className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No orders have been placed yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:border-teal-500 transition-all duration-300">
                <div className="bg-slate-700 px-6 py-4 border-b border-slate-600">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div>
                        <span className="text-sm text-gray-400">Order ID:</span>
                        <span className="ml-2 text-lg font-semibold text-white">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Date:</span>
                        <span className="ml-2 text-gray-300">{formatDate(order.createdAt)}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Items:</span>
                        <span className="ml-2 text-gray-300">{Array.isArray(order.items) ? order.items.reduce((total, itemObj) => {
                          return total + Object.values(itemObj).reduce((objTotal, sizes) => {
                            return objTotal + Object.values(sizes).reduce((sizeTotal, quantity) => quantity > 0 ? sizeTotal + quantity : sizeTotal, 0)
                          }, 0)
                        }, 0) : 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status || 'Order Placed'}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiEdit3 className="w-4 h-4 text-gray-400" />
                        <select
                          value={order.status || 'Order Placed'}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          disabled={updating[order._id]}
                          className="bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50"
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <FiUser className="text-teal-500 mr-2" />
                        <h4 className="text-lg font-medium text-white">Customer Information</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Name:</span>
                          <span className="ml-2 text-gray-300">
                            {order.address.firstName} {order.address.lastName}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Email:</span>
                          <span className="ml-2 text-gray-300">{order.address.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Phone:</span>
                          <span className="ml-2 text-gray-300">{order.address.phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Address:</span>
                          <span className="ml-2 text-gray-300">
                            {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <FiCreditCard className="text-teal-500 mr-2" />
                        <h4 className="text-lg font-medium text-white">Payment Information</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Payment Method:</span>
                          <span className="ml-2 text-gray-300">
                            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Payment Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${
                            order.payment ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {order.payment ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Amount:</span>
                          <span className="ml-2 text-lg font-semibold text-white">
                            {formatCurrency(order.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-600">
                    <div className="flex items-center mb-3">
                      <FiPackage className="text-teal-500 mr-2" />
                      <h4 className="text-lg font-medium text-white">Order Items</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.items && Array.isArray(order.items) ? 
                        order.items.map((itemObj, index) => 
                          Object.entries(itemObj).map(([itemId, sizes]) => 
                            Object.entries(sizes).map(([size, quantity]) => {
                              if (quantity === 0) return null;
                              const product = getProductById(itemId);
                              return (
                                <div key={`${itemId}-${size}-${index}`} className="flex items-center p-3 bg-slate-600 rounded-lg">
                                  <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden mr-3">
                                    {product && product.image1 ? (
                                      <img 
                                        src={product.image1}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <FiPackage className="text-gray-400 text-xl" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-white font-medium">{product ? product.name : `Product ${String(itemId).slice(-8).toUpperCase()}`}</div>
                                    <div className="text-sm text-gray-400">Size: <span className="text-gray-300">{String(size)}</span></div>
                                    <div className="text-sm text-gray-400">Qty: <span className="text-white">{quantity}</span></div>
                                    {product && <div className="text-sm text-teal-400">₹{product.price}</div>}
                                  </div>
                                </div>
                              );
                            }).filter(Boolean)
                          ).flat()
                        ).flat()
                        :
                        <div className="col-span-full p-3 bg-slate-600 rounded-lg text-center text-gray-400">
                          No items found in this order
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders