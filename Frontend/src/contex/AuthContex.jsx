import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { speakWelcome, getLoginSuccessMessage } from '../utils/aiWelcome.js'

export const authDataContext = createContext()

function AuthContex({ children }) {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const serverUrl = "http://localhost:8000"
    const navigate = useNavigate()

    // Check if user is logged in on app start
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${serverUrl}/api/auth/check`, {
                    method: 'GET',
                    credentials: 'include'
                })
                
                if (response.ok) {
                    const data = await response.json()
                    setUserData(data.user)
                } else if (response.status === 401) {
                    // User not logged in - this is expected, no error needed
                    setUserData(null)
                }
            } catch (error) {
                // Network or other errors - user not logged in
                setUserData(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = (user) => {
        setUserData(user)
        // AI welcome message for successful login
        setTimeout(() => {
            const message = getLoginSuccessMessage(user)
            speakWelcome(message)
        }, 1000)
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
            setUserData(null)
            navigate('/login')
        }
    }

    const value = {
        userData,
        serverUrl,
        loading,
        login,
        logout
    }

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContex
