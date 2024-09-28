import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import GroceryPage from './Components/GroceryPage/GroceryPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<HomePage />} />
        <Route path="/tag/:tag" element={<HomePage />} />
        <Route path="/grocery/:id" element ={<GroceryPage />} />
    </Routes>
  )
}
