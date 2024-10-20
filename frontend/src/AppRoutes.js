import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import GroceryPage from './Components/GroceryPage/GroceryPage'
import BagPage from './Pages/Bag/BagPage'
import LoginPage from './Pages/Login/LoginPage'
import RegisterPage from './Pages/Register/RegisterPage'
import AuthRoute from './Components/AuthRoute/AuthRoute'
import CheckoutPage from './Pages/Checkout/CheckoutPage'
import PaymentPage from './Pages/Payment/PaymentPage'
import OrderTrackPage from './Pages/OrderTrack/OrderTrackPage'
import ProfilePage from './Pages/Profile/ProfilePage'
import OrdersPage from './Pages/Orders Page/OrdersPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<HomePage />} />
        <Route path="/tag/:tag" element={<HomePage />} />
        <Route path="/grocery/:id" element ={<GroceryPage />} />
        <Route path="/bag" element ={<BagPage />} />
        <Route path="/login" element ={<LoginPage />} />
        <Route path="/register" element ={<RegisterPage />} />
        <Route path="/checkout" element ={<AuthRoute> <CheckoutPage/> </AuthRoute>} />
        <Route path="/payment" element ={<AuthRoute> <PaymentPage/> </AuthRoute>} />
        <Route path="/track/:orderId" element ={<AuthRoute> <OrderTrackPage/> </AuthRoute>} />
        <Route path="/user-profile" element ={<AuthRoute> <ProfilePage/> </AuthRoute>} />
        <Route path="/orders/:filter?" element ={<AuthRoute> <OrdersPage/> </AuthRoute>} />
    </Routes>
  )
}
