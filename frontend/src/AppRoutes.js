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
import Dashboard from './Pages/Dashboard/Dashboard'
import GroceryAdminPage from './Pages/AdminPage/GroceryAdminPage'
import AdminRoute from './Components/AdminRoute/AdminRoute'
// import GroceryEdit from './Pages/GroceryEdit/GroceryEdit'
import UsersPage from './Pages/UsersPage/UsersPage'
import UserEdit from './Pages/UserEdit/UserEdit'
import AdminStats from './Pages/AdminStats/AdminStats'
import ShopAccounts from './Pages/Shop Accounts/ShopAccounts'
import DeliveryPage from './Pages/DeliveryPage/DeliveryPage'
import Accounts from './Pages/Accounts/Accounts'
import ApprovePay from './Pages/AccountApproval/ApprovePay'
import DeliveryAdminRoute from './Components/DeliveryAdminRoute/DeliveryAdminRoute'
import AccountAdminRoute from './Components/AccountAdminRoute/AccountAdminRoute'
import DataAdminRoute from './Components/DataControlRoute/DataControlAdminRoute'

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
        <Route path="/dashboard" element ={<AuthRoute> <Dashboard/> </AuthRoute>} />
        <Route path="/admin/groceries/:searchTerm?" element ={<DataAdminRoute> <GroceryAdminPage/> </DataAdminRoute>} />
        <Route path="/admin/users/:searchTerm?" element ={<DataAdminRoute> <UsersPage/> </DataAdminRoute>} />
        <Route path="/admin/editUser/:userId?" element ={<DataAdminRoute> <UserEdit/> </DataAdminRoute>} />
        <Route path="/admin/stats" element ={<AdminRoute> <AdminStats/> </AdminRoute>} />
        <Route path="/admin/shops/:searchTerm?" element ={<AdminRoute> <ShopAccounts/> </AdminRoute>} />
        <Route path="/admin/delivery/:searchTerm?" element ={<DeliveryAdminRoute> <DeliveryPage/> </DeliveryAdminRoute>} />
        <Route path="/admin/accounts/:searchTerm?" element ={<AccountAdminRoute> <Accounts/> </AccountAdminRoute>} />
        <Route path="/admin/approve-pay" element={<AccountAdminRoute> <ApprovePay /></AccountAdminRoute>} />
    </Routes>
  )
}
