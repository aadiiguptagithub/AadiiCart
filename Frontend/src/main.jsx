import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContex from './contex/AuthContex.jsx'
import UserContex from './contex/UserContex.jsx'
import ShopContextProvider from './contex/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContex>
      <ShopContextProvider>
        <UserContex>
          <App />
        </UserContex>
      </ShopContextProvider>
    </AuthContex>
  </BrowserRouter>
)
