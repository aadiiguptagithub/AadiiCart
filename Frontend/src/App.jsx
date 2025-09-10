import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'
import About from './pages/About.jsx'
import Collection from './pages/Collection.jsx'
import Contect from './pages/Contect.jsx'
import Products from './pages/Products.jsx'
import Orders from './pages/Orders.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Nav from './component/Nav.jsx'
import Footer from './component/Footer.jsx'
import './App.css'
import { authDataContext } from './contex/AuthContex.jsx'
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Ai from './component/Ai.jsx'


function App() {
  const { userData, loading } = useContext(authDataContext);
  const location = useLocation();
  const hideNavbar = ['/login', '/registration'].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-800 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {!hideNavbar && <Nav />}
      <div className={!hideNavbar ? "pb-16 md:pb-0" : ""}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contect />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/orders" element={userData ? <Orders /> : <Login />} />
        <Route path="/cart" element={userData ? <Cart /> : <Login />} />
        <Route path="/place-order" element={userData ? <PlaceOrder /> : <Login />} />
        </Routes>
      </div>  
      
      {!hideNavbar && <Footer />}
      <Ai/>
    </>
    
  )
}

export default App
