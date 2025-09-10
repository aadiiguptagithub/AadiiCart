import React, { useState, useContext, useEffect } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContex';

export const adminDataContext = createContext()

function AdminContex({children}) {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { serverUrl } = useContext(authDataContext);

    // Check admin authentication on component mount
    useEffect(() => {
        const checkAdminAuth = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/auth/check`, {
                    withCredentials: true
                });
                
                if (response.data.user && response.data.user.role === 'admin') {
                    setAdminData(response.data.user);
                }
            } catch (error) {
                console.log('Admin auth check failed:', error);
                setAdminData(null);
            } finally {
                setLoading(false);
            }
        };

        if (serverUrl) {
            checkAdminAuth();
        }
    }, [serverUrl]);

    const getAdminData = async () => {
        try {
            const result = await axios.get(`${serverUrl}/admin/user/getadmin`, {
                withCredentials: true
            });

            setAdminData(result.data);
            console.log("Admin data fetched:", result.data);
        }
        catch (error) {
            console.error("Error fetching admin data:", error);
            setAdminData(null);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${serverUrl}/api/auth/logout`, {}, {
                withCredentials: true
            });
            setAdminData(null);
        } catch (error) {
            console.error("Logout error:", error);
            setAdminData(null);
        }
    };

    const value = { adminData, setAdminData, getAdminData, logout, loading };
    
    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default AdminContex