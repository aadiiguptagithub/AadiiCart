import React, { useState, useEffect, useContext } from 'react'
import { authDataContext } from '../context/AuthContex'
import axios from 'axios'
import { FiShoppingBag, FiPackage, FiDollarSign, FiUsers, FiTrendingUp, FiActivity } from 'react-icons/fi'
import toast, { Toaster } from 'react-hot-toast'

function Home() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    revenue: 0,
    activeUsers: 0
  })
  const [loading, setLoading] = useState(true)
  const { serverUrl } = useContext(authDataContext)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`${serverUrl}/api/order/list`, { withCredentials: true }),
        axios.get(`${serverUrl}/api/product/listproduct`, { withCredentials: true })
      ])

      const orders = ordersRes.data.orders || []
      const products = productsRes.data.products || []
      
      const revenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0)
      
      setStats({
        totalOrders: orders.length,
        totalProducts: products.length,
        revenue: revenue,
        activeUsers: new Set(orders.map(order => order.userId)).size
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto mb-4'></div>
          <p className='text-white text-lg'>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-900 pt-[90px] p-8'>
      <Toaster position="top-right" />
        <div className='max-w-7xl mx-auto'>
            {/* Header */}
            <div className='mb-12'>
                <h1 className='text-4xl font-extrabold text-white mb-4'>Admin Dashboard</h1>
                <p className='text-gray-400 text-lg'>Monitor your e-commerce performance</p>
            </div>
            
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                {/* Total Orders */}
                <div className='bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-teal-500 transition-all duration-300 group'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-teal-600 rounded-lg group-hover:bg-teal-500 transition-colors'>
                            <FiShoppingBag className='w-6 h-6 text-white' />
                        </div>
                        <FiTrendingUp className='w-5 h-5 text-teal-400' />
                    </div>
                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-gray-400 uppercase tracking-wide'>Total Orders</h3>
                        <p className='text-3xl font-bold text-white'>{stats.totalOrders}</p>
                        <p className='text-xs text-teal-400'>All time orders</p>
                    </div>
                </div>
                
                {/* Total Products */}
                <div className='bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 group'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors'>
                            <FiPackage className='w-6 h-6 text-white' />
                        </div>
                        <FiActivity className='w-5 h-5 text-blue-400' />
                    </div>
                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-gray-400 uppercase tracking-wide'>Total Products</h3>
                        <p className='text-3xl font-bold text-white'>{stats.totalProducts}</p>
                        <p className='text-xs text-blue-400'>In inventory</p>
                    </div>
                </div>
                
                {/* Revenue */}
                <div className='bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-green-500 transition-all duration-300 group'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-green-600 rounded-lg group-hover:bg-green-500 transition-colors'>
                            <FiDollarSign className='w-6 h-6 text-white' />
                        </div>
                        <FiTrendingUp className='w-5 h-5 text-green-400' />
                    </div>
                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-gray-400 uppercase tracking-wide'>Revenue</h3>
                        <p className='text-3xl font-bold text-white'>₹{stats.revenue.toLocaleString()}</p>
                        <p className='text-xs text-green-400'>Total earnings</p>
                    </div>
                </div>
                
                {/* Active Users */}
                <div className='bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-purple-500 transition-all duration-300 group'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='p-3 bg-purple-600 rounded-lg group-hover:bg-purple-500 transition-colors'>
                            <FiUsers className='w-6 h-6 text-white' />
                        </div>
                        <FiActivity className='w-5 h-5 text-purple-400' />
                    </div>
                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-gray-400 uppercase tracking-wide'>Active Users</h3>
                        <p className='text-3xl font-bold text-white'>{stats.activeUsers}</p>
                        <p className='text-xs text-purple-400'>Customers</p>
                    </div>
                </div>
            </div>
            
            {/* Welcome Section */}
            <div className='bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700'>
                <div className='flex items-center mb-6'>
                    <div className='p-3 bg-teal-600 rounded-lg mr-4'>
                        <FiActivity className='w-8 h-8 text-white' />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white mb-2'>Welcome to AadiiCart Admin Panel</h2>
                        <p className='text-gray-400'>Manage your e-commerce store efficiently</p>
                    </div>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-slate-700 p-6 rounded-lg border border-slate-600'>
                        <FiPackage className='w-8 h-8 text-teal-400 mb-3' />
                        <h3 className='text-lg font-semibold text-white mb-2'>Product Management</h3>
                        <p className='text-gray-400 text-sm'>Add, edit, and manage your product inventory</p>
                    </div>
                    
                    <div className='bg-slate-700 p-6 rounded-lg border border-slate-600'>
                        <FiShoppingBag className='w-8 h-8 text-blue-400 mb-3' />
                        <h3 className='text-lg font-semibold text-white mb-2'>Order Processing</h3>
                        <p className='text-gray-400 text-sm'>Track and manage customer orders</p>
                    </div>
                    
                    <div className='bg-slate-700 p-6 rounded-lg border border-slate-600'>
                        <FiUsers className='w-8 h-8 text-purple-400 mb-3' />
                        <h3 className='text-lg font-semibold text-white mb-2'>Customer Insights</h3>
                        <p className='text-gray-400 text-sm'>Monitor customer activity and engagement</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home