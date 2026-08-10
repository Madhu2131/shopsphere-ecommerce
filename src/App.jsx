import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Homepage from "./pages/Homepage"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductDetails from './pages/ProductDetails'
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import "./styles/global.css";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/checkout" element={<Checkout />}/>
      <Route path="/orders" element={<Orders />}/>
      <Route path="/orders/:id" element={<OrderDetails />}/>
      <Route path="/wishlist" element={<Wishlist />}/>
    </Routes>
    </>
  )
}

export default App