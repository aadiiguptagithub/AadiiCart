import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContex.jsx';
import { adminDataContext } from '../context/AdminContex.jsx';
import { FiLogOut, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';

function Nav() {
    const navigate = useNavigate();
    const { serverUrl } = useContext(authDataContext);  
    const { logout, setAdminData } = useContext(adminDataContext);

    const logOut = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/logout`, {}, { 
                withCredentials: true 
            });
            console.log(result.data);
            
            setAdminData(null);
            toast.success('Logged out successfully');
            navigate('/login');
                
        } catch(error) {
            console.log('Logout error:', error);
            setAdminData(null);
            toast.success('Logged out successfully');
            navigate('/login');
        }
    }
    return (
        <div className='w-full h-[70px] bg-slate-800 z-10 fixed top-0 flex items-center justify-between px-8 shadow-2xl border-b border-slate-700'>
            <div className='flex items-center cursor-pointer group' onClick={() => { navigate('/') }}>
                <FiShoppingCart className='text-teal-500 text-3xl mr-3 group-hover:text-teal-400 transition-colors' />
                <h1 className='text-2xl font-bold text-white group-hover:text-teal-400 transition-colors'>AadiiCart Admin</h1>
            </div>
            
            <button 
                className='flex items-center space-x-2 bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                onClick={logOut}
            >
                <FiLogOut className='text-lg' />
                <span>Logout</span>
            </button>
        </div>
    )
}

export default Nav