import React, { createContext, useState, useEffect } from 'react'

export const authDataContext = createContext()

function AuthContex({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const serverUrl = "http://localhost:8000"

    // Check if user is logged in on app start
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${serverUrl}/api/auth/check`, {
                    method: 'GET',
                    credentials: 'include'
                })
                
                if (response.ok) {
                    const userData = await response.json()
                    setUser(userData.user)
                }
            } catch (error) {
                console.log('Auth check failed:', error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = (userData) => {
        setUser(userData)
    }

    const logout = async () => {
        try {
            await fetch(`${serverUrl}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })
        } catch (error) {
            console.log('Logout error:', error)
        } finally {
            setUser(null)
        }
    }

    const value = {
        user,
        login,
        logout,
        loading,
        serverUrl
    }

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContex