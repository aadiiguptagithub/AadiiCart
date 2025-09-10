import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiPlus, FiList, FiShoppingBag, FiActivity } from 'react-icons/fi'

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: FiHome },
        { path: '/add', label: 'Add Product', icon: FiPlus },
        { path: '/list', label: 'Product List', icon: FiList },
        { path: '/order', label: 'Orders', icon: FiShoppingBag },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className='w-64 h-screen bg-slate-900 shadow-2xl border-r border-slate-700 fixed left-0 top-[70px] z-10'>
            <div className='p-6'>
                <div className='flex items-center mb-8'>
                    <FiActivity className='text-teal-500 text-2xl mr-3' />
                    <h2 className='text-xl font-bold text-white'>Admin Panel</h2>
                </div>
                
                <ul className='space-y-3'>
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <li key={item.path}>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center space-x-4 group ${
                                        isActive(item.path)
                                            ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg transform scale-105'
                                            : 'text-gray-300 hover:bg-slate-800 hover:text-white hover:shadow-md'
                                    }`}
                                >
                                    <IconComponent className={`text-xl transition-colors ${
                                        isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-teal-400'
                                    }`} />
                                    <span className='font-semibold'>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar