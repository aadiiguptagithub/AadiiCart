import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/Lists'
import Order from './pages/Orders'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './component/Nav.jsx'
import Sidebar from './component/Sidebar.jsx'
import { adminDataContext } from './context/AdminContex.jsx'

function App() {
  const { adminData, loading } = useContext(adminDataContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {!adminData ? (
        <Login />
      ) : (
        <div className="min-h-screen bg-gray-900">
          <Nav />
          <Sidebar />
          <div className="pl-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/order" element={<Order />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<Home />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  )
}

export default App