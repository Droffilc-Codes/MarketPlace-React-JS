import React from 'react'
import { useAuth } from '../../Hook/useAuth'
import NotFound from '../Not Found/NotFound'
import AuthRoute from '../AuthRoute/AuthRoute'

function DataAdminRoute({children}) {
    const { user } = useAuth()
  return user.isAdmin && user.isDataAdmin ? children : (

      <NotFound
        linkRoute='/dashboard'
        linkText='Go To Dashboard'
        message="You don't have access to this Page!"
      />
  )
}

const DataAdminRouteExport = ({children}) => 
    <AuthRoute>
        <DataAdminRoute>
            {children}
        </DataAdminRoute>
    </AuthRoute>


export default DataAdminRouteExport