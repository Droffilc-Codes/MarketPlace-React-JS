import React from 'react'
import { useAuth } from '../../Hook/useAuth'
import NotFound from '../Not Found/NotFound'
import AuthRoute from '../AuthRoute/AuthRoute'

function AccountAdminRoute({children}) {
    const { user } = useAuth()
  return user.isAdmin && user.isAccountsAdmin ? children : (

      <NotFound
        linkRoute='/dashboard'
        linkText='Go To Dashboard'
        message="You don't have access to this Page!"
      />
  )
}

const AccountAdminRouteExport = ({children}) => 
    <AuthRoute>
        <AccountAdminRoute>
            {children}
        </AccountAdminRoute>
    </AuthRoute>


export default AccountAdminRouteExport