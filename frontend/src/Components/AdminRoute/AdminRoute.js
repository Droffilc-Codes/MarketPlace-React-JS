import React from 'react'
import { useAuth } from '../../Hook/useAuth'
import NotFound from '../Not Found/NotFound'
import AuthRoute from '../AuthRoute/AuthRoute'

function AdminRoute({children}) {
    const { user } = useAuth()
  return user.isAdmin ? children : (

      <NotFound
        linkRoute='/dashboard'
        linkText='Go To Dashboard'
        message="You don't have access to this Page!"
      />
  )
}

const AdminRouteExport = ({children}) => 
    <AuthRoute>
        <AdminRoute>
            {children}
        </AdminRoute>
    </AuthRoute>


export default AdminRouteExport